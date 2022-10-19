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
  // on récupére les éléments du localStorage
  let cart = getCart();
  // si le panier est vide
  if (cart == null || cart == "") {
    const emptyCart = document.getElementsByTagName("h1");
    emptyCart.innerHTML = `<p> Votre panier est vide</p>`;
  } else {
    // Si le panier n'est pas vide on récupère les produits
    for (let item of itemList) {
      // récupération des produits du localStorage
      for (product of cart) {
        // l'id que l'on récupére dans l'item doit être le même que product
        if (item._id === product._id) {
          // je crée l'article
          let articleCard = document.createElement("article");
          articleCard.classList.add("cart__item");
          document.querySelector("#cart__items").appendChild(articleCard);

          // je crée la div pour les images
          let divItem = document.createElement("div");
          divItem.classList.add("cart__item_img");
          articleCard.appendChild(divItem);

          // je crée l'image
          let img = document.createElement("img");
          // je passe l'url en attribut
          img.setAttribute("src", item.imageUrl);
          // pareil pour le alt
          img.setAttribute("alt", item.altTxt);
          divItem.appendChild(img);

          // Je crée une seconde div
          let itemContent = document.createElement("div");
          article.appendChild(itemContent);
          itemContent.className = "cart__item__content";

          // J'ajoute la description
          let itemDescription = document.createElement("div");
          itemContent.appendChild(itemDescription);
          itemDescription.className = "cart__item__content__description";
        }
      }
    }
  }
}
