    function toggleSelect(campo, mostrar) {
      document.getElementById("select-" + campo).style.display = mostrar ? "block" : "none";
      document.getElementById("otra-" + campo).style.display = "none";
    }

    function toggleOtra(campo) {
      const select = document.querySelector("#select-" + campo + " select");
      const input = document.getElementById("otra-" + campo);
      input.style.display = (select.value === "otra") ? "block" : "none";
    }