*se crea una instancia configiurada de axios para hablar con el 
*backend (node express) en vez de copiar una url completa 
*cada peticion la dejamos configurada una vez aqui 
*/ 

//librerias para hacer peticiones  HTTP (GET POST )

import axios from 'axios'

/**
 * url base del backend en un proyecto real esto vendria de una 
 * variable de entorno vite (import.meta.env VITE_API_URL),
 * pero la vamos a dejar fija apuntando al backend
 */

const API_URL = 'http//localhost:4000/api';

//axios.create genera una instancia propia distinta del axios global
//con configuracion ya lista para usar en toda la aplicacion

const axiosClient = axios.create({
    baseURL: API_URL,// se antepone automaticamente  a cada ruta relativa 
})

headers: {
    'content-type': 'aplicattio/json',
}

axiosClient.interceptors.request.use((config)=> { 
    //revisamos si hay un token guardado de una sesion inicida 
const token = localStorage.getItem('token');
if (token){
    lo agregamos al header en el formato que esepra el backend:
    //authrization: beader <token>
    config.headers.authorization = `Bearer $ 
    {token}`;

    return config;


});

//exportamos la instancia ya configuarda para usarla en toda la app
export default axiosClient;