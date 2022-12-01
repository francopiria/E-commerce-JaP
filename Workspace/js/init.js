const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL =
  "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL =
  "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

const UYUtoUSD = 0.025;

let userMail = localStorage.getItem("emailUsuario");
let navBarContent = document.getElementById("navBarContent");
let userInNav = document.getElementById("user-mail");

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
};
let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
};

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = "ok";
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = "error";
      result.data = error;
      hideSpinner();
      return result;
    });
};

function showAlertSuccess() {
  document.getElementById("alert-success").classList.add("show");
}

function showAlertError() {
  document.getElementById("alert-danger").classList.add("show");
}

// let logoutBtn = document.getElementById("log-out-btn")
// logoutBtn.addEventListener("click", localStorage.clear())

function onLoadArticles() {
  let productNumbers = localStorage.getItem("articlesInCart");

  if (productNumbers) {
    document.getElementById("cart").textContent = productNumbers;
  }
}

function cartNumbers(article) {
  let articleNumbers = localStorage.getItem("cartNumbers");

  articleNumbers = parseInt(articleNumbers);
  // siempre vuelve de localstorage como string

  if (articleNumbers) {
    localStorage.setItem("cartNumbers", articleNumbers + 1);
    document.getElementById("cart").textContent = articleNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.getElementById("cart").textContent = 1;
  }

  setItems(article);
}

function setItems(article) {
  let cartArticles = localStorage.getItem("articlesInCart");
  // lo tengo que pasar a objeto de js
  cartArticles = JSON.parse(cartArticles);
  console.log("mis productos en carrito son ", cartArticles);

  if (cartArticles != null) {
    if (cartArticles[article.name] == undefined) {
      article.count = 0;
      cartArticles = {
        ...cartArticles,
        // operador ... agrega lo que sea que hubiera antes
        // en cartArticles
        [article.name]: article,
      };
    }
    // esto creo que sería igual a push
    cartArticles[article.name].count += 1;
  } else {
    article.count = 1;
    cartArticles = {
      [article.name]: article,
    };
  }

  localStorage.setItem("articlesInCart", JSON.stringify(cartArticles));
}

function totalCost(article) {
  // console.log("el precio del producto es ", article.unitCost);

  let cartCost = localStorage.getItem("totalCost");

  // lo convierto de string a número

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + article.unitCost);
  } else {
    localStorage.setItem("totalCost", article.unitCost);
  }
}

function addUserToNav() {
  if (userMail !== null) {
    userInNav.innerHTML = `
  <div class="dropdown">
    <a class="nav-link" id="user-mail" class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    ${userMail}
    </a>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
      <li>
        <a class="dropdown-item" href="cart.html">
          Mi Carrito <ion-icon name="basket"></ion-icon><span id="cart"></span>
        </a>
      </li>
      <li><a class="dropdown-item" href="my-profile.html">Mi Perfil</a></li>
      <li><a class="dropdown-item" href="login.html">
        Cerrar Sesión
        </a></li>
    </ul>
  </div>
  `;
  }

  onLoadArticles();
}

document.addEventListener("DOMContentLoaded", function (e) {
  addUserToNav();
});
