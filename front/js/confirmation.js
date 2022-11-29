// *******************
// confirmation
// *******************

// récupère l'orderId
const params = new URL(document.location).searchParams;
const orderId = params.get("ordeID");
console.log(orderId);

// Affiche le numéro de commande sur le DOM
document.getElementById("orderId").textContent = orderId._id;

const diarga = 5;
console.log(diarga);
