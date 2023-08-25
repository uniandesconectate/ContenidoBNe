// functions.js

// Función para mostrar los datos correspondientes al cambio en el select
function mostrarDatos() {
  debugger;
  const selectElement = document.getElementById("miSelect");
  const selectedId = selectElement.value;

  console.log(selectElement);
  console.log(selectedId);

  // Busca el elemento en los datos del JSON
  const selectedData = data.find((item) => item.id === selectedId);
  console.log(selectedData);

  // Mostrar contenido correspondiente a Decanatura
  document.getElementById("Deca1").style.display = selectedData.Deca1 === "1" ? "block" : "none";
  document.getElementById("Deca2").style.display = selectedData.Deca2 === "1" ? "block" : "none";
  document.getElementById("Deca3").style.display = selectedData.Deca3 === "1" ? "block" : "none";

  // Mostrar contenido correspondiente a Matemáticas
  for (let i = 0; i <= 6; i++) {
    document.getElementById(`Mat${i}`).style.display = selectedData.Mat === `${i}` ? "block" : "none";
    document.getElementById(`imagen${i}`).src = `img/foto${selectedData.imagen}.png`;
  }

  // Mostrar contenido correspondiente a P1 y P2
  document.getElementById("P1").style.display = selectedData.P1 === "1" ? "block" : "none";
  document.getElementById("P2").style.display = selectedData.P2 === "1" ? "block" : "none";
  document.getElementById("P3").style.display = selectedData.P3 === "1" ? "block" : "none";
  document.getElementById("P4").style.display = selectedData.P4 === "1" ? "block" : "none";
  document.getElementById("P5").style.display = selectedData.P5 === "1" ? "block" : "none";

  // Mostrar/ocultar las pestañas según el estado de P1 y P2
  let p1Tab = document.getElementById("p1-tab");
  let p2Tab = document.getElementById("p2-tab");
  let p3Tab = document.getElementById("p3-tab");
  let p4Tab = document.getElementById("p4-tab");
  let p5Tab = document.getElementById("p5-tab");

  if (selectedData.P1 === "1") {
    p1Tab.style.display = "block";
  } else {
    p1Tab.style.display = "none";
  }

  if (selectedData.P2 === "1") {
    p2Tab.style.display = "block";
  } else {
    p2Tab.style.display = "none";
  }

  if (selectedData.P3 === "1") {
    p3Tab.style.display = "block";
  } else {
    p3Tab.style.display = "none";
  }

  if (selectedData.P4 === "1") {
    p4Tab.style.display = "block";
  } else {
    p4Tab.style.display = "none";
  }

  if (selectedData.P5 === "1") {
    p5Tab.style.display = "block";
  } else {
    p5Tab.style.display = "none";
  }
}
