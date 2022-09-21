/* APPEL API */

// on crée une fonction pour récupérer les données des canapés !

const getCanape = async () => {
  // on essaie d'abord de déclencher le fonctionnement normal de notre site
  try {
    // on attent un "fetch" de l'URL de l'API notifiée dans les specs
    const reponse = await fetch("http://localhost:3000/api/products");
    // on transforme notre réponse en format JSon
    const canapes = await reponse.json();
    // on affiche le résultat dans la console
    console.log(canapes);
    // On insère notre résultat dans une fonction future qui nous permettra
    // d'afficher nos produits !!
    insertionProduit(canapes);
  } catch (error) {
    // si jamais il y a une erreur
    // nous aurons le détail dans la console
    console.log(`${error}`);
    // et l'utilisateur recevra une alerte
    alert("attention erreur !");
  }
};

// on insère nos produits dans notre page d'accueil grâce à cette fonction appelée
// dans la fonction getCanape()
const insertionProduit = (canapes) => {
  // pour chaque élément dans le tableau canapes de l'API
  for (let canapeElement of canapes) {
    //Selectionner les différents éléments
    // on recherche l'ID #items
    const items = document.querySelector("#items");
    // création la balise card cliquable
    const a = document.createElement("a");
    //creation de l'article
    const article = document.createElement("article");
    //creation de l'image
    const img = document.createElement("img");
    // création du titre
    const h3 = document.createElement("h3");
    // création de la description
    const p = document.createElement("p");

    // maintenant, nous allons créer le contenu

    // on crée un enfant pour notre lien
    items.appendChild(a);
    // pour le moment, on renseigne le lien vide
    a.href = "#";

    // on crée un enfant pour notre lien !
    a.appendChild(article);

    // on crée un enfant pour notre article, à savoir l'image
    article.appendChild(img);
    // on donne l'URL de notre image à notre attribut SRC
    img.src = canapeElement.imageUrl;
    // on donne l'ALT de notre image à notre attribut ALT
    img.alt = canapeElement.altTxt;

    // on affiche le titre sur notre page
    article.appendChild(h3);
    // on injecte le titre
    h3.textContent = canapeElement.name;
    // on ajoute la classe
    h3.classList.add("productName");

    // on affiche la description
    article.appendChild(p);
    // on injecte la description
    p.textContent = canapeElement.description;
    // on ajoute la classe
    p.classList.add("productDescription");
  }
};
// Creation du lien de l'article.

// j'appelle ma fonction 1ère qui fetch les canapés
// au sein de laquelle j'ai ma fonction qui les affiche !
getCanape();

/* je crée mes Variables */
const url = "http://localhost:3000/api/products/";
const itemsBox = document.getElementById("items");

// Pour Initialiser la page index.html
loadProducts();

// Chargement et mise en page.
function loadProducts() {
  // j'attends un fetch de l'url (variable)
  fetch(url)
    // La réponse
    .then((res) => {
      // Si la réponse est bonne le rendre en Json
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      data.forEach((product) => {
        // on crée le lien de l'article.
        let myLink = document.createElement("a");
        myLink.setAttribute("href", `./product.html?id=${product._id}`);
        myLink.innerHTML = `<article><img src="${product.imageUrl}" alt="${product.altTxt}"><h3 class="productName">${product.name}</h3><p class="productDescription">${product.description}</p></article>`;
        itemsBox.appendChild(myLink);
        console.log(myLink);
      });
    })
    .catch((err) => {
      console.error(err);
    });
}
