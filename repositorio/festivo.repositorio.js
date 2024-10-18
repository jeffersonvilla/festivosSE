const bd = require('./bd');

const FestivoRepositorio = () => { };

FestivoRepositorio.listarFestivos = async (respuesta) => {
    const basedatos = bd.obtenerBD();
    try {
        const resultado = await
            basedatos.collection('tipos')
                .aggregate([
                    { $unwind: "$festivos" },
                    { $project: {
                        id: '$id',
                        dia: '$festivos.dia', 
                        mes: '$festivos.mes', 
                        nombre: '$festivos.nombre', 
                        diasPascua: '$festivos.diasPascua'
                    }}
                ]).toArray();
        
        return respuesta(null, resultado);
    }
    catch (error) {
        console.error('Error al listar los festivos:', error);
        respuesta(error, null);
    }
}

FestivoRepositorio.obtenerFestivosPorAnio = async (anio, respuesta) => {
    const basedatos = bd.obtenerBD();
    try {
        const resultado = await basedatos.collection('tipos')
            .aggregate([
                { $unwind: "$festivos" },
                { $match: { "festivos.anio": anio } }, // Filtrar por el año
                { $project: {
                    _id: 0, // Excluir el _id de la salida
                    dia: '$festivos.dia', 
                    mes: '$festivos.mes', 
                    nombre: '$festivos.nombre'
                }}
            ]).toArray();
        
        return respuesta(null, resultado);
    } catch (error) {
        console.error('Error al obtener los festivos:', error);
        respuesta(error, null);
    }
}


module.exports = FestivoRepositorio;