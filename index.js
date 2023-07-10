import express from "express";
import router from "./routes/main.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static('public'))

app.set('views', './views');
app.set('view engine', 'pug');

app.use("/",router);


app.listen(3000,()=>{console.log(`servidor en marcha en el puerto 3000 del container, en puerto ${process.env.APP_PORT} EXTERNO`)});