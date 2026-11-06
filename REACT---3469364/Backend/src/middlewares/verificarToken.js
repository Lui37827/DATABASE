/**
 * Verificar token utiliza funcion:
 * Middleware de express, es una funcion que se ejecuta ANTES de llegar 
 * a las rutas protegida por ejemplo un get 
 * su trabajo es revisar que la peticion traiga un token JWT valido
 * valido si no lo trae corta la peticion con error 401
 */

//Libreria para crear y verificar tokens JWT
const jwt = require ('jsonwebtoken');
require('dotenv').config();

//req la peticion entrante; res: la respuesta; next funcion que 
//continua la cadena de middlewares/controlador si todo esta bien
function verificarToken(req, res, next) {
    //el frontend debe enviar el token en header 
    //Authorization: Bearer <token>
    const authHeader = req.headers ['authorization'];

    //si no viene el header no hay sesion -> rechazamos la peticion
    if (!authHeader) {
        return res.status(401).json({mensaje: 'no se envio un token de autenticacion'});
    }

    //authHeader tiene el formato "Bearer eyJhbGciOi", nos quedamos 
    //solo con la segunda parte el token real
    const token = authHeader.split('')[1];

    //si el header vino mal formado por ejemplo son la palabra beaber
    //el token queda undefined y tampoco dejamos pasar la peticion
    if (!token) {
        return res.status(401).json ({mensaje: 'formato de token invalido'});
    }

    //todo lo pueda fallar (token invalido expirado aalterado) se 
    //maneja dentro de este try/catch
    try {
        //jwt.verify valida la firma del token con el mismo secreto
        //que uso para crearlo (JWT_SECRET) y revisa que haya expirado
        const datosUsuario = jwt.verify (token, process.env.JWT_SECRET);

        //Guardamos los datos decodificados del usuario en req.usuario
        //para que la siguiente funcion (el controlador) pueda usarlos
        req.usuario = datosUsuario;

        // next() le dice al espress todo esta bien continua con la siguiente funcion
        next();
    } catch (error) {
        //si el token esta vencido o fue alterado, jwt.verify lanza un error
        return res.status(401).json({mensaje: 'token invalido o expirado'});
    }
}

//exportamos 
module.export = verificarToken;