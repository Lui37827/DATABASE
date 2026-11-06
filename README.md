<<<<<<< HEAD
# PROYECTO EN REACT SISTEMA DE INVENTARIO 
el sistema de inventario contara con inicio de sesion 
con base de datos en mysql con contraseña encriptada y 
JWT

El dashboard contara con gestion CRUD de **Usuarios, 

## STOCK USADO 
Frontend = react 19 + vite + bootstrap + react router
Backend ( solo para login ) = node.js + express + jwt
base de datos = mysql (xampp) + inventario_react
Encriptacion de contraseña = bcrypt (bcryptjs)
gestiones = usuarios, categorias, subcategorias,
productos/datos simulados en JS (useState +
localStorage)
Automatizacion npm scripts + concurrently 

pre requisitos 
# 1
instalar node.js verificar desde cmd con node -v
# 2 
tener XAMPP instalado con mysql en puerto 3306 
# 3 
tener un editor de codigo 

# conocimientos previos 

**componente**
la pantalla se divide en piezas pequeñas y 
reutilizables 
un boton, una tabla, un formulario, un menu cada
componente es una funcion de javascript que devuelve lo que tiene que 
mostrar 

**JSX** una sintaxis que permite escribir algo parecido 
a html dentro de javascript por eso los archivos
terminan con extension .jsx ejemplo 

```jsx
function saludo () {
    return <h1 className="text-primary">hola, react</h1>
}
```

- **estado (state)** cada componente puede guardar datos que cambian por ejemplo, lo que el usuario escribe en un input, cuando el estado cambia react vuelve a dibujar automaticamente 
solo lo necesario sin recargar la pagina 

**SPA** La aplicacion se carga sola una vez en el 
navegador y luego cambia de pagina sin recargar para esto usamos 'react-router-dom'
**axios** para hablar entre frontend y backend 
**react-router-dom** para las rutas 

# pasos para crear proyecto 

-1 verifique que tenga node.js 
-2 desde la raiz del proyecto crea el proyecto con react y vite 
'npm create vite@latest frontend -- -- template react'
-3 entra a carpeta frontend con 'cd frontend' e instala npm 'npm install'
-4 instale las librerias 'npm install bootstrap'
5 empaquetador optimiza y junta todo el css en un solo archivo al hacer 'npm run build'
6 instalar las dependencias del backend y frontend al tiempo 'npm run install:all'
7 ingresar a la carpeta backend 'npm init -y' 
8 instalar dependencias
8.1 'npm install express mysql2 bcryptjs jsonwebtoken cors dotenv'
8.2 crea .env dentro de backend para las variables de entorno 
8.3 crea src/config/db.js conexion con DB 
8.4 crea src/middlewares/verificartoken.js valida el token JWT en rutas protegidas
8.5 crea src/controllers/auth.controller.js es la logica de inicio de sesion
8.6 crea src/routes/auth.routes.js
8.7 crea src/server.js
8.8 crea en backend seed.js
=======
ostia xchacañe,spl# DATABASE
>>>>>>> 027c0fc466be7ccf6cc862bcb6aaeede33b64402
