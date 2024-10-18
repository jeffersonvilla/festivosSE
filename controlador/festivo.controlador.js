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
router.get('/obtener/:anio', async (req, res) => {
    const anio = parseInt(req.params.anio);

    FestivoRepositorio.obtenerFestivosPorAnio(anio, (error, resultado) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener los festivos' });
        }
        return res.status(200).json(resultado);
    });
});

module.exports = router;
