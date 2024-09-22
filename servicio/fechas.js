function obtenerSemanaSanta(año){
    const a = año % 19;
    const b = año % 4;
    const c = año % 7;
    const d = (19 * a + 24) % 30;

    const dias = d + (2 * b + 4 * c + 6 * d + 5) % 7;

    let mes = 3;
    let dia = 15 + dias;

    if(dia > 31){
        mes = 4;
        dia = dia - 31;
    }
    return new Date(año, mes - 1, dia);
}

function agregarDias(fecha, dias){
    let fechaT = new Date(fecha);
    fechaT.setDate(fechaT.getDate() + dias);
    return fechaT;
}

function siguienteLunes(fecha){
    let fechaT = new Date(fecha);
 
    const diaSemana = fechaT.getDay();

    if(diaSemana > 1){
        fechaT = agregarDias(fechaT, 8 - diaSemana);
    }else if(diaSemana < 1){
        fechaT = agregarDias(fechaT, 1);
    }
    return fechaT;
}

function esFechaValida(año, mes, dia) {
  
  // Intentar crear la fecha
  const fecha = new Date(año, mes - 1, dia);

  // Verificar si la fecha es válida (no es NaN)
  const esValida = !isNaN(fecha.getTime());

  // Verificar que la fecha ingresada no haya sido ajustada (p.ej. 2023-02-30 -> 2023-03-02)
  if (esValida) {
    return fecha.getFullYear() == año && fecha.getMonth() + 1 == mes && fecha.getDate() == dia;
  }
  
  return false;
}

module.exports = {
    obtenerSemanaSanta,
    agregarDias,
    siguienteLunes,
    esFechaValida
}