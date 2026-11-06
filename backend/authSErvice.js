/**
 * concreta las llamadas a la api
 *relacionadas con autenticacion 
 los componentes (por ejemplo loginpage )
 no los llaman a axios 
 ditrecytamente llaman a estas funciones que son mas faciles 
 * de leer y de reutilizar 
 */

 // instancia axios ya configurada con la url del backend  y el token 
 import axiosClient from "./axiosClient";

 //envia email y password al backend si son correctos el backend responde con
 //{token, usuario} si no axios lanza un error 
 // que el componentre llama debe capturar con ntry/catch
 export async function iniciarSesion(email, password) {
    const respuesta = await axiosClient.post
    ('/auth/login',{email, password})
    return respuesta.data; // {token, usuario}

    
 }

 //piede al backend los datos del usuario dueño del token actual 
 //sirve por ejemplo validar la sesion cuando se recarga la pagina 
 export async function obtenerPerfil() {
    const respuesta = await axiosClient.get
    (/'auth/perfil');
    return respuesta.data; //{usuario}
    
 }