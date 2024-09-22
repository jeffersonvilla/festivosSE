const festivoRepositorio = require('../repositorio/festivo.repositorio');
const fechas = require('./fechas');
const Festivo = require('../modelo/festivo.modelo')

const FestivoServicio = () => { };

//Se asume que recibe fecha valida
FestivoServicio.verificarFestivo = (año, mes, dia, respuesta) => {

    festivoRepositorio.listarFestivos((error, datos) => {
        if (error) {
            return respuesta(error, datos);
        }

        // Calcular los festivos para el año
        const festivosAño = calcularFestivos(datos, año);

        festivosAño.sort((a, b) => {
            return a.getFecha() - b.getFecha(); // Resta para ordenar por fechas
        });

        console.log(festivosAño);

        const fechaParaVerificar = new Date(año, mes - 1, dia);

        // Verificar si la fechaParaVerificar está en festivosAño
        const esFestivo = festivosAño.some(festivo => {
            const fechaFestivo = festivo.getFecha(); 
            return fechaFestivo && fechaFestivo.toDateString() === fechaParaVerificar.toDateString();
        }) ? "Es Festivo" : "No es festivo";

        return respuesta(null, esFestivo);
    });
};

function calcularFestivos(festivos, año) {

    if (festivos && festivos.length > 0) {
        
        // Crear una nueva lista para los festivos calculados
        const festivosCalculados = [];
        
        // Obtener el domingo de Pascua del año
        let ramos = fechas.obtenerSemanaSanta(año);

        //Agrego domingo de Ramos
        let domingoRamos = new Festivo(5, "Domingo de Ramos")
        domingoRamos.setFecha(ramos);
        festivosCalculados.push(domingoRamos);

        festivos.forEach(festivo => {

            // Crear una nueva instancia de Festivo
            const festivoCalculado = new Festivo(festivo.id, festivo.nombre);

            //Define fecha en base al año, mes y día
            const fechaFestivo = new Date(año, festivo.mes - 1, festivo.dia);

            // Calcular la Domingo de Pascua
            let domingoPascua = fechas.agregarDias(ramos, 7);

            let fechaBasadaEnPascua = fechas.agregarDias(domingoPascua, festivo.diasPascua);

            switch (festivo.id) {
                case 1: 
                    //Para tipo 1, dejar la misma fecha
                    festivoCalculado.setFecha(fechaFestivo);
                    break;
                case 2:
                    // Para tipo 2, mover la fecha al siguiente lunes
                    festivoCalculado.setFecha(fechas.siguienteLunes(fechaFestivo));
                    break;
                case 3:
                    // Para tipo 3, usar la fecha basada en Pascua
                    festivoCalculado.setFecha(fechaBasadaEnPascua);
                    break;
                case 4:
                    // Para tipo 4, mover la fecha basada en Pascua al siguiente lunes
                    festivoCalculado.setFecha(fechas.siguienteLunes(fechaBasadaEnPascua));
                    break;
            }

             // Agregar el festivo calculado a la nueva lista
             festivosCalculados.push(festivoCalculado);
        });

        return festivosCalculados;
    }
    return null;
}

module.exports = FestivoServicio;