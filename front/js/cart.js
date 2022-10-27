// fonction pour enregistrer dans le localStorage
const saveCart = (cart) => {
  // transforme notre tableau en chaine de caractères
  localStorage.setItem("cart", JSON.stringify(cart));
};

// fonction pour récupérer les données du localStorage
const getCart = () => {
  let cart = [];
  cart = localStorage.getItem("cart");
  // si il'n y a rien, on retourne un tableau vide
  if (cart == null) {
    return [];
  }
  // sinon on retourne la chaine de caractère en tableau
  else {
    return JSON.parse(cart);
  }
};

/*Récupération des données de l'API*/
fetch(`http://localhost:3000/api/products`)
  .then((data) => data.json())
  .then((itemList) => {
    getItemCart(itemList);
  })
  .catch(function (err) {
    let error = document.querySelector("main");
    error.innerHTML = `<h2>Une erreur est survenue !</h2><br><p>Nos équipes sont sur le pont.</p>`;
  });

function getItemCart(itemList) {
  console.log("console 1");
  let testData = document.getElementsByClassName("itemQuantity");
  console.log("testData", testData);
  // on récupére les éléments du localStorage
  let cart = getCart();
  // si le panier est vide
  if (cart == null || cart == "") {
    const emptyCart = document.getElementsByTagName("h1");
    emptyCart.innerHTML = `<p> Votre panier est vide</p>`;
  } else {
    // Si le panier n'est pas vide on récupère les produits
    let totalPrice = 0;
    for (let item of itemList) {
      for (product of cart) {
        console.log("product", product, item);
        // l'id que l'on récupére dans l'item doit être le même que product
        if (item._id === product._id) {
          // je crée l'article
          let articleCard = document.createElement("article");
          articleCard.classList.add("cart__item");
          document.querySelector("#cart__items").appendChild(articleCard);

          // je crée la div pour les images
          let divItem = document.createElement("div");
          divItem.classList.add("cart__item__img");
          articleCard.appendChild(divItem);

          // je crée l'image
          let img = document.createElement("img");
          // je passe l'url en attribut
          img.setAttribute("src", item.imageUrl);
          // pareil pour le alt
          img.setAttribute("alt", item.altTxt);
          divItem.appendChild(img);

          // je crée la seconde div où se trouve la div de la description
          let cart__item__content = document.createElement("div");
          cart__item__content.classList.add("cart__item__content");
          articleCard.appendChild(cart__item__content);

          //je crée la div de la description
          let divDesc = document.createElement("div");
          divDesc.classList.add("cart__item__content__description");
          cart__item__content.appendChild(divDesc);

          // je crée le titre des canapé
          let h2 = document.createElement("h2");
          console.log("h2", h2);
          divDesc.appendChild(h2);
          // // j'injecte le titre
          h2.textContent = item.name;

          //je mets la couleur
          let colors = document.createElement("p");
          divDesc.appendChild(colors);
          console.log("item.colors", item.colors);
          console.log("product.colors", product.colors);
          console.log("item", item);
          colors.textContent = product.colors;

          //je crée le prix
          let price = document.createElement("p");
          divDesc.appendChild(price);
          // j'injecte le prix
          price.innerHTML = item.price + "€";

          //je crée une troisième div pour setting
          let contentSettings = document.createElement("div");
          divDesc.appendChild(contentSettings);
          contentSettings.className = "cart__item__content__settings";

          // je crée la div setting_quantity
          let settingsQuantity = document.createElement("div");
          contentSettings.appendChild(settingsQuantity);
          settingsQuantity.className =
            "cart__item__content__settings__quantity";

          //Je crée un paragraphe pour la quantité
          let quantity = document.createElement("p");
          settingsQuantity.appendChild(quantity);
          quantity.innerHTML = "Qté : ";

          //je mets la qantité de canapé commandés
          let nmbrQuantity = document.createElement("input");
          settingsQuantity.appendChild(nmbrQuantity);
          nmbrQuantity.value = product.quantity;
          nmbrQuantity.setAttribute("type", "number");
          nmbrQuantity.setAttribute("min", "1");
          nmbrQuantity.setAttribute("max", "100");
          nmbrQuantity.setAttribute("name", "itemQuantity");
          nmbrQuantity.className = "itemQuantity";
          // je calcule la somme totale
          totalPrice = totalPrice += item.price * product.quantity;

          //je crée la div de supprimer
          let suppItem = document.createElement("div");
          contentSettings.appendChild(suppItem);
          suppItem.className = "cart__item__content__settings__delete";

          //je crée supprimer
          let dltItem = document.createElement("p");
          suppItem.appendChild(dltItem);
          dltItem.className = "deleteItem";
          dltItem.innerHTML = "Supprimer";
        }
      }
    }
    getTotals(totalPrice);
    console.log("totalPrice", totalPrice);
  }
}

//Je récupère le total des produits
function getTotals(total) {
  console.log("console 2", total);
  let itemQtt = document.getElementsByClassName("itemQuantity");
  console.log("itemQtt", itemQtt);
  let qttLength = itemQtt.length;
  console.log("qttLength", qttLength);

  totalQtt = 0;

  for (let i = 0; i < qttLength; ++i) {
    console.log("type of", typeof itemQtt[i].value);
    const num = Number(itemQtt[i].value);
    console.log("type of 2", typeof num);
    console.log("value", itemQtt[i].value);
    totalQtt += Number(itemQtt[i].value);
  }
  console.log("totalQtt", totalQtt);
  let itemTotalQuantity = document.getElementById("totalQuantity");
  itemTotalQuantity.innerHTML = totalQtt;

  let spanPrice = document.querySelector("#totalPrice");
  spanPrice.innerHTML = total;
}

// Supprimer un produit en fonction de son id et sa couleur :
function deleteProduct() {
  let dltBtn = document.querySelectorAll(".deleteItem");

  for (let i = 0; i < dltBtn.length; i++) {
    dltBtn[i].addEventListener("click", (event) => {
      event.preventDefault();

      // let idDelete = cart[i].idProduit;
      // let colorDelet = color[i].productColors;
      // produitLocalStorage = cart.filter(
      //   (el) => el.cart !== idDelete || el.couleurProduit !== colorDelet
      // );

      localStorage.setItem("produit", JSON.stringify(cart));

      // // Alerte lorsque le produit est supprimé :
      // alert("Ce produit a bien été supprimé de votre panier");
      // location.reload();
    });
  }
}
