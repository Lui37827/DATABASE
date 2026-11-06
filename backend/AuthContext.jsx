/**
 * contexto global de autenticacion permite qiue cualquier 
 * componente de la app (sidebar, navbar, paginas protegidas y de mas)
 * sepa si hay un usuario logueado quien es y pued< cerrar sesion 
 * sin tener que pasr esa informacion "a mano" der com´ponente en
 * componente( esos se llama " prop drilling" y el context lo evita)
 * 
 */

//creteContext: crea el contexto; useContext: lo consume; useeffect:
//codigo que corre en momentos especificos del ciclo de vida; useState:
//estado local del componente

import {createContext, useContext,
    useEffect, useState
}from 'react';
//funcion de que llama al backend para validar email/password 
import {iniciarSesion } from '../api/authService';

//1) creamos el contexto (una especie de caja compartida )

const AuthContext = createContext(null);

//2) componente proveedor: envuelve la app y lr da tus 
//hijso acceso al valor de autenticacion actual


export function AuthProvider({children}){
    //usuario:datospublicos del usuario logueado (o null si no hay sesion)
    const [usuario, setUsuario] = useState(null);


    const [cargando, setCargando] = useState
    (true);

    //useEffect con arreglo vacio [] -> se ejecuta Una sola vez,
    //justo cuando la app arranca
useEffect(() => {
    const usuarioGuardado = 
    localStorage.getItem('usuario');
    const tokenGuardado = localStorage
    getItem('token');
    if (usuarioGuardado && tokenGuardado){
        setUsuario(JSON.parse 
            (usuarioGuardado));
    }
})


}

useEffect