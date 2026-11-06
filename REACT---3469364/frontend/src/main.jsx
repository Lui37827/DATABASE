//ayuda a detectar errores comunes en el desarrollo
import { StrictMode } from 'react'
//en la funcion moderna de React 18+ para montar la aplicacion en dom
import { createRoot } from 'react-dom/client'
//habilita el manejo de las rutas basado en la url del navegador
import { BrowserRouter } from 'react-router-dom'

//Estilos de bootstrap clases como btn, container, table y demas
import 'bootstrap/dist/css/bootstrap.min.css';
//iconos de bootstrap clases como bi bi-trash
import "bootstrap-icons/font/bootstrap-icons.css";
//Javascript de bootstrao necesario para que funcionen los modales
//dropdowns y el menu de navegacion responsive
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

//Estilos propios del proyecto se cargan solos despues del bootstrap
//Descripcion detalles puntuales de la applicacion
import './index.css'

//Componente raiz con todas las rutas de la apliacion
import App from './App.jsx'

//Proveedor del contexto de sesion (Ver context/authContext.jsx)
import { AuthProvider } from './context/authContext.jsx'

//Busca el <div id="root> de index.html y engancha react ahi dentro"
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*BrowserRouter habilita la navegacion por url (react-router-dom)*/}
    
    <BrowserRouter>
    {/*AuthProvider comparte con toda la aplicacion quien es usuario logueado*/}
    <AuthProvider>
      <App />
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
