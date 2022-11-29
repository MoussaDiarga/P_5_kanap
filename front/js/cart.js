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
          articleCard.setAttribute("data-id", product._id);
          articleCard.setAttribute("data-color", product.colors);

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
    deleteProduct(itemList);
    changeQtt(itemList);
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
function deleteProduct(list) {
  let dltBtn = document.querySelectorAll(".deleteItem");

  for (let button of dltBtn) {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      console.log("test");
      const cart__item = button.closest(".cart__item");
      console.log(cart__item);

      const colors = cart__item.getAttribute("data-color");
      const idProduct = cart__item.getAttribute("data-id");
      console.log(colors, idProduct);

      // Je récupère les éléments du localStorage
      const cart = getCart();
      console.log("essai", cart);
      // Je fais un filter pour ne pas afficher l'id supprimé
      const result = cart.filter(
        (el) => !(el._id === idProduct && el.colors === colors)
      );
      console.log("test3", cart);
      console.log("test2", result);

      // Mise à jour du localStorage
      localStorage.setItem("cart", JSON.stringify(result));
      // Refresh de la page Panier
      cart__item.remove();
      changeTotalPrice(list, result);
      console.log("carttest3", result);
      alert("Article supprimé du panier.");
    });
  }
}

// // je modifie la quantité dans le panier
function changeQtt(list) {
  console.log("rtttt");
  let itemQtt = document.querySelectorAll(".itemQuantity");
  for (let qtt of itemQtt) {
    qtt.addEventListener("change", (event) => {
      event.preventDefault();
      console.log("list", list);
      console.log("change");

      // Je récupère les éléments du localStorage
      const cart = getCart();
      console.log("essai", cart);

      const cart__item = qtt.closest(".cart__item");
      console.log(cart__item);

      const colors = cart__item.getAttribute("data-color");
      const idProduct = cart__item.getAttribute("data-id");
      console.log(colors, idProduct);

      const product = cart.find(
        (el) => el._id == idProduct && el.colors == colors
      );
      if (product) {
        console.log(product);
        product.quantity = parseInt(qtt.value);
        console.log(product);
      }

      // J'aactualise le localStorage avec les nouvelles données
      // Je mets à jour le localStorage
      localStorage.setItem("cart", JSON.stringify(cart));
      console.log("test", cart);
      changeTotalPrice(list, cart);
      console.log("carttest2", cart);
      // avertir de la modification et mettre à jour les totaux
      alert("Votre panier est à jour.");
    });
  }
}

function changeTotalPrice(list, cart) {
  let newTotalPrice = 0;
  let newTotalQuantity = 0;
  for (let product of cart) {
    const item = list.find((el) => el._id == product._id);
    console.log("item", item);
    newTotalPrice = newTotalPrice + item.price * product.quantity;
    newTotalQuantity = newTotalQuantity + product.quantity;
  }
  let itemTotalQuantity = document.getElementById("totalQuantity");
  itemTotalQuantity.innerHTML = newTotalQuantity;

  let spanPrice = document.querySelector("#totalPrice");
  spanPrice.innerHTML = newTotalPrice;
  console.log("new", newTotalPrice);
  console.log("newTotal", newTotalQuantity);
  console.log("carttest", cart);
}

// Créer une nouvelle fonction pour mettre à jour le prix total surle html
//

/*boucler sur loclastorage pour récupérer le prix * la quantité de chaque produit
Stoker ce total dans une variable et rappeler la fonction gettotals avec cette variable*/

//FORMULAIRE//
/* GESTION DU FORMULAIRE */
// Regex pour le contrôle des champs Prénom, Nom et Ville
const regExPrenomNomVille = (value) => {
  return /^[A-Z][A-Za-z\é\è\ê\- ]+$/.test(value);
};

// Regex pour le contrôle du champ Adresse
const regExAdresse = (value) => {
  return /^[a-zA-Z0-9.,-_ ]{5,50}[ ]{0,2}$/.test(value);
};

// Regex pour le contrôle du champ Email
const regExEmail = (value) => {
  return /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/.test(
    value
  );
};

// firstName
firstName.addEventListener("input", (e) => {
  e.preventDefault();
  if (regExPrenomNomVille(firstName.value) == false || firstName.value == "") {
    document.getElementById("firstNameErrorMsg").textContent =
      "Le prénom saisi n'est pas valide";
    return false;
  } else {
    document.getElementById("firstNameErrorMsg").textContent = "";
    return true;
  }
});

// lastName
lastName.addEventListener("input", (e) => {
  e.preventDefault();
  if (regExPrenomNomVille(lastName.value) == false || lastName.value == "") {
    document.getElementById("lastNameErrorMsg").textContent =
      "Le nom saisi n'est pas valide";
    return false;
  } else {
    document.getElementById("lastNameErrorMsg").textContent = "";
    return true;
  }
});

// address
address.addEventListener("input", (e) => {
  e.preventDefault();
  if (regExAdresse(address.value) == false || address.value == "") {
    document.getElementById("addressErrorMsg").textContent =
      "L'adresse saisie n'est pas valide";
    return false;
  } else {
    document.getElementById("addressErrorMsg").textContent = "";
    return true;
  }
});

// city
city.addEventListener("input", (e) => {
  e.preventDefault();
  if (regExPrenomNomVille(city.value) == false || city.value == "") {
    document.getElementById("cityErrorMsg").textContent =
      "La ville saisie n'est pas valide";
    return false;
  } else {
    document.getElementById("cityErrorMsg").textContent = "";
    return true;
  }
});

// email
email.addEventListener("input", (e) => {
  e.preventDefault();
  if (regExEmail(email.value) == false || email.value == "") {
    document.getElementById("emailErrorMsg").textContent =
      "L'adresse mail saisie n'est pas valide";
    return false;
  } else {
    document.getElementById("emailErrorMsg").textContent = "";
    return true;
  }
});
// Je sélectionne du bouton Valider
const btnValidate = document.querySelector("#order");

// J'écoute le bouton Valider sur le click pour pouvoir valider le formulaire
btnValidate.addEventListener("click", (event) => {
  event.preventDefault();

  let contact = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value,
  };

  console.log(contact);

  // Je verifie les Regex avant l'envoi de la saisie
  let formIsValid = true;
  // Prénom
  if (
    regExPrenomNomVille(contact.firstName) == false ||
    contact.firstName == ""
  ) {
    document.getElementById("firstNameErrorMsg").textContent =
      "Le prénom saisi n'est pas valide";
    formIsValid = false;
  } else {
    document.getElementById("firstNameErrorMsg").textContent = "";
  }

  // Nom
  if (
    regExPrenomNomVille(contact.lastName) == false ||
    contact.firstName == ""
  ) {
    document.getElementById("lastNameErrorMsg").textContent =
      "Le nom saisi n'est pas valide";
    formIsValid = false;
  } else {
    document.getElementById("lastNameErrorMsg").textContent = "";
  }

  // Adresse
  if (regExAdresse(contact.address) == false || contact.address == "") {
    document.getElementById("addressErrorMsg").textContent =
      "L'adresse saisie n'est pas valide";
    formIsValid = false;
  } else {
    document.getElementById("addressErrorMsg").textContent = "";
  }
  // Ville
  if (regExPrenomNomVille(contact.city) == false || contact.city == "") {
    document.getElementById("cityErrorMsg").textContent =
      "La ville saisie n'est pas valide";
    formIsValid = false;
  } else {
    document.getElementById("cityErrorMsg").textContent = "";
  }

  // Email
  if (regExEmail(contact.email) == false || contact.email == "") {
    document.getElementById("emailErrorMsg").textContent =
      "L'adresse mail saisie n'est pas valide";
    formIsValid = false;
  } else {
    document.getElementById("emailErrorMsg").textContent = "";
  }

  // Enregistrer le formulaire dans le local storage
  if ((formIsValid = true)) {
    localStorage.setItem("contact", JSON.stringify(contact));

    document.querySelector("#order").value =
      "Articles et formulaire valide\n Commande passée !";
    // Fetch avec methode Post pour envoyer le formulaire et le panier
  }

  // POST request using fetch()
  const url = "http://localhost:3000/api/products/order";
  fetch(url, {
    // J'ajoute la méthode
    method: "POST",

    // J'ajoute le body
    body: JSON.stringify({
      contact,
      products: [product._id],
      // title: "contact, products",
      // body: "je suis",
      // id: products._id,
    }),

    // J'ajoute le Headers
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((server) => {
      orderId = server.orderId;
      console.log(orderId);
    });

  // fetch("http://localhost:3000/api/products/contact", options)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(data);
  //     // localStorage.clear();
  //     localStorage.setItem("contact", JSON.stringify(contact));

  //     document.location.href = "confirmation.html";
  //   })
  //   .catch((err) => {
  //     alert("Problème avec fetch : " + err.message);
  //   });
});

// *******************
//  commander
// *******************

// const order = document.getElementById("order");

// // au click => les données du LS sont sauvegardées et envoyées à l'API
// order.addEventListener("click", async (e) => {
//   e.preventDefault();
//   const localStorageRecuperation = await getKanapLocalStorage();
//   // récupère les données du client
//   let contact = {
//     firstName: firstName.value,
//     lastName: lastName.value,
//     address: address.value,
//     city: city.value,
//     email: email.value,
//   };
// });
/* FIN GESTION DU FORMULAIRE */
