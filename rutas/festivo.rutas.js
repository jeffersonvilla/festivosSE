
module.exports = (app) => {

    const controlador = require("../controlador/festivo.controlador");

    app.get("/festivos/verificar/:anio/:mes/:dia", controlador.verificar);

    app.get('/festivos/obtener/:anio', controlador.obtener);

}