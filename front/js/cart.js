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
        if (item.id === product._id) {
          // Recherche l'id #cart__items
          const cart__items = document.querySelector("#cart__items");
          // je crée un enfant pour l'article
          cart__items.appendChild(article);
          // Insertion de l'élément "article"
          const article = document.createElement("article");
          article.classList.add("cart__item");
          // je crée un enfant pour notre article, à savoir l'image
          article.appendChild("div");
          // JE CREE UNE PREMIERE DIV DANS ARTICLE
          const div = document.createElement("div");
          // je crée une classe à la div
          div.classList.add("cart__item__img");
          // je crée l'enfant de la div
          div.appendChild("img");
          // je crée l'image
          const img = document.createElement("img");
          // je donne l'URL de notre image à notre attribut SRC
          img.src = item.imageUrl;
          // je donne l'ALT de notre image à notre attribut ALT
          img.alt = item.altTxt;
          // JE CREE UNE DEUXIEME DIV DANS ARTICLE
          article.appendChild("div");
          const div_ = document.createElement("div");
        }
      }
    }
  }
}
