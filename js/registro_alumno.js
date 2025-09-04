document.addEventListener('DOMContentLoaded', function() {
  try {
    let alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];

    function mostrarAlumnos() {
      const lista = document.getElementById('lista-alumnos');
      if (!lista) return;
      lista.innerHTML = '';
      alumnos.forEach((alumno, index) => {
        const item = document.createElement('li');
        item.classList.add("list-group-item");
        item.innerHTML = `
          ${alumno.nombre} - ${alumno.curso}
          <button class="btn btn-danger btn-sm float-end eliminar" data-index="${index}">Eliminar</button>
        `;
        lista.appendChild(item);
      });
    }

    function agregarAlumno(alumno) {
      alumnos.push(alumno);
      localStorage.setItem("alumnos", JSON.stringify(alumnos));
      mostrarAlumnos();
    }

    function eliminarAlumno(index) {
      alumnos.splice(index, 1);
      localStorage.setItem("alumnos", JSON.stringify(alumnos));
      mostrarAlumnos();
    }

    const form = document.getElementById('form-alumno');
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        const alumno = {
          nombre: document.getElementById('nombre').value,
          curso: document.getElementById('curso').value,
          direccion: document.getElementById('direccion').value,
          correo: document.getElementById('correo').value,
          padre: document.getElementById('padre').value,
          madre: document.getElementById('madre').value,
          apoderado: document.getElementById('apoderado').value
        };
        agregarAlumno(alumno);

        Swal.fire({
          icon: 'success',
          title: 'Alumno registrado',
          text: `${alumno.nombre} agregado correctamente`,
          confirmButtonText: 'Continuar'
        }).then(() => {
          window.location.href = "datos-medicos.html"; // pasa a la siguiente etapa
        });
      });
    }

    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('eliminar')) {
        const index = e.target.dataset.index;
        eliminarAlumno(index);
        Swal.fire("Eliminado", "Alumno eliminado con éxito", "success");
      }
    });

    mostrarAlumnos();
  } 
  catch (error) {
    console.error(error);
  }
});
