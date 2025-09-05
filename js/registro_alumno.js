let editarModal = new bootstrap.Modal(document.getElementById('editarModal'));

document.addEventListener('DOMContentLoaded', function() {
  try {
    // Obtener alumnos existentes
    let alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];

    const tabla = document.getElementById('tabla-alumnos').getElementsByTagName('tbody')[0];

    // Función para mostrar alumnos en la tabla
    function mostrarAlumnos() {
      tabla.innerHTML = '';

      alumnos.forEach((alumno, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
          <td>${alumno.nombre}</td>
          <td>${alumno.direccion}</td>
          <td>${alumno.padre}</td>
          <td>${alumno.madre}</td>
          <td>${alumno.apoderado}</td>
          <td>
            <button class="btn btn-warning btn-sm editar me-2" data-index="${index}">Editar</button>
            <button class="btn btn-danger btn-sm eliminar" data-index="${index}">Eliminar</button>
          </td>
        `;
        tabla.appendChild(fila);
      });
    }

    // Función para eliminar alumno
    function eliminarAlumno(index) {
      alumnos.splice(index, 1);
      localStorage.setItem('alumnos', JSON.stringify(alumnos));
      mostrarAlumnos();
      Swal.fire("Eliminado", "Alumno eliminado con éxito", "success");
    }

    // Clicks de editar y eliminar
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('eliminar')) {
        const index = e.target.dataset.index;
        eliminarAlumno(index);
      }

      if (e.target.classList.contains('editar')) {
        const index = e.target.dataset.index;
        const alumno = alumnos[index];

        // Rellenar el modal con los datos del alumno
        document.getElementById('index-alumno').value = index;
        document.getElementById('editar-nombre').value = alumno.nombre;
        document.getElementById('editar-direccion').value = alumno.direccion;
        document.getElementById('editar-padre').value = alumno.padre;
        document.getElementById('editar-madre').value = alumno.madre;
        document.getElementById('editar-apoderado').value = alumno.apoderado;

        // Si existe ficha de salud, mostrarla en los inputs del modal
        if (alumno.ficha_salud) {
          const ficha = alumno.ficha_salud;
          // Configura tus inputs adicionales para la ficha de salud si los agregas al modal
          // Ejemplo:
          // document.querySelector('input[name="enfermedad"][value="'+ficha.enfermedad+'"]').checked = true;
          // document.querySelector('input[name="tratamiento"][value="'+ficha.tratamiento+'"]').checked = true;
        }

        editarModal.show();
      }
    });

    // Guardar cambios desde el modal
    const formEditar = document.getElementById('form-editar');
    formEditar.addEventListener('submit', function(e) {
      e.preventDefault();
      const index = document.getElementById('index-alumno').value;
      alumnos[index] = {
        ...alumnos[index], // mantener ficha de salud si existe
        nombre: document.getElementById('editar-nombre').value,
        direccion: document.getElementById('editar-direccion').value,
        padre: document.getElementById('editar-padre').value,
        madre: document.getElementById('editar-madre').value,
        apoderado: document.getElementById('editar-apoderado').value
      };
      localStorage.setItem('alumnos', JSON.stringify(alumnos));
      mostrarAlumnos();
      editarModal.hide();
      Swal.fire("Actualizado", "Datos del alumno actualizados con éxito", "success");
    });

    mostrarAlumnos();

  } catch (error) {
    console.error(error);
  }
});

// --- Código para registrar la ficha de salud ---
if(document.getElementById('guardar-btn')) {
  document.getElementById('guardar-btn').addEventListener('click', function() {
    const ficha = {
      enfermedad: document.querySelector('input[name="enfermedad"]:checked')?.value || '',
      tratamiento: document.querySelector('input[name="tratamiento"]:checked')?.value || '',
      operaciones: document.querySelector('input[name="operaciones"]:checked')?.value || '',
      fisico: document.querySelector('input[name="fisico"]:checked')?.value || ''
    };

    let alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];

    if (alumnos.length === 0) {
      Swal.fire('Error', 'No se encontró un alumno para asignar la ficha de salud', 'error');
      return;
    }

    alumnos[alumnos.length - 1].ficha_salud = ficha;

    localStorage.setItem('alumnos', JSON.stringify(alumnos));

    Swal.fire({
      icon: 'success',
      title: 'Información guardada',
      text: 'La ficha de salud se ha guardado correctamente.',
      confirmButtonText: 'Aceptar'
    });
  });
}
