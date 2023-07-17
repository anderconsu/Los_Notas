import express from "express";
import router from "./routes/main.js";
import dotenv from "dotenv";
import session from "express-session";
dotenv.config();

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(session(
    {
    secret: process.env.SESSION_SECRET, // Clave de encriptación de las cookies (puede ser cualquier string)
    resave: true, // No guardar la sesión en cada petición si no hay cambios
    saveUninitialized: false, // No crear automáticamente una sesión vacía para cada petición
    cookie: { 
        secure: false, // La cookie se debe enviar sólo sobre HTTPS (true) o también sobre HTTP (false)
        maxAge: 1000 * 60  * 30// Caducidad de la cookie: 2 minutos lo cambie a 30 para pruebas
    }, 
    
}));

app.use(function(req,res,next){ // Middleware para pasar datos a las vistas
    res.locals.session = req.session;
    next();
});

app.use(express.static('public'))

app.set('views', './views');
app.set('view engine', 'pug');

app.use("/",router);


app.listen(3000,()=>{console.log(`servidor en marcha en el puerto 3000 del container, en puerto ${process.env.APP_PORT} EXTERNO`)});