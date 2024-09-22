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

module.exports = FestivoRepositorio;