document.addEventListener("DOMContentLoaded", () => {
  const registroForm = document.getElementById("registro-form");
  if (!registroForm) return;

  registroForm.addEventListener("submit", async function(e) {
    e.preventDefault();

    try {
      const el = id => document.getElementById(id);
      const nombre = (el("nombre")?.value || "").trim();
      const apellido = (el("apellido")?.value || "").trim();
      const email = (el("email")?.value || "").trim().toLowerCase();
      const password = (el("password")?.value || "");
      const repeatPassword = el("repeatPassword") ? el("repeatPassword").value : null;
      const condiciones = el("condiciones") ? el("condiciones").checked : true; 


      if (!nombre || !email || !password) {
        if (typeof Swal !== "undefined") {
          Swal.fire("Campos incompletos", "Por favor completa nombre, correo y contraseña.", "warning");
        } else {
          alert("Por favor completa nombre, correo y contraseña.");
        }
        return;
      }

      if (repeatPassword !== null && password !== repeatPassword) {
        if (typeof Swal !== "undefined") {
          Swal.fire("Error", "Las contraseñas no coinciden.", "error");
        } else {
          alert("Las contraseñas no coinciden.");
        }
        return;
      }

      if (el("condiciones") && !condiciones) {
        if (typeof Swal !== "undefined") {
          Swal.fire("Importante", "Debes aceptar los términos y condiciones.", "info");
        } else {
          alert("Debes aceptar los términos y condiciones.");
        }
        return;
      }

      
      const apoderados = JSON.parse(localStorage.getItem("apoderados")) || [];

      if (apoderados.some(a => a.email === email)) {
        if (typeof Swal !== "undefined") {
          Swal.fire("Error", "Este correo ya está registrado.", "error");
        } else {
          alert("Este correo ya está registrado.");
        }
        return;
      }

      apoderados.push({ nombre, apellido, email, password });
      localStorage.setItem("apoderados", JSON.stringify(apoderados));

      if (typeof Swal !== "undefined") {
        await Swal.fire({
          title: "Registro exitoso",
          text: `Bienvenido/a, ${nombre} ${apellido || ""}`.trim(),
          icon: "success",
          confirmButtonText: "Ir al login"
        });
      } else {
        alert(`Registro exitoso. Bienvenido/a, ${nombre} ${apellido || ""}`);
      }

      window.location.href = "../index.html";
    } catch (err) {
      console.error("registro.js error:", err);
      if (typeof Swal !== "undefined") {
        Swal.fire("Error", "Ocurrió un error. Revisa la consola.", "error");
      } else {
        alert("Ocurrió un error. Revisa la consola.");
      }
    }
  });
});
