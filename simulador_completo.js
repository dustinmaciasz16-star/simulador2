
  let clientes = [];
  let creditos = [];

  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;

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
      mostrarTexto("mensajeTasa", "tasa configurada correctamente: "+ num +"%");
    }else{
      mostrarTexto("mensajeTasa", "La tasa debe estar ente 10% y 20%");
    }
  }
  
//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios