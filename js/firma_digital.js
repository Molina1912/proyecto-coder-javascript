// firma_digital.js
document.addEventListener("DOMContentLoaded", () => {
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo")); // apoderado logueado

  document.addEventListener("click", function (e) {
    if (!e.target.classList.contains("firma")) return;

    // Re-lee alumnos para estar seguro de tener los últimos cambios
    const alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];
    const index = parseInt(e.target.dataset.index, 10);
    const alumno = alumnos[index];

    if (!alumno) {
      Swal.fire("Error", "No se encontró el alumno seleccionado.", "error");
      return;
    }

    // Fecha y hora actual (formato legible)
    const fechaHora = new Date().toLocaleString("es-CL", {
      dateStyle: "short",
      timeStyle: "medium"
    });

    // Obtener la ficha: primero preferimos la ficha asociada al alumno,
    // si no existe, usamos la ficha global guardada (compatibilidad)
    const fichaGlobal = JSON.parse(localStorage.getItem('ficha_salud')) || null;
    const ficha = alumno.ficha_salud || fichaGlobal || {
      enfermedad: "No especificado",
      tratamiento: "No especificado",
      operaciones: "No especificado",
      fisico: "No especificado"
    };

    // Construir objeto de firma incluyendo la ficha
    const firma = {
      alumno: {
        nombre: alumno.nombre,
        direccion: alumno.direccion,
        padre: alumno.padre,
        madre: alumno.madre,
        apoderado: alumno.apoderado
      },
      ficha,
      apoderado: {
        nombre: usuarioActivo?.nombre || "N/A",
        apellido: usuarioActivo?.apellido || "N/A",
        email: usuarioActivo?.email || "No registrado"
      },
      fechaHora
    };

    // Guardar en historial de firmas
    const firmas = JSON.parse(localStorage.getItem("firmas")) || [];
    firmas.push(firma);
    localStorage.setItem("firmas", JSON.stringify(firmas));

    // Popup de confirmación
    Swal.fire({
      icon: "success",
      title: "✅ Documento firmado digitalmente",
      text: `El alumno ${alumno.nombre} ha sido firmado correctamente.`,
      confirmButtonText: "Aceptar"
    }).then(() => {
      // Detalle con ficha incluida
      const detalle = `
📌 Alumno:
- Nombre: ${firma.alumno.nombre}
- Dirección: ${firma.alumno.direccion}
- Padre: ${firma.alumno.padre}
- Madre: ${firma.alumno.madre}
- Apoderado: ${firma.alumno.apoderado}

🩺 Ficha de Salud:
- Enfermedad: ${firma.ficha.enfermedad || "No especificado"}
- Tratamiento: ${firma.ficha.tratamiento || "No especificado"}
- Operaciones: ${firma.ficha.operaciones || "No especificado"}
- Condición física: ${firma.ficha.fisico || "No especificado"}

👤 Apoderado:
- Nombre: ${firma.apoderado.nombre} ${firma.apoderado.apellido}
- Correo: ${firma.apoderado.email}

🕒 Fecha y Hora:
- ${firma.fechaHora}
      `;

      Swal.fire({
        icon: "info",
        title: "📄 Resumen de Firma",
        html: `<pre style="text-align:left;white-space:pre-wrap;">${detalle}</pre>`,
        showDenyButton: true,
        confirmButtonText: "✍️ Firmar otro alumno",
        denyButtonText: "🚪 Salir del sistema"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Puedes continuar firmando otros alumnos.", "", "info");
        } else if (result.isDenied) {
          // limpieza de sesión (mantener historial de firmas si quieres histórico)
          localStorage.removeItem("alumnos");
          localStorage.removeItem("ficha_salud");
          localStorage.removeItem("usuarioActivo");
          window.location.href = "../index.html";
        }
      });
    });
  });
});

