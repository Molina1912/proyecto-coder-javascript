function toggleSelect(campo, mostrar) {
  const divSelect = document.getElementById(`select-${campo}`);
  if (divSelect) {
    divSelect.style.display = mostrar ? 'block' : 'none';
    if (!mostrar) {
      
      const select = divSelect.querySelector('select');
      const otra = divSelect.querySelector('input');
      if (select) select.value = '';
      if (otra) {
        otra.value = '';
        otra.style.display = 'none';
      }
    }
  }
}


function toggleOtra(campo) {
  const divSelect = document.getElementById(`select-${campo}`);
  if (!divSelect) return;

  const select = divSelect.querySelector('select');
  const otra = divSelect.querySelector('input');
  if (select && otra) {
    otra.style.display = select.value === 'otra' ? 'block' : 'none';
  }
}


document.getElementById('guardar-btn').addEventListener('click', function() {
  const ficha = {
    enfermedad: getRespuesta("enfermedad"),
    tratamiento: getRespuesta("tratamiento"),
    operaciones: getRespuesta("operaciones"),
    fisico: getRespuesta("fisico")
  };

  localStorage.setItem('ficha_salud', JSON.stringify(ficha));

  Swal.fire({
    icon: 'success',
    title: 'Información guardada',
    text: 'La ficha de salud ha sido registrada correctamente.',
    confirmButtonText: 'Continuar'
  }).then(() => {
    window.location.href = '../pages/pagina_resumen.html';
  });
});

function getRespuesta(campo) {
  const seleccion = document.querySelector(`input[name="${campo}"]:checked`);
  if (!seleccion) return "";

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
