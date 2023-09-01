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
    }
    if (fechaFin <= today) {
      activeButtons(i, "Fin");
      replaceUrl(weeksData[i].cuestionarios.urlFin, i, "Fin");
    }
  }
}

function formatDate(dateString) {
  const dt = dateString.split(/\-|\s/);
  const date = new Date(dt.slice(0, 3).reverse().join("-") + " " + dt[3]);
  return date;
}

// Función para activar los botones de inicio y fin de semana
function activeButtons(id, elem) {
  let element = `btn${elem}Sem${id}`;
  let btn = document.getElementById(element);
  if (btn.classList.contains("disabled")) {
    btn.classList.remove("disabled");
  } else {
    btn.removeAttribute("disabled");
  }
}

// Función para cambiar la url del botón pre quiz y quiz
function replaceUrl(url, id, elem) {
  let element = `btn${elem}${id}`;
  let btn = document.getElementById(element);
  if (btn) {
    btn.setAttribute("href", url);
  }
}

function changeImg(sem) {
  const selectElement = document.getElementById("miSelect");
  const selectedId = selectElement.value;
  // Busca el elemento en los datos del JSON
  const selectedData = data.find((item) => item.id === selectedId);
  const semIni = `S${sem}Inicio`;
  const semFin = `S${sem}Fin`;
  if (selectedData) {
    document.getElementById(`imgIni`).src = `img/img${selectedData[semIni]}Ini.svg`;
    document.getElementById(`imgFin`).src = `img/img${selectedData[semFin]}Fin.svg`;
  }
}

// Función para mostrar los datos correspondientes al cambio en el select
function mostrarDatos() {
  const selectElement = document.getElementById("miSelect");
  const selectedId = selectElement.value;

  // Busca el elemento en los datos del JSON
  const selectedData = data.find((item) => item.id === selectedId);

  changeImg("1");

  // Mostrar contenido correspondiente a Decanatura
  document.getElementById("Deca1").style.display = selectedData.Deca1 === "1" ? "block" : "none";
  document.getElementById("Deca2").style.display = selectedData.Deca2 === "1" ? "block" : "none";
  document.getElementById("Deca3").style.display = selectedData.Deca3 === "1" ? "block" : "none";

  // Mostrar imagen correspondiente a Matemáticas
  document.getElementById(`imagen`).src = `img/foto${selectedData.imagen}.svg`;

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
