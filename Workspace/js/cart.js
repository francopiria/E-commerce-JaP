var myModal = document.getElementById("myModal");
var myInput = document.getElementById("myInput");
let purchaseForm = document.getElementById("purchase-form");

// myModal.addEventListener('shown.bs.modal', function () {
//     myInput.focus()
//   })
// Si lo descomento no se me carga el carrito pero no se qué hace...

let cilentCart = [];
let articles = [];
let cartBody = document.getElementById("cartBody");

let subtotalFinal = document.getElementById("subtotal-final");
let subtotalFinalValue;

let shippingCost = document.getElementById("shipping-cost");
let total = document.getElementById("total");

let shippingOptions = document.getElementsByName("shipping-option");

let street = document.getElementById("street");
let doorNumber = document.getElementById("door-number");
let square = document.getElementById("square");

let paymentOptions = document.getElementsByName("payment-option");
//bloquear los campos del no elegido
let creditFieldset = document.getElementById("credit-fieldset");
let cardNumber = document.getElementById("card-number");
let securityCode = document.getElementById("security-code");
let expiration = document.getElementById("expiration");
let accountNumber = document.getElementById("account-number");
let choosenPaymentOption = document.getElementById("choosen-payment-option");

articles = JSON.parse(localStorage.getItem("articlesInCart"));
//pero los objetos no son iterables, entonces convierto en array
articles = Object.values(articles);

function showCart() {
  console.log(articles);
  subtotalFinalValue = 0;
  for (let article of articles) {
    let cartTR = document.createElement("tr");
    cartTR.innerHTML = `
            <th scope="row"><button type="button" class="btn btn-danger btn-delete">X</button></th>
            <td><img class="cartIMG" src="${article.image}"></td>
            <td>${article.name}</td>
            <td>${article.currency + " " + article.unitCost}</td>
            <td> <input type="number" value="${
              article.count
            }" min=1 required > </td>
            <td class="subtotal">${
              article.currency + " " + article.unitCost * article.count
            }</td>
            `;
    cartBody.appendChild(cartTR);

    subtotalFinalValue += article.unitCost * article.count;

    let input = cartTR.querySelector("input");

    input.addEventListener("input", () => {
      article.count = input.value;
      localStorage.setItem("articlesInCart", JSON.stringify(articles));
      console.log(articles);

      // let subtotal = Math.round((article.count* article.unitCost)*100)/100
      let subtotal = (article.count * article.unitCost).toFixed(2);

      cartTR.querySelector(
        ".subtotal"
      ).innerHTML = `${article.currency} ${subtotal}`;

      subtotalFinalValue = 0;
      for (articlee of articles) {
        subtotalFinalValue += articlee.unitCost * articlee.count;
      }
      subtotalFinal.innerHTML = "USD " + subtotalFinalValue.toFixed(2);

      calculateShippingCost();
    });

    let deleteBtn = cartTR.querySelector(".btn-delete");

    deleteBtn.addEventListener("click", () => {
      articles.splice(articles.indexOf(article), 1);
      localStorage.setItem("articlesInCart", JSON.stringify(articles));
      cartBody.innerHTML = [];
      showCart();
    });
  }
  subtotalFinal.innerHTML = "USD " + Math.round(subtotalFinalValue * 100) / 100;
  console.log(articles);
}

function selectedRadio(radios) {
  let selectedRadio = "";
  for (let radio of radios) {
    if (radio.checked) {
      selectedRadio = radio;
      console.log(`el radio elegido es ${radio.id}`);
    }
  }
  return selectedRadio;
}

//generaliza las dos anteriores o la eleccion de un radio entre varios
//para tipo de envio radios = envios, para tipo de pago radios = paymentOptions

function calculateShippingCost() {
  let selectedShippingMethod = Number(selectedRadio(shippingOptions).value);
  shippingCost.innerHTML = `USD ${
    Math.round(selectedShippingMethod * subtotalFinalValue * 100) / 100
  }`;
  total.innerHTML = `USD ${
    Math.round(
      (selectedShippingMethod * subtotalFinalValue + subtotalFinalValue) * 100
    ) / 100
  }`;
}

// Hay que corregirlo para no tener que llamar a la función cada vez sino que el radio se guarde en una variable

function paymentMethodSelected() {
  let paymentMethodSelected = selectedRadio(paymentOptions);
  if (paymentMethodSelected.value == "transf") {
    creditFieldset.setAttribute("disabled", "");
    accountNumber.removeAttribute("disabled", "");
  } else {
    accountNumber.setAttribute("disabled", "");
    creditFieldset.removeAttribute("disabled", "");
  }
}

function savePaymentOption() {
  console.log("save clicked");
  let paymentMethodSelected = selectedRadio(paymentOptions);
  let missingPaymentMethodMessage = document.getElementById(
    "payment-method-message-missing"
  );
  let checkedPaymentMethodMessage = document.getElementById(
    "payment-method-message-ok"
  );

  if (paymentMethodSelected.value == "credit") {
    choosenPaymentOption.innerHTML = `Tarjeta de Crédito`;
    checkedPaymentMethodMessage.classList.remove("d-none");
    missingPaymentMethodMessage.classList.remove("d-inline");
    missingPaymentMethodMessage.classList.add("d-none");
  } else if (paymentMethodSelected.value == "transf") {
    choosenPaymentOption.innerHTML = `Transferencia Bancaria`;
    checkedPaymentMethodMessage.classList.remove("d-none");
    missingPaymentMethodMessage.classList.remove("d-inline");
    missingPaymentMethodMessage.classList.add("d-none");
  } else {
    missingPaymentMethodMessage.classList.remove("d-none");
    missingPaymentMethodMessage.classList.add("d-inline");
  }
}

function submitPurchase() {
  console.log("se finalizará la compra");

  if (!selectedRadio(paymentOptions)) {
    let missingPaymentMethodMessage = document.getElementById(
      "payment-method-message-missing"
    );
    missingPaymentMethodMessage.classList.remove("d-none");
    missingPaymentMethodMessage.classList.add("d-inline");
  }

  succesfulBuy();
}

function succesfulBuy() {
  if (purchaseForm.checkValidity()) {
    localStorage.removeItem("cartNumbers");
    localStorage.removeItem("articlesInCart");
    localStorage.removeItem("totalCost");
    showAlertSuccess();
    window.location.href = "index.html";
    // document.window.location.href = "index.html"
  }
}

document.addEventListener("DOMContentLoaded", function () {
  showCart();
  calculateShippingCost();
});

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
