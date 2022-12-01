const URL = PRODUCTS_URL + localStorage.getItem("catID") + EXT_TYPE;

const ORDER_ASC_BY_COST = "Ascend $";
const ORDER_DESC_BY_COST = "Descend $";
const ORDER_BY_PROD_SOLD = "Vendidos";
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;
let productListContainer = document.getElementById("product-list-container");
let strongProduct = document.getElementById("strong-product");

let searchBar = document.getElementById("search-bar");

function sortProducts(criteria, array) {
  let result = [];
  if (criteria === ORDER_ASC_BY_COST) {
    result = array.sort(function (a, b) {
      if (a.cost < b.cost) {
        return -1;
      }
      if (a.cost > b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_DESC_BY_COST) {
    result = array.sort(function (a, b) {
      if (a.cost > b.cost) {
        return -1;
      }
      if (a.cost < b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_BY_PROD_SOLD) {
    result = array.sort(function (a, b) {
      let aSold = parseInt(a.soldCount);
      let bSold = parseInt(b.soldCount);

      if (aSold > bSold) {
        return -1;
      }
      if (aSold < bSold) {
        return 1;
      }
      return 0;
    });
  }

  return result;
}

function setProductID(id) {
  localStorage.setItem("productID", id);
  window.location = "product-info.html";
}

//función que guarda el ID del producto y redirecciona

function showProductsList() {
  let HTMLContentToAppend = "";

  for (let i = 0; i < currentProductsArray.length; i++) {
    let product = currentProductsArray[i];

    if (
      (minCount == undefined ||
        (minCount != undefined && parseInt(product.cost) >= minCount)) &&
      (maxCount == undefined ||
        (maxCount != undefined && parseInt(product.cost) <= maxCount))
    ) {
      HTMLContentToAppend += `
    
            <div onclick="setProductID(${product.id})" class="list-group-item list-group-item-action cursor-active">
    
                <div class="row">
    
                    <div class="col-3">
                        <img src="${product.image}" alt="${product.name}" class="img-thumbnail">
                    </div>
    
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1"> ${product.name} - ${product.currency} ${product.cost} </h4>
                            <small class "text-muted"> ${product.soldCount} vendidos </small>  
                        </div>
    
                        <p class="mb-1">${product.description}</p>
                    </div>
                </div>
            </div>`;
    }
  }

  productListContainer.innerHTML = HTMLContentToAppend;
}

function sortAndShowProducts(sortCriteria, productsArray) {
  currentSortCriteria = sortCriteria;

  if (productsArray != undefined) {
    currentProductsArray = productsArray;
  }

  currentProductsArray = sortProducts(
    currentSortCriteria,
    currentProductsArray
  );

  //Muestro los productos ordenados
  showProductsList();
}

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      currentProductsArray = resultObj.data.products;
      strongProduct.innerText = resultObj.data.catName;
      showProductsList();
      //sortAndShowProducts(ORDER_ASC_BY_NAME, resultObj.data);
    }
  });

  document.getElementById("sortAsc").addEventListener("click", function () {
    sortAndShowProducts(ORDER_ASC_BY_COST);
  });

  document.getElementById("sortDesc").addEventListener("click", function () {
    sortAndShowProducts(ORDER_DESC_BY_COST);
  });

  document.getElementById("sortBySold").addEventListener("click", function () {
    sortAndShowProducts(ORDER_BY_PROD_SOLD);
  });

  document
    .getElementById("clearRangeFilter")
    .addEventListener("click", function () {
      document.getElementById("rangeFilterCountMin").value = "";
      document.getElementById("rangeFilterCountMax").value = "";

      minCount = undefined;
      maxCount = undefined;

      showProductsList();
    });

  document
    .getElementById("rangeFilterCount")
    .addEventListener("click", function () {
      //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad de productos por categoría.

      minCount = document.getElementById("rangeFilterCountMin").value;
      maxCount = document.getElementById("rangeFilterCountMax").value;

      if (minCount != undefined && minCount != "" && parseInt(minCount) >= 0) {
        minCount = parseInt(minCount);
      } else {
        minCount = undefined;
      }

      if (maxCount != undefined && maxCount != "" && parseInt(maxCount) >= 0) {
        maxCount = parseInt(maxCount);
      } else {
        maxCount = undefined;
      }

      showProductsList();
    });

  searchBar.addEventListener("keyup", function () {
    console.log(searchBar.value);

    currentProductsArray = currentProductsArray.filter(
      (currentProductsArray) =>
        currentProductsArray.name
          .toLowerCase()
          .includes(searchBar.value.toLowerCase()) ||
        currentProductsArray.description
          .toLowerCase()
          .includes(searchBar.value.toLowerCase())
    );

    console.log(currentProductsArray);

    showProductsList();
  });

  console.log(currentProductsArray);
});
