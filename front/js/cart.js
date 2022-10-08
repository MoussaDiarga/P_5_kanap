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
fetch(`http://localhost:3000/api/products/${idCanape}`).then(function (
  reponse
) {
  if (reponse.ok) {
    return reponse.json();
  }
});
function getItemCart() {
  if (produitLocalStorage == null || insertionProduit == 0) {
    const emptyCart = document.getElementsByTagName("h1");
    emptyCart.innerHTML = `<p> Votre panier est vide</p>`;
  } else {
    for (let produit in produitLocalStorage) {
      // Insertion de l'élément "article"
      let productArticle = document.createElement("article");
      document.querySelector("#cart__items").appendChild(productArticle);
      productArticle.className = "cart__item";
      productArticle.setAttribute(
        "data-id",
        produitLocalStorage[produit].idProduit
      );
    }
  }
}
