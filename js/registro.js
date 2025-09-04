document.addEventListener("DOMContentLoaded", () => {
  const registroForm = document.getElementById("registro-form");

  registroForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const repeatPassword = document.getElementById("repeatPassword").value;
    const condiciones = document.getElementById("condiciones").checked;

    if (!nombre || !apellido || !email || !password || !repeatPassword) {
      alert("⚠️ Por favor completa todos los campos.");
      return;
    }
    if (password !== repeatPassword) {
      alert("❌ Las contraseñas no coinciden.");
      return;
    }
    if (!condiciones) {
      alert("⚠️ Debes aceptar los términos y condiciones.");
      return;
    }
    let apoderados = JSON.parse(localStorage.getItem("apoderados")) || [];
    if (apoderados.some(ap => ap.email === email)) {
      alert("❌ Este correo ya está registrado.");
      return;
    }
    apoderados.push({ nombre, apellido, email, password });
    localStorage.setItem("apoderados", JSON.stringify(apoderados));
    alert(`✅ Registro exitoso. Bienvenido/a, ${nombre} ${apellido}!`);
    window.location.href = "../index.html";
  });
});
