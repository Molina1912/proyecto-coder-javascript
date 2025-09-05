document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");

  if (!loginForm) return;

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    if (!email || !password) {
      Swal.fire("⚠️ Campos incompletos", "Ingresa tu correo y contraseña.", "warning");
      return;
    }

    let apoderados = JSON.parse(localStorage.getItem("apoderados")) || [];
    const usuario = apoderados.find(ap => ap.email === email);

    if (!usuario) {
      Swal.fire("❌ Error", "No existe un usuario con este correo.", "error");
      return;
    }

    if (usuario.password !== password) {
      Swal.fire("❌ Error", "Contraseña incorrecta.", "error");
      return;
    }

    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

    Swal.fire({
      title: "🎉 Bienvenido/a",
      text: `${usuario.nombre} ${usuario.apellido}`,
      icon: "success",
      confirmButtonText: "Continuar"
    }).then(() => {
      window.location.href ="pages/pagina_bienvenida.html";
    });
  });
});
