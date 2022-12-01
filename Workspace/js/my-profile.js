console.log("buenos dias");

if (!localStorage.getItem("emailUsuario")) {
  window.location.href = "login.html";
}

let dzoptions = {
  url: "/",
  autoQueue: false,
};
let myDropzone = new Dropzone("div#file-upload", dzoptions);

let firstName = document.getElementById("first-name");
let secondName = document.getElementById("second-name");
let surname = document.getElementById("surname");
let secondSurname = document.getElementById("second-surname");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let previewImage = document.getElementById("preview");

let file = document.getElementById("file");

file.addEventListener("change", procesarArchivo);

function procesarArchivo(input) {
  let imagen = input.target.files[0];
  let lector = new FileReader();
  lector.addEventListener("load", mostrarImagen);
  lector.readAsDataURL(imagen);
}

function mostrarImagen(event) {
  let imagenSource = event.target.result;
  previewImage = document.getElementById("preview");
  previewImage.src = imagenSource;

  console.log(previewImage);
}

// function getBase64Image(img) {
//     var canvas = document.createElement("canvas");
//     canvas.width = img.width;
//     canvas.height = img.height;

//     var ctx = canvas.getContext("2d");
//     ctx.drawImage(img, 0, 0);

//     var dataURL = canvas.toDataURL("image/png");

//     return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
// }

email.value = localStorage.getItem("emailUsuario");

if (localStorage.getItem("userDataLS")) {
  let userData = JSON.parse(localStorage.getItem("userDataLS"));
  firstName.value = userData.firstName;
  secondName.value = userData.secondName;
  surname.value = userData.surname;
  secondSurname.value = userData.secondSurname;
  email.value = userData.email;
  phone.value = userData.phone;
  previewImage = userData.imagen;
} else {
  let userData = {
    firstName: firstName.value,
    secondName: secondName.value,
    surname: surname.value,
    secondSurname: secondSurname.value,
    email: email.value,
    phone: phone.value,
  };
}

let profileForm = document.getElementById("profile-form");

profileForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let infoMissing = false;

  firstName.classList.remove("is-invalid");
  surname.classList.remove("is-invalid");
  email.classList.remove("is-invalid");

  if (firstName.value === "") {
    firstName.classList.add("is-invalid");
    infoMissing = true;
  }

  if (surname.value === "") {
    surname.classList.add("is-invalid");
    infoMissing = true;
  }

  if (email.value === "") {
    email.classList.add("is-invalid");
    infoMissing = true;
  }

  if (!infoMissing) {
    userData = {
      firstName: firstName.value,
      secondName: secondName.value,
      surname: surname.value,
      secondSurname: secondSurname.value,
      email: email.value,
      phone: phone.value,
      imagen: previewImage,
    };
    console.log(userData);

    localStorage.setItem("userDataLS", JSON.stringify(userData));
  }
});
