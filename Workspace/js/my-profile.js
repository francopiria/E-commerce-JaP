console.log("buenos dias");

if (!localStorage.getItem("emailUsuario")){
    window.location.href = "login.html"
}


let dzoptions = {
    url:"/",
    autoQueue: false
};
let myDropzone = new Dropzone("div#file-upload", dzoptions); 



let primerNombre = document.getElementById("primer-nombre");
let segundoNombre = document.getElementById("segundo-nombre");
let primerApellido = document.getElementById("primer-apellido");
let segundoApellido = document.getElementById("segundo-apellido");
let email = document.getElementById("email");
let telefono = document.getElementById("telefono");
let previewImage = document.getElementById("preview")

let archivo = document.getElementById("archivo");

archivo.addEventListener("change", procesarArchivo)

function procesarArchivo(input){
    let imagen = input.target.files[0];
    let lector = new FileReader();
    lector.addEventListener("load", mostrarImagen)
    lector.readAsDataURL(imagen)
}

function mostrarImagen(event){
    let imagenSource = event.target.result;
    previewImage = document.getElementById("preview");
    previewImage.src = imagenSource;

    console.log(previewImage)
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

if(localStorage.getItem("datosUsuarioLS")){
    let datosUsuario = JSON.parse(localStorage.getItem("datosUsuarioLS"))
    primerNombre.value = datosUsuario.primerNombre
    segundoNombre.value = datosUsuario.segundoNombre
    primerApellido.value = datosUsuario.primerApellido
    segundoApellido.value = datosUsuario.segundoApellido
    email.value = datosUsuario.email
    telefono.value = datosUsuario.telefono
    previewImage = datosUsuario.imagen

} else {
    let datosUsuario = {
        primerNombre: primerNombre.value,
        segundoNombre: segundoNombre.value,
        primerApellido: primerApellido.value,
        segundoApellido: segundoApellido.value,
        email: email.value,
        telefono: telefono.value,
    }
    }

let profileForm = document.getElementById("profile-form");

profileForm.addEventListener("submit", function(e){

    e.preventDefault();

    let infoMissing = false;

    primerNombre.classList.remove('is-invalid');
    primerApellido.classList.remove('is-invalid');
    email.classList.remove('is-invalid');

    if (primerNombre.value ===""){
        primerNombre.classList.add('is-invalid');
        infoMissing = true;
    }

    if (primerApellido.value ===""){
        primerApellido.classList.add('is-invalid');
        infoMissing = true;
    }

    if (email.value ===""){
        email.classList.add('is-invalid');
        infoMissing = true;
    }

    if (!infoMissing){
        datosUsuario = {
            primerNombre: primerNombre.value,
            segundoNombre: segundoNombre.value,
            primerApellido: primerApellido.value,
            segundoApellido: segundoApellido.value,
            email: email.value,
            telefono: telefono.value,
            imagen: previewImage
        }
        console.log(datosUsuario)

        localStorage.setItem("datosUsuarioLS", JSON.stringify(datosUsuario))
    }
})
