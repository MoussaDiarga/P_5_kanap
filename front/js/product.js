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
