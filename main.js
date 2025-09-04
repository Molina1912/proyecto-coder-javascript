document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");

  if (!loginForm) return;

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    if (!email || !password) {
      alert("⚠️ Ingresa tu correo y contraseña.");
      return;
    }

    let apoderados = JSON.parse(localStorage.getItem("apoderados")) || [];
    const usuario = apoderados.find(ap => ap.email === email);

    if (!usuario) {
      alert("❌ No existe un usuario con este correo.");
      return;
    }

    if (usuario.password !== password) {
      alert("❌ Contraseña incorrecta.");
      return;
    }

    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
    alert(`🎉 Bienvenido/a nuevamente, ${usuario.nombre} ${usuario.apellido}`);
    window.location.href = "pages/bienvenida.html";
  });
});
