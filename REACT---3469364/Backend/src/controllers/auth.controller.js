/*
*aqui vive la logica de negocio del login recibir email y contraseña
*buscar el usuario en mysql, comparar la contraseña
*encriptar y devolver un token JWT si todo es correcto
*las rutas (auth.routes.js) solo dicen cuando llegue tal data
*peticion, llama a esta funcion la logica esn si va aca (CRUD)
*/

//Libreria para encriptar y comparar la contraseña
const bcrypt = require('bcryptjs');
//libreria para crear (firmar) tokens JWT de sesion
const jwt = require('jsonwebtoken');
//pool para conexiones mysql configurado en config/db.js
const pool = require('../config/db');
//Carga las variables de .env (JWT_SECRET, JWT_EXPIRES_IN)
require('dotenv').config();

//post /api/auth/login
//recibe {email, password} y devuelve {token, usuario} si son correctos
async function login(req, res) {
    try {
        //extraemos el email y password de cuerpo (body)) de la peticion,
        //que express.json() ya convirtio de JSON a objeto de javascript
        const {email, password}= req.body;

    // 1 validacion basica que no llegue ak formulario vacio
    if (!email || !password){
        return res.status(400).json({message: 'El correo y la contraseña son obligatorios'});
    
    }
    // 2 buscar el usuario por email en la tabla usuarios
    //usamos "?" en la consulta (no contatenamos el email directo)
    //para evitar inyccion SQL; mysql2 se encarga de escaparlo
    const [filas] = await pool.query(
        'SELECT id, nombre, email, password, rol, estado FROM usuarios WHERE email = ? LIMIT 1', [email]
    );

    //si nmo encontro ninguna fila, el correo no existe 
    if (filas.length === 0) {
        return res.status(401).json({mensaje: 'usuario o contraseña incorrectos'});
    }
    
    //pool.query con SELECT siempre devuelve un arreglo de filas, como 
    //buscamos por email (unico), nos quedamos con la primera fila y unica fila
    const usuario = filas[0];
    
// si el usuario due desactivado no dejamo iniciar sesion
//aun que la contreseña sea correcta
if(usuario.estado ===0){
    mensaje: 'este usuario esta desactivado. contacte con el administrador'
}
/**
     * comparar la contraseña que envio el formulario con el hash
     * guardado en la base de datos bcrypt.compare vuelve a aplicar
     * el mismo algoritmo y revisa si el resultado coincidde la
     * contraseña original nunca se puede desencriptar
     */
const passwordCorrecta = await bcrypt. compare (password, usuario.password);

if (!passwordCorrecta){
    return res.status(401).json({
        message: 'correo o contraseña incorrectos'});

    /**
     *generar el token JWT que el frontend guardara para
     *demostrar, en cada peticion futura que ya inicio sesion
     */
    const token = jwt.sign(
        {id: usuario.id, email: usuario.email, rol: usuario.rol}, //datos dentro del token
        process.env.jwt_SECRET, //Firma secreta.
        {expiresIn: process.env.JWT_EXPIRES_IN || '8h'} //tiempo de vida del token
        );
       
        /**
         *responder token con los datos publicos del usuario
         *NUNCA se devuelve el hash de la contraseña del frontend
         */
       
         return res.json(
            {token, 
            usuario: {
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol
            },
            });
            catch (error) {
                //>cualquier error inesperado ( por ejemplo en MYQSL este pagado)
               //cae aqui en vez de tumbar el servidor
               console.error('error en login:', error);
               return res.status(500).json({mensaje: 'error del servidor al iniciar sesion'}); 

            }
} 
}

//GET/api/auth/perfil
//ruta protegida de ejemplo solo responde a personas si el middleware
//vertificarToken confirmo que el token es valido 
async function perfil(req, res) {
    //req.usuario fue puesto por el middleware verificartoken
    return res.json({ usuario: req.usuario });
}

//exportamos ambas funciones para authroutes.js pueda conectarlas
//con las urls corrspondientes
module.exports = {login, perfil };
