function loginCheck() {
  if ((mailEnLocalStorage = null)) {
    window.location = "login.html";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  loginCheck();
  //función que checkea si hay un usuario loggeado y de lo contrario redirecciona al login

  document.getElementById("autos").addEventListener("click", function () {
    localStorage.setItem("catID", 101);
    window.location = "products.html";
  });
  document.getElementById("juguetes").addEventListener("click", function () {
    localStorage.setItem("catID", 102);
    window.location = "products.html";
  });
  document.getElementById("muebles").addEventListener("click", function () {
    localStorage.setItem("catID", 103);
    window.location = "products.html";
  });
});
