function calcularDisponible(ingresos, gastos){
    let disponible = ingresos - gastos;
    return disponible < 0 ? 0 : disponible;
}

function calcularCapacidadDePago(disponible){
    return disponible * 0.4;
}

function calcularInteresSimple(monto, tasa, plazo){
    return monto * (tasa / 100) * plazo;
}

function calcularTotalPagar(monto, interes){
    const SOLCA = 100;
    return monto + interes + SOLCA;
}

function calcularCuotaMensual(total, plazo){
    return total / plazo;
}

function aprobarCredito(capacidad, cuota){
    return capacidad >= cuota * 0.7 ? "CRÉDITO APROBADO" : "CRÉDITO RECHAZADO";
}