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

    // Mettre la description
    document.querySelector("#description").textContent =
      displayCanape.description;
    // Choisir la couleur
    let canapeColor = document.createElement("colors");
    document.querySelector("#colors").textContent = displayCanape.color;
  })
  .catch(function (err) {
    let error = document.querySelector("main");
    error.innerHTML = `<h2>Une erreur est survenue !</h2><br><p>Nos équipes sont sur le pont.</p>`;
  });
