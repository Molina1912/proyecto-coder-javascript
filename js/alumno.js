    document.getElementById('form-alumno').addEventListener('submit', function(e) {
        e.preventDefault();

        // Obtener valores del formulario
        const nombre = document.getElementById('nombre').value;
        const direccion = document.getElementById('direccion').value;
        const padre = document.getElementById('padre').value;
        const madre = document.getElementById('madre').value;
        const apoderado = document.getElementById('apoderado').value;

        // Crear objeto alumno
        const alumno = { nombre, direccion, padre, madre, apoderado };

        // Guardar en localStorage
        let alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];
        alumnos.push(alumno);
        localStorage.setItem('alumnos', JSON.stringify(alumnos));

        // Mostrar SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Guardado',
          text: 'La información del alumno ha sido guardada con éxito',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          // Opcional: redirigir al siguiente paso
          window.location.href = '../pages/registro_ficha_salud_alumno.html';
        });
      });