// On récupére l'id des produits
let params = new URLSearchParams(window.location.search);
let idCanape = params.get("id");

// on fetch l'adresse de nos produits
fetch(`http://localhost:3000/api/products/${idCanape}`)
  // 1ère étape de la promesse, on vérifie si c'est OK
  .then((data) => data.json())
  // si oui, on crée une fonction pour afficher les détails de notre produit
  .then((displayCanape) => {
    // ajout de l'image
    // on crée d'abord un élement de type image
    let canapeImage = document.createElement("img");
    // on lui passe l'url en attribut
    canapeImage.setAttribute("src", displayCanape.imageUrl);
    // pareil pour le alt
    canapeImage.setAttribute("alt", displayCanape.altTxt);
    // on va chercher la classe item__img afin de créer un enfant de type img
    // avec nos paramètres ;)
    document.querySelector(".item__img").appendChild(canapeImage);

    // ajout du nom du produit
    document.querySelector("#title").textContent = displayCanape.name;

    // ajout du prix

    document.querySelector("#price").textContent = displayCanape.price;
    // ajout de la description
    document.querySelector("#description").textContent =
      displayCanape.description;
    // Choisir la couleur/on crée une boucle
    for (let color of displayCanape.colors) {
      let canapeColor = document.createElement("option");
      canapeColor.value = color;
      canapeColor.innerHTML = color;
      document.querySelector("#colors").appendChild(canapeColor);
    }
    // recuperation de la quantite
    const quantityChoice = document.getElementById("quantity");
    if (quantityChoice.value == 0 || quantityChoice.value > 100) {
      alert("Merci de sélectionner une quantité comprise entre 1 et 100"); // si la quantité est égale à 0 ou si elle dépasse 100 = message d'erreur
      return;
    }
  })

  .catch(function (err) {
    let error = document.querySelector("main");
    error.innerHTML = `<h2>Une erreur est survenue !</h2><br><p>Nos équipes sont sur le pont.</p>`;
  });

// on va créer un objet pour y mettre l'id, la quantité et la couleur
let product = {
  _id: idCanape,
};

// choix de la couleur
let colorSelected = document.getElementById("colors");
// on écoute les événements sur l'élément colors
colorSelected.addEventListener("input", (event) => {
  // on récupère la valeur de la cible
  let colorProduct = event.target.value;
  // on ajoute à l'objet product
  product.colors = colorProduct;
});

// choix de la quantité
let quantitySelected = document.getElementById("quantity");
// on écoute les événements sur quantity
quantitySelected.addEventListener("input", (event) => {
  // on récupère la valeur de la cible
  let quantityProduct = event.target.value;
  // on ajoute la quantité à l'objet product
  product.quantity = parseInt(quantityProduct);
});

// On passe nos infos dans le localStorage

// fonction pour enregistrer dans le localStorage
const saveCart = (cart) => {
  // transforme notre tablea en chaine de caractères
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

//  ajout des produits dans le localStorage
const addQuantity = (product) => {
  let cart = getCart();
  let foundProduct = cart.find(
    (p) => p._id == product._id && p.colors == product.colors
  );
  // si i'il y a un produit identique (id + couleur) on augmente la quantité
  if (foundProduct != undefined) {
    // on définit la nouvelle quantité
    let newQuantity = foundProduct.quantity + product.quantity;
    foundProduct.quantity = newQuantity;
    // si la quantité totale pour un produit fait plus de 100
    if (foundProduct.quantity > 100) {
      // on revient à l'ancienne quantité
      let maxQuantity = 100;
      foundProduct.quantity = maxQuantity;
      alert("Le maximum est de 100 unités par commande");
    } else {
      alert("la quantité a bien été modifiée !");
    }
  } else {
    cart.push(product);
    alert("Produit ajouté au panier ! Merci pour votre commande");
  }
  // on envoie dans le localStorage
  saveCart(cart);
};

// clic pour l'ajout au panier
const addToCart = document.getElementById("addToCart");
addToCart.addEventListener("click", () => {
  //conditions pour envoyer la sélection au panier
  if (
    product.quantity > 0 &&
    product.quantity <= 100 &&
    product.colors !== "" &&
    product.colors !== undefined
  ) {
    // on envoie l'objet product dans la fonction addQuantity(product)
    addQuantity(product);
  } else {
    alert(
      "Veuillez renseigner une couleur et une quantité valide comprise entre 1 et 100"
    );
  }
});
