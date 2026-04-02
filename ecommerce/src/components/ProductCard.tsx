import type { Product } from "../types/Product";
import { formatPrice } from "../utils/formatPrice";
import { useShopStore } from "../store/useShopStore";

type ProductCardProps = {
    product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
    const addToCart = useShopStore((state) => state.addToCart);

    return (
        <article className="Card">
            <img className="product-image" src={product.image} alt={product.name} />

            <h2>{product.name}</h2>
            <p><strong>Catégorie :</strong> {product.category}</p>
            <p><strong>Prix :</strong>${formatPrice(product.price)}</p>

            <button onClick={() => addToCart({ ...product, quantity: 1 })}>Ajouter au Panier</button>
        </article>
    )
}