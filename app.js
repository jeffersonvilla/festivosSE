const express = require('express') 
const app = express() 
const puerto = 3000 

const bd = require('./repositorio/bd');
bd.conectar();

app.use(express.json());

require('./rutas/festivo.rutas')(app);

app.listen(puerto, () => { console.log(`API Festivos escuchando en http://localhost:${puerto}`) })