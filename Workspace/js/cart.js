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
let subtotalFinalValue

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


function createCartTable(){
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

        subtotalFinalValue += article.unitCost*article.count
    }
}

function showCart(){
    console.log(articles)
    subtotalFinalValue = 0
    for (let article of articles)
    {   
        let cartTR = document.createElement("tr");
        cartTR.innerHTML = `
        <th scope="row">${articles.indexOf(article) + 1}</th>
        <td><img class="cartIMG" src="${article.image}"></td>
        <td>${article.name}</td>
        <td>${article.currency + " " +article.unitCost}</td>
        <td> <input type="number" value="${article.count}" min=1 required > </td>
        <td class="subtotal">${article.currency + " " + article.unitCost*article.count}</td>
        `
        cartBody.appendChild(cartTR)

        subtotalFinalValue += article.unitCost*article.count
       
        
        let input = cartTR.querySelector("input")
        input.addEventListener("input",()=>{

            article.count = input.value
            localStorage.setItem("articlesInCart", JSON.stringify(articles))
            console.log(articles)
            
            // let subtotal = Math.round((article.count* article.unitCost)*100)/100
            let subtotal = (article.count* article.unitCost).toFixed(2)

            cartTR.querySelector(".subtotal").innerHTML= `${article.currency} ${subtotal}`

            subtotalFinalValue = 0
            for (articlee of articles){
                subtotalFinalValue+= articlee.unitCost*articlee.count
            }
            subtotalFinal.innerHTML= "USD " + subtotalFinalValue.toFixed(2)

            calculateCostoDeEnvio()

        })
    }
    subtotalFinal.innerHTML= "USD " + Math.round(subtotalFinalValue*100)/100
    console.log(articles)
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
    costoEnvio.innerHTML = `USD ${Math.round((envioSeleccionado*subtotalFinalValue)*100)/100}`
    total.innerHTML = `USD ${Math.round((envioSeleccionado*subtotalFinalValue + subtotalFinalValue)*100)/100}`
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
    let mensajeMissing = document.getElementById("payment-method-message-missing")
    let mensajeElegiste = document.getElementById("payment-method-message-ok")

    if (paymentMethodSelected.value == "credit"){
        pagoSeleccionado.innerHTML = `Tarjeta de Crédito`
        mensajeElegiste.classList.remove("d-none")
        mensajeMissing.classList.remove("d-inline")
        mensajeMissing.classList.add("d-none")

    } else if(paymentMethodSelected.value == "transf"){
        pagoSeleccionado.innerHTML = `Transferencia Bancaria`
        mensajeElegiste.classList.remove("d-none")
        mensajeMissing.classList.remove("d-inline")
        mensajeMissing.classList.add("d-none")

    } else{
        mensajeMissing.classList.remove("d-none")
        mensajeMissing.classList.add("d-inline")
    }


        
 
}


function submitPurchase(){
    console.log("se finalizará la compra")

    if(!radioSeleccionado(tiposDePago)){
        console.log("no seleccionaste método de pago")
        let mensajeMissing = document.getElementById("payment-method-message-missing")
        console.log(mensajeMissing)
        mensajeMissing.classList.remove("d-none")
        mensajeMissing.classList.add("d-inline")
    }

    compraExitosa()

};

function compraExitosa (){

    if (purchaseForm.checkValidity()){ 
        localStorage.removeItem("cartNumbers")
        localStorage.removeItem("articlesInCart")
        localStorage.removeItem("totalCost")
        showAlertSuccess()
        window.location.href = "index.html"
        // document.window.location.href = "index.html"
    }
};


document.addEventListener("DOMContentLoaded", function(){

    showCart()
    calculateCostoDeEnvio()


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