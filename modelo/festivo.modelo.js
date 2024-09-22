class Festivo {
    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre;
        this.fecha = null; 
    }

    setFecha(fecha) {
        this.fecha = fecha;
    }

    getFecha() {
        return this.fecha;
    }
}

module.exports = Festivo;