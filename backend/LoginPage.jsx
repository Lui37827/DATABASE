/**
 * pantalla login funcional
 * 
 * panmtalla publica de inicio de sesion es la unoica parte del 
 * sistema que habla con la base de datos MYSQL real a travex delnbn
 * backend node/express si las credenciales son correctas
 * redirije al usuario al dashboard
 */

//Hook del estado local para los campos del formulario 
import { useState } from 'react';
//Hook para redirigir por codigodespues de iniciar sesion 
import { useNavigate } from 'react-router-dom';
//Hook para llamar a login() del contexto global de sesion
import { useAuth } from '../context/AuthContext';


function LoginPage() {
    //traemos solo la funcion login() del contexto no se necesita mas
    const { login } = useAuth();
    //fucnciion para cambiar la url una vez el login sea exitoso
    const navigare = useNavigate();

    //estado de formulario controlado
    const [email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    //estado para mostrar el error que devuelva el backend credenciales
    //invalidas, usuario desactivo servidor caidoi o demas
    const [error, setError] = useState ('');

    // ESTADO PARA DESHABILITAR EL BOTON MIESTRAS ESPERE LA RESPUESTA  
    //del servidor y evitar que el usuario haga doble click 
    const  [enviado, setEnviado] = useState(false);

    // se ejecuta cunado el usuario envia el formulario boton o enter
    async function manejarEnvio(evento) {
        evento.preventDefault(); //evita que el navegador recargue la pagina 
        setError('');//limpia cualquier error de un intento anterior
        setEnviado(true);//deshabilita el boton mientras esperamos la respuesta

        try {
            //login() esta definido en AuthContext: llama el backend
            //Guarda el token/usuario y actualiza el estado global
            await login(email, password);
            //revisar
            //si no lanzo error las credencialesfueron correctas
            NavigateEvent('/dashboard', { replace:true});
        } catch (err) {
            //si el backend responde un mensaje error (401, 403 .. )
            //axios lo deja disponible en err.responde.data.mensaje
            const mensajeBackend = err?.responde?.data?.mensaje;
            setError(mensajeBackend || ' no se pudo conectar con el servidor, verifica que el backend este corriendo');
        }finally {
            setEnviado(false);
        }
     }    
 }
