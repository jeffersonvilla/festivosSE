const festivoServicio = require('../servicio/festivo.servicio');
const fechas = require('../servicio/fechas');

exports.verificar = (solicitud, respuesta) => {

    //Verifica que la fecha se valida, si no lo es retorna mensaje
    if(!fechas.esFechaValida(solicitud.params.anio, solicitud.params.mes, solicitud.params.dia)){
        return respuesta.send("Fecha No valida");
    }

    //Verfica si es festivo y retorna respuesta
    festivoServicio.verificarFestivo(
        solicitud.params.anio, solicitud.params.mes, solicitud.params.dia,
        (error, datos) => {
        if (error) {
            return respuesta.status(500).send(
                {
                    mensaje: "Error obteniendo la lista de festivos"
                }
            );
        }
        return respuesta.send(datos);
    });
}