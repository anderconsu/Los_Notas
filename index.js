import express from "express";

const app = express();
app.use(express.static('public'))
app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('testeo');
})
app.listen(3000,()=>{console.log(`servidor en marcha en el puerto 3000 del container, en puerto ${process.env.PORT} EXTERNO`)});