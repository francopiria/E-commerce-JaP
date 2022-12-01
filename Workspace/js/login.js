let email = document.getElementById("email");
let pass = document.getElementById("password");
let button = document.getElementById("logBtn");
button.addEventListener("click", check);

localStorage.clear();

function check() {
  if (email.value.length > 0 && password.value.length > 0) {
    showAlertSuccess();
  } else {
    showAlertError();
  }
}

function showAlertSuccess() {
  document.getElementById("alert-success").classList.add("show");
  window.location.href = "index.html";
  localStorage.setItem("emailUsuario", email.value);
}

function showAlertError() {
  document.getElementById("alert-danger").classList.add("show");
}
