const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ mensaje: 'Token no proporcionado' });
  }
  jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({ mensaje: 'Token inválido' });
    }
    req.usuario = decoded;
    next();
  });
}

module.exports = verificarToken;

/**
 * verificar token utiliza la funcion:
 * middleware de express. es una funcion que se ejecuta ANTES de llegar 
 * a las rutas protegida por ejemplo un get
 * su trabajo es revisar que la peticion traiga un token JWT
 * valido si no lo trae corta la peticion con error 401
 */

//libreria para crear y verificar tokens JWT
const jwt = require('jsonwebtoken');
require('dotenv').config();

//req la peticion entrante; res: la respuesta; next funcion que
//continua la cadena de middleware/controlado si todo esta bien 
function verificartoken(req, res, next ) {
    // el frontend debe enviar el token en header
    //authorization: Bearer <token>
    const authHeader = req.headers ['autorization'];

    //si no viene el header no hay sesion -> rechazamos la peticion
    if(!authHeader) {
        return res.status(401).json({mensaje: 'no se envio un token de autenticacion'});
    }

    //autHeader tiene el formato  "Bearer eyJhbGci0i", nos quedamos 
    //solo con la segunda parte del token real
    const token = authHeader.split('')[1];

    //si el header vino mal formado por ejemplo la palabra beader
    //el token queda undefined y tampoco dejamos pasar la peticion
    if(!token) {
        return res.status(401).json({mensaje: 'formato de token invalido'});
    }

    //todo lo que pueda fallar(tpken invalido expirado alterado)se
    //maneja dentro de este try/catch
    try {
        //jwt.verify valida la firma del token con el mismo secreto 
        //que se uso para crearlo (JWT_SECRET) y revisa que haya expirado
        const datosusuario = jwt.verify (token, process.env.JWT_SECRET);

        //guardamos los datos decodificados del usuario en req.usuario
        //para que la siguiente funcion(el controlador) pueda usarlos
        req.usuario = datosusuario;

        //next() le dice al express todo esta bien continua la siguiente funcion 
        next();
    } catch (error) {
      // si el token esta vencido o fue alterado,
    }