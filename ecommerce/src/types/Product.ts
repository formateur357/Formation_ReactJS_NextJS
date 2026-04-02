export type Category = "ordinateur" | "smartphone" | "audio";

export type Product = {
  id: number;
  name: string;
  price: number;
  category: Category;
  image: string;
}

export type CartItem = Product & {
  quantity: number;
}