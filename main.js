document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Evita que se envíe el formulario automáticamente

    // Capturamos valores
    const nombre = form.querySelector('input[type="text"]').value.trim();
    console.log(nombre)
    const apellido = form.querySelectorAll('input[type="text"]')[1]?.value.trim();
    const email = form.querySelector('input[type="email"]').value.trim();
    const password = form.querySelectorAll('input[type="password"]')[0].value;
    const repeatPassword = form.querySelectorAll('input[type="password"]')[1].value;
    const condiciones = form.querySelector("#condiciones").checked;

    // Validaciones
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

    // Si todo está correcto
    alert(`✅ Registro exitoso. Bienvenido/a, ${nombre} ${apellido}!`);

    form.reset(); // Limpia el formulario
  });
});
