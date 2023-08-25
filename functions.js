// functions.js

// Función para mostrar los datos correspondientes al cambio en el select
function mostrarDatos() {
  const selectElement = document.getElementById("miSelect");
  const selectedId = selectElement.value;

  // Busca el elemento en los datos del JSON
  const selectedData = data.find((item) => item.id === selectedId);

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

  // Mostrar/ocultar las pestañas según el estado de P1 y P2
  let p1Tab = document.getElementById("p1-tab");
  let p2Tab = document.getElementById("p2-tab");

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
}
