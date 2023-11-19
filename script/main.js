// Fonction pour récupérer une liste d'éléments basée sur un ID
function recuplist(idName) {
    let list = [];
    let i = 0;
    let id = idName;
    
    // Boucle pour récupérer les éléments avec des IDs incrémentaux
    while ((id = idName + i), document.getElementById(id) !== null) {
        list.push(document.getElementById(id));
        i++;
        id = '';  // réinitialisation de la variable id
    }
    return list;
}

// Initialisation des listes d'éléments
let listItems = recuplist('item-');
let listLikesProducts = recuplist('like-');
let lisDisplayqty = recuplist('display-quantity-');
let displayTotal = document.getElementById('total');

// Fonction pour gérer l'effet "like" sur les produits
function like(listLikesProducts) {
    Array.from(listLikesProducts).forEach((heart) => {
        heart.addEventListener("click", () => {
            if (heart.classList.contains("fa-regular")) {
                heart.classList.remove("fa-regular");
                heart.classList.add("fa-solid", "text-red-500");
            } else {
                heart.classList.remove("fa-solid", "text-red-500");
                heart.classList.add("fa-regular");
            }
        });
    });
}

like(listLikesProducts);

// Fonction pour supprimer un article du panier
let idnItems = document.getElementById("nItems");
let nItems = parseInt(idnItems.textContent);
function removeItem() {
    let listRemoveProducts = recuplist('remove-');
    Array.from(listRemoveProducts).forEach((removeButton, j) => {
        removeButton.addEventListener("click", () => {
            // Récupére l'élément à supprimer
            let item = removeButton.parentNode.parentElement;
            // On remet la quantité du produit à supprimer pour avoir un total dee la commande exact
            let idName = 'quantity-' + j;
            let newqty = document.getElementsByClassName(idName);
            let q = newqty.value = 0;
            // Mise à jour du nombre de produits dans le panier
            nItems--;
            idnItems.innerHTML = nItems;
            idName = '';
            // Recalcul des prix
            getNewPrice(q, j);
            display_price_total();
            // Suppression de l'article du DOM
            item.remove();
        });
    });
}-

removeItem();

// Fonction pour gérer l'augmentation/diminution de la quantité d'un produit
function qtyUpgrade(lisDisplayqty) {
    Array.from(lisDisplayqty).forEach((qty, i) => {
        //Récupére les buttons +/-
        let buttons = qty.getElementsByTagName('i');
        // récupére l'input nombre pour avoir la quantité
        let quantity = qty.getElementsByTagName('input');
        // Récupère la liste des sous-total
        let listSubTotal = recuplist('subTotal-');
        //button +
        let addProductButton = buttons[1];
        //button -
        let removeProductButton = buttons[0];
        // quantité
        let p = 0;

        addProductButton.addEventListener("click", () => {
            p = ++quantity[0].value;
            getNewPrice(p, i);
            display_price_total(listSubTotal);
        });

        removeProductButton.addEventListener("click", () => {
            if (quantity[0].value > 0) {
                p = --quantity[0].value;
            } else {
                p = quantity[0].value = 0;
            }
            getNewPrice(p, i);
            display_price_total();
        });
    });
}

let listPrices = recuplist('price-');

// Fonction pour calculer le nouveau prix en fonction de la quantité
function getNewPrice(q, i) {
    let p = parseInt(listPrices[i].textContent);
    let subtotal = p * q;
    listSubTotal[i].textContent = subtotal.toString();
}

// Fonction pour afficher le prix total
function display_price_total() {
    let total = document.getElementById('total');
    let t = 0;

    // Calcul du prix total en additionnant les sous-totaux
    for (let j = 0; j < listSubTotal.length; j++) {
        t += parseInt(listSubTotal[j].textContent);
    }

    t += 2000;  // Ajout des frais de livraison

    // Affichage du prix total
    if (t <= 2000) {
        total.innerHTML = '0';
    } else {
        total.innerHTML = t.toString();
    }
}

let listSubTotal = recuplist('subTotal-');
display_price_total();
qtyUpgrade(lisDisplayqty);
