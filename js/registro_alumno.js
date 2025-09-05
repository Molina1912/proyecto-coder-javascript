let editarModal = new bootstrap.Modal(document.getElementById('editarModal'));

document.addEventListener('DOMContentLoaded', function() {
  try {
    let alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];

    function mostrarAlumnos() {
      const lista = document.getElementById('lista-alumnos');
      if (!lista) return;
      lista.innerHTML = '';
      alumnos.forEach((alumno, index) => {
        const item = document.createElement('li');
        item.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
        item.innerHTML = `
          <div>
            <strong>Nombre:</strong> ${alumno.nombre} <br>
            <strong>Curso:</strong> ${alumno.curso} <br>
            <strong>Dirección:</strong> ${alumno.direccion} <br>
            <strong>Correo:</strong> ${alumno.correo} <br>
            <strong>Padre:</strong> ${alumno.padre} <br>
            <strong>Madre:</strong> ${alumno.madre} <br>
            <strong>Apoderado:</strong> ${alumno.apoderado}
          </div>
          <div>
            <button class="btn btn-warning btn-sm editar me-2" data-index="${index}">Editar</button>
            <button class="btn btn-danger btn-sm eliminar" data-index="${index}">Eliminar</button>
          </div>
        `;
        lista.appendChild(item);
      });
    }

    function eliminarAlumno(index) {
      alumnos.splice(index, 1);
      localStorage.setItem('alumnos', JSON.stringify(alumnos));
      mostrarAlumnos();
    }

    // Clicks de editar y eliminar
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('eliminar')) {
        const index = e.target.dataset.index;
        eliminarAlumno(index);
        Swal.fire("Eliminado", "Alumno eliminado con éxito", "success");
      }

      if (e.target.classList.contains('editar')) {
        const index = e.target.dataset.index;
        const alumno = alumnos[index];

        // Rellenar el modal con los datos existentes
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
