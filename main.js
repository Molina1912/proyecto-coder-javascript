//let edad1 = 20
//let edad2 = "30"
//console.log(edad1)
//console.log(edad2)
//console.log(true)
//console.log("true")
//console.log(typeof true)
//edad2 = Number(edad2) * 2
//console.log(edad2)
//alert("Bienvenido a Nuestro Sitio WEB")
//let confirmacion_edad = confirm("Ingrese su Edad")
//console.log(confirmacion_edad)
//let captura_edad 
//const edad = parseInt(prompt("Ingrese su edad"))

//if (edad >= 18 && edad < 60) {
  //alert("Puedes entrar 🚀");
//} else if (edad >= 60) {
  //alert("Eres mayor, ¡ten cuidado! 😅");
//} else {
  //alert("Lo siento, eres menor de edad ❌");
//}

//console.log(edad)

// Espera a que cargue el documento
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
