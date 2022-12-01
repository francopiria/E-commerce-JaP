const URL = PRODUCT_INFO_URL + localStorage.getItem("productID") + EXT_TYPE;
const URLcomment =
  PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("productID") + EXT_TYPE;

let productContainer = document.getElementById("product-container");

let productComments = document.getElementById("product-comments");
let relatedProducts = document.getElementById("related-products");

let currentProduct = [];
let currentComments = [];

function setProductID(id) {
  localStorage.setItem("productID", id);
  window.location = "product-info.html";
}

function showProduct() {
  let product = currentProduct;
  let currentArticle = [];

  productContainer.innerHTML = `

        <div class="list-group-item">
            <h1> ${product.name}</h1>
            <button id="add-to-cart-btn"> Agregar al carrito </Button>
            <hr>

            <div class="col">
                <div class="container">
                    <div class="justify-content-between">
                        <h4 class="mb-1"> Precio </h4>
                        <p> ${product.currency} ${product.cost}
                    </div>
                    <div class="justify-content-between">
                        <h4 class="mb-1"> Descripción </h4>
                        <p> ${product.description}
                    </div>
                    <div class="justify-content-between">
                        <h4 class="mb-1"> Categoría </h4>
                        <p> ${product.category}
                    </div>
                    <div class="justify-content-between">
                        <h4 class="mb-1"> Cantidad de Vendidos </h4>
                        <p> ${product.soldCount}
                    </div>

                    <div class="justify-content-between">
                        <h4>Imágenes Ilustrativas</h4>

                        <div id="carouselExampleControls" class="carousel slide img-div" data-bs-ride="carousel">

                            <div class="carousel-inner" id="carousel-images">
                            </div>

                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>`;

  appendImages();

  let addToCartBtn = document.getElementById("add-to-cart-btn");

  addToCartBtn.addEventListener("click", function () {
    currentArticle = setProductIntoArticle(product);
    cartNumbers(currentArticle);
    totalCost(currentArticle);
  });
}

function setProductIntoArticle(product) {
  let currentArticle = [];

  console.log(product.currency);
  if (product.currency === "UYU") {
    currentArticle = {
      id: product.id,
      name: product.name,
      count: product.count,
      unitCost: Math.round(product.cost * UYUtoUSD * 100) / 100,
      // "unitCost": (product.cost*UYUtoUSD).toFixed(2),
      currency: "USD",
      image: product.images[1],
    };
  } else {
    currentArticle = {
      id: product.id,
      name: product.name,
      count: product.count,
      unitCost: product.cost,
      // "unitCost": product.cost.toFixed(2),
      currency: product.currency,
      image: product.images[1],
    };
  }
  console.log(currentArticle);

  return currentArticle;
}

function appendImages() {
  let imagesDiv = document.getElementById("carousel-images");
  product = currentProduct;

  let HTMLContentToAppend = ``;

  for (let i = 0; i < product.images.length; i++) {
    if (i == 0) {
      HTMLContentToAppend += `
            <div class="carousel-item active">
                <img src="${product.images[i]}" class="d-block w-100" alt="${product.name}">
            </div>
            `;
    } else {
      HTMLContentToAppend += `
            <div class="carousel-item">
            <img src="${product.images[i]}" class="d-block w-100" alt="${product.name}">
            </div>
            `;
    }
  }
  imagesDiv.innerHTML = HTMLContentToAppend;
}

function appendComments() {
  console.log(currentComments);

  let HTMLContentToAppend = "";

  for (let comment of currentComments) {
    HTMLContentToAppend += `
        <div class="container">
            <div class="list-group-item">
                <div>
                    <p> <strong> ${comment.user} </strong> ${
      comment.dateTime
    } - ${stars(comment.score)}
                    </p>
                    <p> ${comment.description} </p>
                </div>
            </div>
        </div>
        `;
  }
  productComments.innerHTML += HTMLContentToAppend;
}

function stars(score) {
  let HTMLContentToAppend = "";

  for (let i = 1; i < 6; i++) {
    if (i <= score) {
      HTMLContentToAppend += `<span class="fa fa-star checked" ></span>`;
    } else {
      HTMLContentToAppend += `<span class="fa fa-star" ></span>`;
    }
  }
  return HTMLContentToAppend;
}

let rateButton = document.getElementById("rateBtn");
rateButton.addEventListener("click", rate);

function rate() {
  console.log("btn clicked");
  let comment = document.getElementById("comment");
  let score = document.getElementById("score");

  let newRate = {
    dateTime: Date(),
    description: comment.value,
    product: currentProduct.id,
    score: parseFloat(score.value),
    user: localStorage.getItem("emailUsuario"),
  };

  currentComments.push(newRate);

  productComments.innerHTML = "";
  appendComments();
}

function showRelatedProducts() {
  let product = currentProduct;
  HTMLContentToAppend = "";

  for (let relatedProduct of product.relatedProducts) {
    HTMLContentToAppend += `
    <div class="container">
        <div class="col">

            <div class="card shadow-sm cursor-active list-group-item-action" onclick="setProductID(${relatedProduct.id})">

                <img src="${relatedProduct.image}" alt="${relatedProduct.name}" class="img-thumbnail">

                <div class="card-body">
                    <p class="card-text">${relatedProduct.name}</p>
                </div>
            </div>
        </div>
    </div>
        `;
  }
  relatedProducts.innerHTML += HTMLContentToAppend;
}

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      currentProduct = resultObj.data;
      showProduct();
      showRelatedProducts();
    }
  });

  getJSONData(URLcomment).then(function (resultObj) {
    if (resultObj.status === "ok") {
      currentComments = resultObj.data;
      appendComments();
    }
  });
});
