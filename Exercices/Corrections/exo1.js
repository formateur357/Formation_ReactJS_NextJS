// Tableau principal contenant nos clients.
// Chaque client possède :
// - un id
// - un prénom
// - un nom
// - un email
// - une liste de commandes
const customers = [
    {
        id: 1,
        firstName: "Alice",
        lastName: "Martin",
        email: "alice@email.com",
        orders: [
            { id: 101, total: 120, status: "paid" },
            { id: 102, total: 80, status: "pending" }
        ]
    },
    {
        id: 2,
        firstName: "Bob",
        lastName: "Durand",
        email: "bob@email.com",
        orders: [
            { id: 103, total: 50, status: "paid" }
        ]
    },
    {
        id: 3,
        firstName: "Charlie",
        lastName: "Petit",
        email: "charlie@email.com",
        orders: []
    }
];


// ======================================================
// 1) Résumé d'un client
// ======================================================

// Cette fonction reçoit un objet "customer" en paramètre,
// mais on utilise directement la DESTRUCTURATION dans la signature.
// Au lieu d'écrire customer.firstName, customer.lastName, etc.,
// on extrait immédiatement les propriétés utiles.
const getCustomerSummary = ({ firstName, lastName, orders }) => {

    // Si le client n'a aucune commande,
    // on retourne un message adapté.
    if (orders.length === 0) {
        return `${firstName} ${lastName} n'a passé aucune commande.`;
    }

    // On utilise reduce pour calculer le montant total dépensé.
    // "total" est l'accumulateur.
    // "order" représente la commande courante.
    // On additionne à chaque fois la propriété order.total.
    // Le 0 final est la valeur initiale de l'accumulateur.
    const totalSpent = orders.reduce((total, order) => total + order.total, 0);

    // On utilise ici un template literal pour construire une phrase lisible.
    return `${firstName} ${lastName} a passé ${orders.length} commande(s) pour un total de ${totalSpent} euros.`;
};


// ======================================================
// 2) Mettre à jour le statut d'une commande
// ======================================================

// Cette fonction doit modifier le statut d'une commande
// SANS modifier directement les données d'origine.
// C'est ce qu'on appelle travailler en IMMUTABILITÉ.
//
// Paramètres :
// - customers : tableau complet des clients
// - customerId : id du client à cibler
// - orderId : id de la commande à modifier
// - newStatus : nouveau statut à appliquer
const updateOrderStatus = (
    customers,
    customerId,
    orderId,
    newStatus
) =>
    // On parcourt le tableau customers avec map.
    // map retourne un NOUVEAU tableau.
    customers.map(customer => {

        // Si ce client n'est pas celui recherché,
        // on le retourne tel quel.
        if (customer.id !== customerId) {
            return customer;
        }

        // Si on a trouvé le bon client,
        // on retourne une COPIE de l'objet customer
        // grâce au spread operator (...customer).
        return {
            ...customer,

            // On remplace la propriété orders par un nouveau tableau.
            // Encore une fois, on utilise map pour recréer le tableau.
            orders: customer.orders.map(order =>
                // Si c'est la commande à modifier :
                order.id === orderId
                    ? {
                        // On copie la commande existante
                        ...order,
                        // puis on remplace seulement son statut
                        status: newStatus
                    }
                    // Sinon, on retourne la commande inchangée.
                    : order
            )
        };

    });


// ======================================================
// 3) Ajouter plusieurs commandes à un client
// ======================================================

// Cette fonction ajoute une ou plusieurs commandes à un client,
// toujours sans modifier directement les données d'origine.
//
// Le paramètre ...newOrders utilise le REST OPERATOR.
// Cela signifie que toutes les commandes supplémentaires
// passées à la fonction seront regroupées dans un tableau.
const addOrders = (
    customers,
    customerId,
    ...newOrders
) =>
    customers.map(customer => {

        // Si ce n'est pas le bon client, on le laisse inchangé.
        if (customer.id !== customerId) {
            return customer;
        }

        // Si c'est le bon client, on retourne une copie.
        return {
            ...customer,

            // On recrée le tableau orders.
            // Le spread operator permet ici de fusionner :
            // - les anciennes commandes
            // - les nouvelles commandes
            orders: [
                ...customer.orders,
                ...newOrders
            ]
        };

    });


// ======================================================
// 4) Calculer des statistiques globales
// ======================================================

// Cette fonction calcule plusieurs statistiques
// sur l'ensemble des commandes de tous les clients.
const getGlobalStats = customers => {

    // flatMap permet :
    // 1) de parcourir chaque client
    // 2) de récupérer son tableau orders
    // 3) d'aplatir tous les tableaux en un seul grand tableau
    //
    // Résultat : allOrders contient toutes les commandes de tous les clients.
    const allOrders = customers.flatMap(
        customer => customer.orders
    );

    // On retourne un objet contenant plusieurs statistiques.
    return {

        // Nombre total de commandes
        totalOrders: allOrders.length,

        // Chiffre d'affaires total
        // On additionne tous les montants.
        totalRevenue: allOrders.reduce(
            (sum, order) => sum + order.total,
            0
        ),

        // Nombre de commandes payées
        paidOrders: allOrders.filter(
            order => order.status === "paid"
        ).length,

        // Nombre de commandes en attente
        pendingOrders: allOrders.filter(
            order => order.status === "pending"
        ).length

    };

};


// ======================================================
// 5) Trouver les clients ayant de grosses commandes
// ======================================================

// Cette fonction retourne une liste de messages
// pour les commandes dont le montant dépasse minAmount.
const getCustomersWithHighValueOrders = (customers, minAmount) =>

    // On utilise flatMap car :
    // - pour chaque client, on veut potentiellement plusieurs résultats
    // - on veut un seul tableau final à plat
    customers.flatMap(
        // On destructure directement le client
        ({ firstName, lastName, orders }) =>

            orders
                // On garde uniquement les commandes
                // dont le total dépasse le seuil demandé.
                .filter(
                    ({ total }) => total > minAmount
                )
                // Puis on transforme chaque commande retenue
                // en message texte.
                .map(
                    ({ total }) =>
                        `${firstName} ${lastName} a une commande de ${total} €`
                )
    );


// ======================================================
// 6) Transformer un client en objet résumé
// ======================================================

// Cette fonction transforme un client complet
// en un objet plus simple, souvent utile pour l'affichage
// ou pour construire une réponse d'API.
const transformCustomer = customer => {

    // Ici on utilise la destructuration sur objet.
    // On extrait :
    // - firstName
    // - lastName
    // - orders
    //
    // ...rest récupère toutes les autres propriétés restantes
    // dans un nouvel objet.
    const {
        firstName,
        lastName,
        orders,
        ...rest
    } = customer;

    // On calcule le montant total dépensé
    // en additionnant toutes les commandes.
    //
    // Ici on destructure directement { total }
    // dans le paramètre de la fonction callback.
    const totalSpent = orders.reduce(
        (sum, { total }) => sum + total,
        0
    );

    // On retourne un nouvel objet transformé.
    return {

        // On réinjecte les propriétés restantes
        // comme id et email.
        ...rest,

        // On crée une nouvelle propriété fullName
        // à partir du prénom et du nom.
        fullName: `${firstName} ${lastName}`,

        // Nombre total de commandes
        totalOrders: orders.length,

        // Total dépensé
        totalSpent

    };

};