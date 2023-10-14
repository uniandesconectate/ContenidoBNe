window.addEventListener("load", () => {
  const seccion = document.querySelector("#bnSeccion").value;
  const today = getDate();
  getSeccionData(seccion, today);
});

// Obtner la fecha actual y formatearla
function getDate() {
  const today = Date.now();
  return today;
}

// obtener los datos de la sección del JSON
function getSeccionData(seccion, today) {
  let seccionesData = {};
  const url = "semanas.json";
  const data = fetch(url);
  data
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      seccionesData = data;
      const seccionData = seccionesData[seccion];
      compareDate(today, seccionData);
      return seccionData;
    });
}

// Función para comparar la fecha actual con las fechas de inicio y fin de cada semana, activar los botones y cambiar las url
function compareDate(today, weeksData) {
  const lenght = Object.keys(weeksData).length;
  for (let i = 1; i <= lenght; i++) {
    let fechaInicio = formatDate(weeksData[i].fechaInicio);
    let fechaFin = formatDate(weeksData[i].fechaFin);
    if (fechaInicio <= today) {
      activeButtons(i, "Ini");
      replaceUrl(weeksData[i].cuestionarios.urlInicio, i, "Ini");
    } else {
      replaceUrl("#", i, "Ini");
    }
    if (fechaFin <= today) {
      activeButtons(i, "Fin");
      replaceUrl(weeksData[i].cuestionarios.urlFin, i, "Fin");
    } else {
      replaceUrl("#", i, "Fin");
    }
  }
}

// función para formatear fecha
function formatDate(dateString) {
  const dt = dateString.split(/\-|\s/);
  const date = new Date(dt.slice(0, 3).reverse().join("-") + " " + dt[3]);
  return date;
}

// Función para activar los botones de inicio y fin de semana
function activeButtons(id, elem) {
  let element = `btn${elem}Sem${id}`;
  let btn = document.getElementById(element);
  if (elem === "Ini") {
    if (btn.classList.contains("disabled")) {
      btn.classList.remove("disabled");
    } else {
      btn.removeAttribute("disabled");
    }
  }
}

// Función para cambiar la url del botón pre quiz y quiz
function replaceUrl(url, id, elem) {
  let element = `btn${elem}${id}`;
  let btn = document.getElementById(element);
  if (btn) {
    btn.setAttribute("href", url);
  }
  /* if (url == "#") {
    btn.classList.add("disabled");
  } */
}

function getData() {
  const selectElement = document.getElementById("miSelect");
  const selectedId = selectElement.value;
  // Busca el elemento en los datos del JSON
  const selectedData = data.find((item) => item.id === selectedId);

  return selectedData;
}

function changeImg(sem) {
  const selectedData = getData();

  const semIni = `S${sem}Inicio`;
  const semFin = `S${sem}Fin`;
  if (selectedData) {
    document.getElementById(`imgIni`).src = `img/img${selectedData[semIni]}Ini.svg`;
    document.getElementById(`imgFin`).src = `img/img${selectedData[semFin]}Fin.svg`;
  }

  changeDecaImg(sem);
  showRecursos(sem);
}

function showRecursos(sem) {
  const seccion = document.querySelector("#bnSeccion").value;
  const recursos = document.querySelector("#recursos");
  const maratonSalon = document.getElementById(`maratonSalon`);
  const maratonHorario = document.getElementById(`maratonHorario`);
  const maratonUrl = document.getElementById(`maratonUrl`);
  const atencionDias = document.getElementById(`atencionDias`);
  const atencionHorario = document.getElementById(`atencionHorario`);
  const atencionCorreo = document.getElementById(`atencionCorreo`);
  const urlMatematicas = document.getElementById(`urlMatematicas`);
  const tallerFecha = document.getElementById(`tallerFecha`);
  const tallerHorario = document.getElementById(`tallerHorario`);
  const tallerSalon = document.getElementById(`tallerSalon`);
  const tallerUrl = document.getElementById(`tallerUrl`);
  const videos = document.querySelectorAll(".videos");
  const video = document.getElementById(`videos-${sem}`);

  let seccionesData = {};
  const url = "semanas.json";
  const data = fetch(url);
  data
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const today = getDate();
      seccionesData = data;
      const selectedData = seccionesData[seccion];
      let fechaFin = formatDate(selectedData[sem].fechaFin);

      maratonSalon.innerHTML = selectedData[sem].recursos.maraton.salon;
      maratonHorario.innerHTML = selectedData[sem].recursos.maraton.horario;
      maratonUrl.setAttribute("href", selectedData[sem].recursos.maraton.urlFormulario);
      atencionDias.innerHTML = selectedData[sem].recursos.atencionDoc.dias;
      atencionHorario.innerHTML = selectedData[sem].recursos.atencionDoc.horario;
      atencionCorreo.innerHTML = selectedData[sem].recursos.atencionDoc.correo;
      urlMatematicas.setAttribute("href", selectedData[sem].recursos.urlDocMatematicas);
      tallerFecha.innerHTML = selectedData[sem].recursos.taller.fecha;
      tallerHorario.innerHTML = selectedData[sem].recursos.taller.horario;
      tallerSalon.innerHTML = selectedData[sem].recursos.taller.salon;
      tallerUrl.setAttribute("href", selectedData[sem].recursos.taller.urlInscripcion);

      videos.forEach((vid) => {
        if (!vid.classList.contains("hide")) {
          vid.classList.add("hide");
        }
      });

      if (video.classList.contains("hide")) {
        video.classList.remove("hide");
      }

      if (fechaFin <= today) {
        if (recursos.classList.contains("hide")) {
          recursos.classList.remove("hide");
        }
      } else if (!recursos.classList.contains("hide")) {
        recursos.classList.add("hide");
      }
    });
}

function activeOnLoadButtons(sem) {
  const selectedData = getData();

  const semIni = `btnIniSem${sem}`;

  if (selectedData) {
    const btnIni = document.getElementById(semIni);
    const paneIni = document.getElementById(`sem${sem}-ini-tab-pane`);

    if (btnIni.classList.contains("disabled")) {
      btnIni.classList.remove("disabled");
      btnIni.classList.add("active");
      btnIni.setAttribute("aria-expanded", "true");
      paneIni.classList.add("fade", "show", "active");
    } else {
      btnIni.removeAttribute("disabled");
      btnIni.classList.add("active");
      btnIni.setAttribute("aria-expanded", "true");
      paneIni.classList.add("fade", "show", "active");
    }
  }
}

function changeDecaImg(sem) {
  const fodosSemana = document.querySelectorAll(".urlFondoSem");
  fodosSemana.forEach((fondoSem) => {
    fondoSem.classList.remove("show");
    fondoSem.classList.add("hide");
  });
  document.getElementById(`fondoSem${sem}`).classList.add("show");
  document.getElementById(`fondoSem${sem}`).classList.remove("hide");
}

// Función para mostrar los datos correspondientes al cambio en el select
function mostrarDatos() {
  mostrarDatosM1();

  mostrarDatosM3();
}

function mostrarDatosM1() {
  const selectElement = document.getElementById("miSelect");
  const selectedId = selectElement.value;

  // Busca el elemento en los datos del JSON
  const selectedData = data.find((item) => item.id === selectedId);

  changeImg("1");
  activeOnLoadButtons("1");
  changeDecaImg("1");

  // Mostrar contenido correspondiente a Decanatura
  document.getElementById("Deca1").style.display = selectedData.Deca1 === "1" ? "block" : "none";
  document.getElementById("Deca2").style.display = selectedData.Deca2 === "1" ? "block" : "none";
  document.getElementById("Deca3").style.display = selectedData.Deca3 === "1" ? "block" : "none";

  // Mostrar imagen correspondiente a Matemáticas
  document.getElementById(`imagen`).src = `img/foto${selectedData.Imagen}.svg`;

  // Mostrar contenido correspondiente a P1 y P2
  document.getElementById("P1").style.display = selectedData.P1 === "1" ? "block" : "none";
  document.getElementById("P2").style.display = selectedData.P2 === "1" ? "block" : "none";
  document.getElementById("P3").style.display = selectedData.P3 === "1" ? "block" : "none";
  document.getElementById("P4").style.display = selectedData.P4 === "1" ? "block" : "none";
  document.getElementById("P5").style.display = selectedData.P5 === "1" ? "block" : "none";

  // Mostrar/ocultar los botones de las pestañas según el estado de P1 y P2
  let btnP1Tab = document.getElementById("navItemP1");
  let btnP2Tab = document.getElementById("navItemP2");
  let btnP3Tab = document.getElementById("navItemP3");
  let btnP4Tab = document.getElementById("navItemP4");
  let btnP5Tab = document.getElementById("navItemP5");

  // Mostrar/ocultar las pestañas según el estado de P1 y P2
  let p1Tab = document.getElementById("p1-tab");
  let p2Tab = document.getElementById("p2-tab");
  let p3Tab = document.getElementById("p3-tab");
  let p4Tab = document.getElementById("p4-tab");
  let p5Tab = document.getElementById("p5-tab");

  if (selectedData.P1 === "1") {
    btnP1Tab.style.display = "list-item";
    p1Tab.style.display = "block";
  } else {
    btnP1Tab.style.display = "none";
    p1Tab.style.display = "none";
  }

  if (selectedData.P2 === "1") {
    btnP2Tab.style.display = "list-item";
    p2Tab.style.display = "block";
  } else {
    btnP2Tab.style.display = "none";
    p2Tab.style.display = "none";
  }

  if (selectedData.P3 === "1") {
    btnP3Tab.style.display = "list-item";
    p3Tab.style.display = "block";
  } else {
    btnP3Tab.style.display = "none";
    p3Tab.style.display = "none";
  }

  if (selectedData.P4 === "1") {
    btnP4Tab.style.display = "list-item";
    p4Tab.style.display = "block";
  } else {
    btnP4Tab.style.display = "none";
    p4Tab.style.display = "none";
  }

  if (selectedData.P5 === "1") {
    btnP5Tab.style.display = "list-item";
    p5Tab.style.display = "block";
  } else {
    btnP5Tab.style.display = "none";
    p5Tab.style.display = "none";
  }
}

function mostrarDatosM3() {
  const selectElement = document.getElementById("miSelect");
  const selectedId = selectElement.value;

  // Busca el elemento en los datos del JSON
  const selectedData = data.find((item) => item.id === selectedId);

  changeImg("1");
  activeOnLoadButtons("1");
  changeDecaImg("1");

  // Mostrar contenido correspondiente a Decanatura
  document.getElementById("M3Deca1").style.display = selectedData.Deca1 === "1" ? "block" : "none";
  document.getElementById("M3Deca2").style.display = selectedData.Deca2 === "1" ? "block" : "none";
  document.getElementById("M3Deca3").style.display = selectedData.Deca3 === "1" ? "block" : "none";

  // Mostrar imagen correspondiente a Matemáticas
  document.getElementById(`imagenM3`).src = `img/foto${selectedData.M3Imagen}.svg`;

  // Mostrar contenido correspondiente a P1 y P2
  document.getElementById("M3P1").style.display = selectedData.M3P1 === "1" ? "block" : "none";
  document.getElementById("M3P2").style.display = selectedData.M3P2 === "1" ? "block" : "none";
  document.getElementById("M3P3").style.display = selectedData.M3P3 === "1" ? "block" : "none";
  document.getElementById("M3P4").style.display = selectedData.M3P4 === "1" ? "block" : "none";
  document.getElementById("M3P5").style.display = selectedData.M3P5 === "1" ? "block" : "none";

  // Mostrar/ocultar los botones de las pestañas según el estado de P1 y P2
  let btnP1Tab = document.getElementById("navItemM3P1");
  let btnP2Tab = document.getElementById("navItemM3P2");
  let btnP3Tab = document.getElementById("navItemM3P3");
  let btnP4Tab = document.getElementById("navItemM3P4");
  let btnP5Tab = document.getElementById("navItemM3P5");

  // Mostrar/ocultar las pestañas según el estado de P1 y P2
  let p1Tab = document.getElementById("m3p1-tab");
  let p2Tab = document.getElementById("m3p2-tab");
  let p3Tab = document.getElementById("m3p3-tab");
  let p4Tab = document.getElementById("m3p4-tab");
  let p5Tab = document.getElementById("m3p5-tab");

  if (selectedData.M3P1 === "1") {
    btnP1Tab.style.display = "list-item";
    p1Tab.style.display = "block";
  } else {
    btnP1Tab.style.display = "none";
    p1Tab.style.display = "none";
  }

  if (selectedData.M3P2 === "1") {
    btnP2Tab.style.display = "list-item";
    p2Tab.style.display = "block";
  } else {
    btnP2Tab.style.display = "none";
    p2Tab.style.display = "none";
  }

  if (selectedData.M3P3 === "1") {
    btnP3Tab.style.display = "list-item";
    p3Tab.style.display = "block";
  } else {
    btnP3Tab.style.display = "none";
    p3Tab.style.display = "none";
  }

  if (selectedData.M3P4 === "1") {
    btnP4Tab.style.display = "list-item";
    p4Tab.style.display = "block";
  } else {
    btnP4Tab.style.display = "none";
    p4Tab.style.display = "none";
  }

  if (selectedData.M3P5 === "1") {
    btnP5Tab.style.display = "list-item";
    p5Tab.style.display = "block";
  } else {
    btnP5Tab.style.display = "none";
    p5Tab.style.display = "none";
  }
}
