// Exercice 1
// Alias : donné du sens métier
type TicketId = number;
type UserId = number;

// Union de types : restreint les valeurs possibles
type TicketStatus = 'open' | 'closed' | 'in_progress';

// Interface Ticket : structure d'un ticket
interface Ticket {
    id: TicketId;
    title: string;
    status: TicketStatus;
    UserId: UserId;
}

// Fonction de formatage
function getTicketLabel(ticket: Ticket): string {
    return `Ticket #${ticket.id} - [${ticket.status}] - ${ticket.title} `;
}

// fonction de logique métier : vérification de l'état du ticket
function isTicketOpen(ticket: Ticket): boolean {
    return ticket.status === 'open';
}

// Exercice 2

// interface de base
interface BaseUser {
    id: number;
    name: string;
}

// Heritage de types : extension d'une interface
interface Customer extends BaseUser {
    role: 'customer'; // discriminant pour différencier les types
    email: string;
}

interface SupportAgent extends BaseUser {
    role: 'agent'; // discriminant pour différencier les types
    skills: string[];
}

// Union de types : un utilisateur peut être soit un client, soit un agent
type User = Customer | SupportAgent;

// Fonction de traitement des utilisateurs
function getUserDescription(user: User): string {
    if (user.role === 'customer') {
        return `Customer: ${user.name} (Email: ${user.email})`;
    }

    // Ici typescript sait que user est un SupportAgent grâce au discriminant 'role'
    return `Support Agent: ${user.name} (Compétences: ${user.skills.join(', ')})`;
}

// Exercice 3

// Type techniques
type TimeStamped = {
    createdAt: Date;
};

type WithPriority = {
    priority: 'low' | 'medium' | 'high';
};

// Intersection de types : combine plusieurs types en un seul
type DetailedTicket = Ticket & TimeStamped & WithPriority;

// Objet concret de type DetailedTicket
const detailedTicket: DetailedTicket = {
    id: 1,
    title: 'Problème de connexion',
    status: 'open',
    UserId: 123,
    createdAt: new Date(),
    priority: 'high',
};

function getDetailedTicketLabel(ticket: DetailedTicket): string {
    return `Ticket #${ticket.id} - Priority: ${ticket.priority} - Status: ${ticket.status} - Créé le ${ticket.createdAt.toLocaleString()}`;
}

// Bonus

function assignTicket(
    ticket: DetailedTicket,
    agent: SupportAgent,
) : DetailedTicket {
    return (
        ...ticket,
        // On pourrait ajouter une propriété 'assignedTo' pour indiquer à quel agent le ticket est assigné
        assignedTo: agent.id,
    );
}