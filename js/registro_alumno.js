let editarModal = new bootstrap.Modal(document.getElementById('editarModal'));

document.addEventListener('DOMContentLoaded', function() {
  try {
    let alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];

    // Función para mostrar todos los alumnos en la tabla
    function mostrarAlumnos() {
      const tabla = document.getElementById('tabla-alumnos').querySelector('tbody');
      if (!tabla) return;
      tabla.innerHTML = '';

      alumnos.forEach((alumno, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
          <td>${alumno.nombre}</td>
          <td>${alumno.curso}</td>
          <td>${alumno.direccion}</td>
          <td>${alumno.correo}</td>
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
    }

    // Manejar clicks de editar y eliminar
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('eliminar')) {
        const index = e.target.dataset.index;
        eliminarAlumno(index);
        Swal.fire("Eliminado", "Alumno eliminado con éxito", "success");
      }

      if (e.target.classList.contains('editar')) {
        const index = e.target.dataset.index;
        const alumno = alumnos[index];

        // Rellenar modal con los datos existentes
        document.getElementById('index-alumno').value = index;
        document.getElementById('editar-nombre').value = alumno.nombre;
        document.getElementById('editar-curso').value = alumno.curso;
        document.getElementById('editar-direccion').value = alumno.direccion;
        document.getElementById('editar-correo').value = alumno.correo;
        document.getElementById('editar-padre').value = alumno.padre;
        document.getElementById('editar-madre').value = alumno.madre;
        document.getElementById('editar-apoderado').value = alumno.apoderado;

        editarModal.show();
      }
    });

    // Guardar cambios desde el modal
    const formEditar = document.getElementById('form-editar');
    formEditar.addEventListener('submit', function(e) {
      e.preventDefault();
      const index = document.getElementById('index-alumno').value;
      alumnos[index] = {
        nombre: document.getElementById('editar-nombre').value,
        curso: document.getElementById('editar-curso').value,
        direccion: document.getElementById('editar-direccion').value,
        correo: document.getElementById('editar-correo').value,
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
