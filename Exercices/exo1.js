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
]

const getCustomerSummary = ({}) => {

}