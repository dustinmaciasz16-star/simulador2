
  let clientes = [];
  let creditos = [];

  let tasaInteres = 15;
  let montoMaximo = 100000;
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;

  document.getElementById("btn1").onclick = () => limpiar();

  function ocultarSecciones(){
    let seccion = document.querySelectorAll("section");

    seccion.forEach(clase => {
      clase.classList.remove("activa");
    });
  }

  function mostrarSeccion(id){
    ocultarSecciones();
    document.getElementById(id).classList.add("activa");
  }

  function guardarTasa(){
    let num = recuperarFloat("tasaInteres");

    if(num >= 10 && num <= 20){
      tasaInteres = num;
      mostrarTexto("mensajeTasa", "tasa configurada correctamente: "+ num +"%");
    }else{
      mostrarTexto("mensajeTasa", "La tasa debe estar ente 10% y 20%");
    }
  }

  function guardarCliente(){
    let cedula = recuperarInt("input1");
    let nombre = recuperaraTexto("input2");
    let apellido = recuperaraTexto("input3");
    let email = recuperaraTexto("input4");
    let telefono = recuperaraTexto("input7");
    let ingreso = recuperarFloat("input5");
    let egreso = recuperarFloat("input6");
    if(clienteSeleccionado == null){

      let cliente = {
        cedula: cedula,
        nombre: nombre,
        apellido: apellido,
        email: email,
        telefono: telefono,
        ingreso: ingreso,
        egreso: egreso
      };
      clientes.push(cliente);
    }else{
      clienteSeleccionado.nombre = nombre;
      clienteSeleccionado.apellido = apellido;
      clienteSeleccionado.email = email;
      clienteSeleccionado.telefono = telefono;
      clienteSeleccionado.ingreso = ingreso;
      clienteSeleccionado.egreso = egreso;
    }

    clienteSeleccionado = null;
    limpiar();
    pintarCliente()

    document.getElementById("btnG").textContent = "Guardar cliente";
  }

  function limpiar(){
    mostrarTextoEnCaja("input1", "");
    mostrarTextoEnCaja("input2", "");
    mostrarTextoEnCaja("input3", "");
    mostrarTextoEnCaja("input4", "");
    mostrarTextoEnCaja("input5", "");
    mostrarTextoEnCaja("input6", "");
    mostrarTextoEnCaja("input7", "");
  }

  function guardarMontoMaximo(){
    let monto = recuperarFloat("montoMaximo");
    montoMaximo = monto;
    alert("Monto máximo configurado: " + monto);
  }

  function pintarCliente(){
    let tabla = document.getElementById("tablaClientes");

    tabla.innerHTML = "";

    clientes.forEach(cliente => {
      let fila = 
      "<tr>" +
      "<td>" + cliente.cedula + "</td>" +
      "<td>" + cliente.nombre + "</td>" +
      "<td>" + cliente.apellido + "</td>" +
      "<td>" + cliente.email + "</td>" +
      "<td>" + cliente.telefono + "</td>" +
      "<td>" + cliente.ingreso + "</td>" +
      "<td>" + cliente.egreso + "</td>" +
      "<td>"+
      "<button onclick='seleccionarCliente("+ cliente.cedula +")'>Actualizar</button>"+
      "<button onclick='eliminar("+ cliente.cedula +")'>Eliminar</button>"+
      "</td>"+
      "</tr>";

      tabla.innerHTML += fila;
    });
  }

  function buscarCliente(cedula){
    return clientes.find(cliente => cliente.cedula === cedula) || null;
  }

  function seleccionarCliente(cedula){
    let cliente = buscarCliente(cedula);
    if (cliente != null) {
      clienteSeleccionado = cliente;

      mostrarTextoEnCaja("input1", cliente.cedula);
      mostrarTextoEnCaja("input2", cliente.nombre);
      mostrarTextoEnCaja("input3", cliente.apellido);
      mostrarTextoEnCaja("input4", cliente.email);
      mostrarTextoEnCaja("input5", cliente.ingreso);
      mostrarTextoEnCaja("input6", cliente.egreso);
      mostrarTextoEnCaja("input7", cliente.telefono);
      document.getElementById("btnG").textContent = "Actualizar Cliente";

    }else{
      console.log("Cliente no encontrado");
    }
  }

  function eliminar(cedula){

      let indice = -1;

      clientes.forEach((cliente, i) => {
          if(cliente.cedula == cedula){
              indice = i;
          }
      });

      if(indice != -1){
          clientes.splice(indice, 1);
      }

      pintarCliente();
  }
  

  function buscarClienteCredito(){
    let cedulaCliente = recuperarInt("cedulaCredito");
    let clienteCredito = clientes.find(cedulaC => cedulaC.cedula == cedulaCliente);
    let contenedor = document.getElementById("clienteCredito");

    if(clienteCredito != null){
      clienteSeleccionado = clienteCredito;

      contenedor.innerHTML = "<h3>Datos del Cliente</h3>" +
                             "<p><strong>Cédula:</strong>"+ clienteCredito.cedula +"</p>"+
                             "<p><strong>Nombre:</strong>"+ clienteCredito.nombre +"</p>"+
                             "<p><strong>Apellido:</strong>"+ clienteCredito.apellido +"</p>"+
                             "<p><strong>Email:</strong>"+ clienteCredito.email +"</p>"+
                              "<p><strong>Teléfono:</strong>"+ clienteCredito.telefono +"</p>"+
                             "<p><strong>Ingresos:</strong>"+ clienteCredito.ingreso +"</p>"+
                             "<p><strong>Egresos:</strong>"+ clienteCredito.egreso +"</p>";
    }else{
      contenedor.innerHTML = "<p>Cliente no encontrado</p>";
      clienteSeleccionado = null;
    }
  }

  function mostrarCreditoVip(){
    let creditoVip = creditos.filter(credito => credito.monto > 5000);
    console.log(creditoVip);
    pintarCreditos(creditoVip);
  }

  function calcularCredito(){

  if(clienteSeleccionado == null){
    document.getElementById("resultadoCredito").innerHTML = "Seleccione un cliente primero";
    return;
  }

  let monto = recuperarFloat("montoCredito");
  let plazo = recuperarInt("plazoCredito");

  if(monto > montoMaximo){
    alert("El monto solicitado excede el monto máximo permitido: " + montoMaximo);
    mostrarTextoEnCaja("montoCredito", "");
    return;
  }

  let disponible = calcularDisponible(clienteSeleccionado.ingreso, clienteSeleccionado.egreso);

  let capacidad = calcularCapacidadDePago(disponible);

  let interes = calcularInteresSimple(monto, tasaInteres, plazo);

  let total = calcularTotalPagar(monto, interes);

  let cuota = calcularCuotaMensual(total, plazo);

  let resultado = aprobarCredito(capacidad, cuota);

  cuotaCalculada = cuota;
  montoCalculado = monto;
  plazoCalculado = plazo;

  let contenedor = document.getElementById("resultadoCredito");

  contenedor.innerHTML =
    "Capacidad de pago: " + capacidad + "<br>" +
    "Total a pagar: " + total + "<br>" +
    "Cuota mensual: " + cuota + "<br>" +
    "RESULTADO: " + resultado;

  if(resultado.includes("APROBADO")){
      contenedor.className = "aprobado";
      document.getElementById("asignar").disabled = false;
  }else{
      contenedor.className = "rechazado";
      document.getElementById("asignar").disabled = true;
  }
}

function asignarCredito(){

  let credito = {

    cedula: clienteSeleccionado.cedula,
    nombre: clienteSeleccionado.nombre,
    apellido: clienteSeleccionado.apellido,
    email: clienteSeleccionado.email,
    telefono: clienteSeleccionado.telefono,
    monto: montoCalculado,
    tasa: tasaInteres,
    plazo: plazoCalculado,
    cuota: cuotaCalculada

  };

  creditos.push(credito);

  alert("Crédito asignado correctamente");

}

function buscarCreditos(cedula){

  let creditosEncontrados = creditos.filter(credito => credito.cedula == cedula);

  return creditosEncontrados;

}

function pintarCreditos(listaCreditos){

  let tabla = document.getElementById("tablaCreditos");

  tabla.innerHTML = "";

  listaCreditos.forEach(credito => {

    let fila =
    "<tr>" +
      "<td>" + credito.cedula + "</td>" +
      "<td>" + credito.nombre + "</td>" +
      "<td>" + credito.apellido + "</td>" +
      "<td>" + credito.email + "</td>" +
      "<td>" + credito.telefono + "</td>" +
      "<td>" + credito.monto + "</td>" +
      "<td>" + credito.tasa + "</td>" +
      "<td>" + credito.plazo + "</td>" +
      "<td>" + credito.cuota + "</td>" +
    "</tr>";

    tabla.innerHTML += fila;

  });

}
function buscarCreditosCliente(){

  let cedula = recuperarInt("cedulaBusqueda");

  let creditosEncontrados = buscarCreditos(cedula);

  pintarCreditos(creditosEncontrados);

}

//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios