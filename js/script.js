// Validación del formulario de contacto (JavaScript puro, sin alert())
document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("formContacto");
  if (!form) return;

  var reglas = {
    nombre: function (v) { return v.trim().length >= 3 ? "" : "El nombre debe tener al menos 3 caracteres."; },
    email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Escribe un correo válido, por ejemplo nombre@correo.com."; },
    motivo: function (v) { return v !== "" ? "" : "Selecciona un motivo."; },
    mensaje: function (v) { return v.trim().length >= 20 ? "" : "El mensaje debe tener al menos 20 caracteres."; },
    acepto: function (_, el) { return el.checked ? "" : "Debes aceptar el tratamiento de datos."; }
  };

  function validar(id) {
    var campo = document.getElementById(id);
    var salida = document.getElementById("e-" + id);
    var error = reglas[id](campo.value, campo);
    salida.textContent = error || "Campo correcto.";
    salida.className = "msg " + (error ? "error" : "ok");
    campo.classList.toggle("is-invalid", !!error);
    campo.classList.toggle("is-valid", !error);
    campo.setAttribute("aria-invalid", error ? "true" : "false");
    return !error;
  }

  Object.keys(reglas).forEach(function (id) {
    var campo = document.getElementById(id);
    campo.addEventListener("input", function () { validar(id); });
    campo.addEventListener("change", function () { validar(id); });
    campo.addEventListener("blur", function () { validar(id); });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var todoOk = Object.keys(reglas).map(validar).every(Boolean);
    var res = document.getElementById("resultado");
    if (todoOk) {
      res.className = "mt-3 alert alert-success";
      res.textContent = "¡Gracias! Tu mensaje fue enviado correctamente.";
      form.reset();
      Object.keys(reglas).forEach(function (id) {
        var c = document.getElementById(id);
        c.classList.remove("is-valid");
        document.getElementById("e-" + id).textContent = "";
      });
    } else {
      res.className = "mt-3 alert alert-danger";
      res.textContent = "Revisa los campos marcados en rojo e inténtalo de nuevo.";
    }
  });
});