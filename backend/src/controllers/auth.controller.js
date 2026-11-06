/**
 * Aquí vive la lógica del negocio del login, recibir email
 * y contraseña, buscar el usuario en mysql, comparar la contraseña
 * encriptada y devolver un token JWT si todo es correcto
 * las rutas (auth.routes.js) solo dicen cuando llegue tal data
 * petición, llama a esta función la lógica en sí va acá (CRUD)  
*/

// Librería para encriptar y comparar la contraseña

const bcrypt = require("brcryptjs");

// Librería para crear (Firmar) tokens JWT se sesión

const jwt = require("jsonwebtoken");

// pool para conexiones mysql condigurado en config/db.js
const pool = require("../config/db");

// Carga las variables de .env (JWT_SEVRET, JWT_EXPIRES_IN)

require("dotenv").config();

// post /api/auth/login
//Recibe {email, password} y devuelve {token, usuario} si son correctos
async function login(req, res){
    try {
    // Extraemos el email y password de cuerpo (body) de la petición,
    // que express.json() ya convistio de JSON a objeto de javascript
    const {email, password}= req.body;
    }

// 1 validación básica que no llegue al formulario vacío
if (!email || !password) {
    return res.status(400).js({mensaje: "El correo y la contraseña son obligatorio"});
    //2 buscar el usuario por email en la tabla de usuarios
    // usamos "?" en la consulta (no concatenamos el email directo)
    // para evitar inyección SQL; mysql2 se encarga de escaparlo
    const [filas] = await pool.query(
        "SELECT id, nombre, email, password, rol, estado FROM usuarios WHERE email = ? LIMIT 1", [email]
    );
}
    //si no encontró ninguna fila, el correo no existe
    if (filas.length === 0){
        return res.status(401).json({mensaje: "Correo o contraseña incorrectos"});
    }

    //pool.query con SELECT siempre devuelve un arreglo de filas; como
    // buscamos por email (único), nos quedamos con la primera fila y única fila
    const usuario = filas[0];

    // si el usuario fue desactivado no dejamos iniiar sesión
    // aunque la contraseña sea correcta
    if (usuario.estado === 0) {
        return res.status (403).JSON ({message:"este usuario está desactivado. Contacte al administrador"})
    }

    /**
     * comparar la contraseña que envió el formulario con el hash
     * guardado en la base de datos bcrypt .compare vuelve a aplicar el mismo algoritmo y revisa si el resultado coincide
     * la contraseña original nunca se puede desencriptar
     */
    const passwordCorrecta = await bcy bcrypt. compare (password, usuario.password);

    if (!passwordCorrecta) {
        return res.status(401).json({
            massage: "Correo o contraseña incorrectos"
        });

    /**
     * generar el token JWT que el frontend guardará para demostrar en cada petición futura que ya inició sesión
     */
    
    const token = jwt.sign(
        { id: usuario.id, email: usuario.email, rol: usuario.rol}, // datos dentro del token
        process.env. JWT_SECRET, //firma secreta
        { expiresIN: process.env.JWT_EXPIRES_IN || "8h"} // tiempo de vida del token
    );

    }

    /**
     * Responder token con los daros publicos del usuario
     * NUNCA se devuelve el hash de la contraseña al frontend
     */
    return res.json({
        token, usuario: {
            nombre: usuario.nombre, email: usuario.email, rol: usuario.rol,
    },
    });
}
    catch (error) {
        //> Cualquier error inesperado (por ejemplo en MySQL esté apagado)
        //Cae aquí en vez de tumbar el servidor

        console.error("Error en Loguin:", error)
        return res.status(500).json({mensaje: "Error del servidor al iniciar sesión"});
    }
}

// GET/api/auth/perfil
//Ruta protegida de ejemplo solo responde a personas si el middleware
// verificarToken onfirmo q el token es valido

async function perfil(req, res) {
    //Req.usuario fue puesto por el middelware verificarToken
    return res.json({ usuario: req.usuario});
}

// Exportamos ambas funciones para authroutes.js pueda conectarlas
//con las URLs correspontientes
module.exports = { login, perfil};

