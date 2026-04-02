import type { Product } from "../types/Product";

export const products: Product[] = [
    {
        id: 1,
        name: "Ordinateur portable",
        price: 1000,
        category: "ordinateur",
        image: "/images/laptop.jpg"
    },
    {
        id: 2,
        name: "Smartphone",
        price: 500,
        category: "smartphone",
        image: "/images/smartphone.jpg"
    },
    {
        id: 3,
        name: "Casque audio",
        price: 200,
        category: "audio",
        image: "/images/headphones.jpg"
    },
    {
        id: 4,
        name: "Tablette",
        price: 300,
        category: "ordinateur",
        image: "/images/tablet.jpg"
    },
    {
        id: 5,
        name: "Enceinte Bluetooth",
        price: 150,
        category: "audio",
        image: "/images/speaker.jpg"
    },
    {
        id: 6,
        name: "Moniteur",
        price: 400,
        category: "ordinateur",
        image: "/images/monitor.jpg"
    },
    {
        id: 7,
        name: "Clé USB",
        price: 20,
        category: "ordinateur",
        image: "/images/usb-stick.jpg"
    }
]