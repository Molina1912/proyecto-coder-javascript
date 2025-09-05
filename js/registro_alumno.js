let editarModal = new bootstrap.Modal(document.getElementById('editarModal'));

document.addEventListener('DOMContentLoaded', function() {
  try {
    let alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];
    const tabla = document.getElementById('tabla-alumnos').getElementsByTagName('tbody')[0];

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
            <button class="btn btn-danger btn-sm eliminar me-2" data-index="${index}">Eliminar</button>
            <button class="btn btn-success btn-sm firma" data-index="${index}">FIRMA DIGITAL</button>
          </td>
        `;
        tabla.appendChild(fila);
      });
    }

    function eliminarAlumno(index) {
      alumnos.splice(index, 1);
      localStorage.setItem('alumnos', JSON.stringify(alumnos));
      mostrarAlumnos();
      Swal.fire("Eliminado", "Alumno eliminado con éxito", "success");
    }

    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('eliminar')) {
        const index = e.target.dataset.index;
        eliminarAlumno(index);
      }

      if (e.target.classList.contains('editar')) {
        const index = e.target.dataset.index;
        const alumno = alumnos[index];

        document.getElementById('index-alumno').value = index;
        document.getElementById('editar-nombre').value = alumno.nombre;
        document.getElementById('editar-direccion').value = alumno.direccion;
        document.getElementById('editar-padre').value = alumno.padre;
        document.getElementById('editar-madre').value = alumno.madre;
        document.getElementById('editar-apoderado').value = alumno.apoderado;

        editarModal.show();
      }

      if (e.target.classList.contains('firma')) {
        const index = e.target.dataset.index;
        const alumno = alumnos[index];

        Swal.fire({
          icon: "success",
          title: "Alumno firmado digitalmente",
          text: `El alumno ${alumno.nombre} ha sido firmado correctamente.`,
          confirmButtonText: "Aceptar"
        });
      }
    });

    const formEditar = document.getElementById('form-editar');
    formEditar.addEventListener('submit', function(e) {
      e.preventDefault();
      const index = document.getElementById('index-alumno').value;
      alumnos[index] = {
        ...alumnos[index],
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
