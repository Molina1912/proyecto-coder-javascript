document.getElementById('guardar-btn').addEventListener('click', function() {
  // Construimos el objeto ficha
  const ficha = {
    enfermedad: getRespuesta("enfermedad"),
    tratamiento: getRespuesta("tratamiento"),
    operaciones: getRespuesta("operaciones"),
    fisico: getRespuesta("fisico")
  };

  // Guardamos en localStorage
  localStorage.setItem('ficha_salud', JSON.stringify(ficha));

  // SweetAlert + redirección
  Swal.fire({
    icon: 'success',
    title: 'Información guardada',
    text: 'La ficha de salud ha sido registrada correctamente.',
    confirmButtonText: 'Continuar'
  }).then(() => {
    window.location.href = '../pages/pagina_resumen.html';
  });
});

/**
 * Función auxiliar para obtener respuesta
 * Si responde "sí" y selecciona "otra", toma el texto ingresado
 */
function getRespuesta(campo) {
  const seleccion = document.querySelector(`input[name="${campo}"]:checked`);
  if (!seleccion) return ""; // No respondió

  if (seleccion.value === "si") {
    const select = document.querySelector(`#select-${campo} select`);
    const otra = document.getElementById(`otra-${campo}`);
    if (select && select.value === "otra" && otra) {
      return otra.value.trim() || "Otra (no especificada)";
    }
    return select?.value || "Sí";
  }

  return "No";
}
