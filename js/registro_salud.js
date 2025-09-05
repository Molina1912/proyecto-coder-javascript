document.getElementById('guardar-btn').addEventListener('click', function() {
  // Recopilar datos (opcional, para guardar en localStorage)
  const ficha = {
    enfermedad: document.querySelector('input[name="enfermedad"]:checked')?.value || '',
    tratamiento: document.querySelector('input[name="tratamiento"]:checked')?.value || '',
    operaciones: document.querySelector('input[name="operaciones"]:checked')?.value || '',
    fisico: document.querySelector('input[name="fisico"]:checked')?.value || ''
  };
  localStorage.setItem('ficha_salud', JSON.stringify(ficha));

  // Mostrar alerta
  Swal.fire({
    icon: 'success',
    title: 'Información guardada',
    text: 'Su información ha sido guardada correctamente.',
    confirmButtonText: 'Aceptar'
  });
});