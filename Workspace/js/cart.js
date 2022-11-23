var myModal = document.getElementById('myModal')
var myInput = document.getElementById('myInput')
let purchaseForm = document.getElementById("purchase-form")

// myModal.addEventListener('shown.bs.modal', function () {
//     myInput.focus()
//   })
// Si lo descomento no se me carga el carrito pero no se qué hace...

let cilentCart = []
let articles = []
let cartBody = document.getElementById("cartBody")

let subtotalFinal = document.getElementById("subtotal-final")
let subtotalFinalValue = 0
let costoEnvio = document.getElementById("costo-envio")
let total = document.getElementById("total")

let envios = document.getElementsByName("tipo-de-envio")

let calle = document.getElementById("calle")
let numero = document.getElementById("numero")
let esquina = document.getElementById("esquina")

let tiposDePago = document.getElementsByName("tipo-de-pago")
//bloquear los campos del no elegido
let creditFieldset = document.getElementById("credit-fieldset")
let numeroTarjeta = document.getElementById("numero-tarjeta")
let codigoSeguridad = document.getElementById("codigo-seguridad")
let vencimiento = document.getElementById("vencimiento")
let numeroCuenta = document.getElementById("numero-cuenta")
let pagoSeleccionado = document.getElementById("pago-seleccionado")




articles = JSON.parse(localStorage.getItem("articlesInCart"))
//pero los objetos no son iterables, entonces convierto en array
articles = Object.values(articles)

function showCart(){
    console.log(articles)
    let subtotalFinalToAppend = 0
    for (let article of articles)
    {   
        let cartTR = document.createElement("tr");
        cartTR.innerHTML = `
        <th scope="row">${article.count}</th>
        <td><img class="cartIMG" src="${article.image}"></td>
        <td>${article.name}</td>
        <td>${article.currency + " " +article.unitCost}</td>
        <td> <input type="number" value="${article.count}" minlength= 1 required > </td>
        <td class="subtotal">${article.currency + " " + article.unitCost*article.count}</td>
        `
        cartBody.appendChild(cartTR)

        subtotalFinalToAppend += article.unitCost*article.count
        subtotalFinalValue += subtotalFinalToAppend
        subtotalFinal.innerHTML= article.currency + " " + subtotalFinalValue
        
        let input = cartTR.querySelector("input")
        input.addEventListener("input",()=>{

            article.count = input.value
            localStorage.setItem("articlesInCart", JSON.stringify(articles))
            
            let subtotal = input.value* article.unitCost
            cartTR.querySelector(".subtotal").innerHTML= `${article.currency} ${subtotal}`

            // subtotalFinal.innerHTML= article.currency + " " + subtotalFinalValue


            // subtotalFinal.innerHTML= ``
            // // Creo que esto da el problema de que al cambiar un segundo input se caga el subt final
            // subtotalFinalToAppend = 0
            // for (article of articles){
            //     subtotalFinalToAppend += article.unitCost*article.count
            //     subtotalFinal.innerHTML= article.currency + " " + subtotalFinalToAppend
            // }
        })
    }

}


function radioSeleccionado (radios){
    let radioSeleccionado = ""
    for(let radio of radios){
        if(radio.checked){
            radioSeleccionado = radio
            console.log(`el radio elegido es ${radio.id}`)
        }
    }
    return radioSeleccionado
}

//generaliza las dos anteriores o la eleccion de un radio entre varios
//para tipo de envio radios = envios, para tipo de pago radios = tiposDePago

function calculateCostoDeEnvio(){
    let envioSeleccionado = Number(radioSeleccionado(envios).value)
    costoEnvio.innerHTML = `USD ${envioSeleccionado*subtotalFinalValue}`
    total.innerHTML = `USD ${envioSeleccionado*subtotalFinalValue + subtotalFinalValue}`
}

// Hay que corregirlo para no tener que llamar a la función cada vez sino que el radio se guarde en una variable

function paymentMethodSelected(){
    let paymentMethodSelected = radioSeleccionado(tiposDePago)
    if (paymentMethodSelected.value == "transf"){
        creditFieldset.setAttribute("disabled", "")
        numeroCuenta.removeAttribute("disabled", "")

    }else{
        numeroCuenta.setAttribute("disabled", "")
        creditFieldset.removeAttribute("disabled", "")
    }
}


function savePaymentOption(){
    console.log("save clicked")
    let paymentMethodSelected = radioSeleccionado(tiposDePago)

    if (paymentMethodSelected.value == "credit"){
        pagoSeleccionado.innerHTML = `Tarjeta de Crédito`
    }else{
        pagoSeleccionado.innerHTML = `Transferencia Bancaria`
    }
}

// Al presionarlo deberán ejecutarse las siguientes validaciones (dando el feedback correspondiente al usuario):

// Los campos calle, número y esquina, no podrán estar vacíos.

// Deberá estar seleccionada la forma de envío.

// La cantidad para cada artículo deberá estar definida y ser mayor a 0

// Deberá haberse seleccionado una forma de pago

// Los campos, para la forma de pago seleccionada, no podrán estar vacíos

function submitPurchase(){
    console.log("se finalizará la compra")
    console.log("calle numero esquina y tipo de pago seleccionado")
    compraExitosa()
};

function compraExitosa (){
    if (purchaseForm.checkValidity){
        showAlertSuccess()
        localStorage.removeItem("cartNumbers")
        localStorage.removeItem("articlesInCart")
        localStorage.removeItem("totalCost")
    }
};





document.addEventListener("DOMContentLoaded", function(){

    showCart()


});

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()