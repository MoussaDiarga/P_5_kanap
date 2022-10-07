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
fetch("http://localhost:3000/api/products/" + productsOnCart.id)
  .then(function (reponse) {
    if (reponse.ok) {
      return reponse.json();
    }
  })
  .then(function (toAdd) {
    /*Création des éléments du DOM en createElements*/
    /*Lien avec la section #cart__items*/
    const cartItems = document.getElementById("cart__items");

    /*Création de la balise article*/
    let cartArticle = document.createElement("article");
    cartArticle.className = "cart__item";
    cartArticle.dataset.id = productsOnCart.id;
    cartArticle.dataset.color = productsOnCart.couleur;
    cartItems.appendChild(cartArticle);

    /*Création de la balise div cart__item__img*/
    let cartDivImg = document.createElement("div");
    cartDivImg.className = "cart__item__img";
    cartArticle.appendChild(cartDivImg);

    /*Création de la balise img*/
    let cartImg = document.createElement("img");
    cartImg.src = toAdd.imageUrl;
    cartImg.alt = toAdd.altTxt;
    cartDivImg.appendChild(cartImg);

    /*Création de la balise div cart__item__content*/
    let cartDivContent = document.createElement("div");
    cartDivContent.className = "cart__item__content";
    cartArticle.appendChild(cartDivContent);

    /*Création de la balise div cart__item__content_description*/
    let cartDivContentDescription = document.createElement("div");
    cartDivContentDescription.className = "cart__item__content__description";
    cartDivContent.appendChild(cartDivContentDescription);

    /*Création de la balise h2*/
    let cartDescriptionName = document.createElement("h2");
    cartDescriptionName.innerText = toAdd.name;
    cartDivContentDescription.appendChild(cartDescriptionName);

    /*Création de la balise p couleur*/
    let cartDescriptionPColor = document.createElement("p");
    cartDescriptionPColor.innerText = productsOnCart.couleur;
    cartDivContentDescription.appendChild(cartDescriptionPColor);

    /*Création de la balise p prix*/
    let cartDescriptionPPrice = document.createElement("p");
    cartDescriptionPPrice.innerText = toAdd.price + " €";
    cartDivContentDescription.appendChild(cartDescriptionPPrice);

    /*Création de la balise div cart__item__content__settings*/
    let cartDivContentSettings = document.createElement("div");
    cartDivContentSettings.className = "cart__item__content__settings";
    cartDivContent.appendChild(cartDivContentSettings);

    /*Création de la balise div cart__item__content__settings__quantity*/
    let cartSettingsQuantity = document.createElement("div");
    cartSettingsQuantity.className = "cart__item__content__settings__quantity";
    cartDivContentSettings.appendChild(cartSettingsQuantity);

    /*Création de la balise p quantité*/
    let cartSettingsQuantityP = document.createElement("p");
    cartSettingsQuantityP.value = productsOnCart.quantite;
    cartSettingsQuantityP.innerText = "Qté : ";
    cartSettingsQuantity.appendChild(cartSettingsQuantityP);

    /*Création de la balise input et de ses attributs*/
    let cartInputQuantity = document.createElement("input");
    cartInputQuantity.className = "itemQuantity";
    cartInputQuantity.type = "number";
    cartInputQuantity.name = "itemQuantity";
    cartInputQuantity.min = 1;
    cartInputQuantity.max = 100;
    cartInputQuantity.value = productsOnCart.quantite;
    cartSettingsQuantity.appendChild(cartInputQuantity);
    /*Modifier la quantité d'un produit*/
    /*Evenement de modification*/
    cartInputQuantity.addEventListener("change", (m) => {
      m.preventDefault();
      /*Création de variables utilisées lors de la modification*/
      /*Nous avons besoin de récupérer l'id et la couleur stockés dans le LS*/
      let modifyId = productsOnCart.id;
      let modifyCouleur = productsOnCart.couleur;
      /*Nous allons rechercher avec la méthode find et comparer les id et les couleurs des objets modifiés*/
      let modifyProduct =
        cart.find((p) => p.id == modifyId) &&
        cart.find((p) => p.couleur == modifyCouleur);
      if (modifyProduct) {
        modifyProduct.quantite = Number(cartInputQuantity.value);
        localStorage.setItem("toAdd", JSON.stringify(cart));
      } else {
        cart.push(toAdd);
        localStorage.setItem("toAdd", JSON.stringify(cart));
      }
      /*On joue la fonction de rechargement de la page*/
      reload();
    });
    /*Création du bouton "supprimer"*/
    /*Création de la div*/
    let cartSettingsDelete = document.createElement("div");
    cartSettingsDelete.className = "cart__item__content__settings__delete";
    cartDivContentSettings.appendChild(cartSettingsDelete);
    /*Création du paragraphe*/
    let cartSettingsDeleteP = document.createElement("p");
    cartSettingsDeleteP.className = "deleteItem";
    cartSettingsDeleteP.innerText = "Supprimer";
    cartSettingsDelete.appendChild(cartSettingsDeleteP);
    /*Supprimer un produit contenu dans le local storage*/
    /*On crée l'evenement de suppression au click sur le bouton supprimer*/
    cartSettingsDeleteP.addEventListener("click", (e) => {
      e.preventDefault();
      /*On crée les variables utilisées lors de la suppression*/
      let deleteId = productsOnCart.id;
      let deleteCouleur = productsOnCart.couleur;
      /*La méthode .filter permet d'aller rechercher les éléments précis que l'on veut supprimer en fonction de l'id et la couleur*/
      /*le .remove est une fonction du localStorage pour supprimer un élément*/
      let deleteItem = cart.filter(
        (p) => p.id != deleteId || p.couleur != deleteCouleur
      );
      e.target.closest(".cart__item").remove();
      /*On actualise le LS*/
      localStorage.setItem("toAdd", JSON.stringify(deleteItem));
      /*On joue la fonction d'actualisation de la page*/
      reload();
    });
    /*On va calculer le prix total*/
    let totalPrice = document.querySelector("#totalPrice");
    totalAmount += cartInputQuantity.value * toAdd.price;
    totalPrice.innerText = totalAmount;
  });
