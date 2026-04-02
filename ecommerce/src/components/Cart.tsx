import { useShopStore } from "../store/useShopStore";
import { formatPrice } from "../utils/formatPrice";

export default function Cart() {

    const cart = useShopStore((state) => state.cart);
    const removeFromCart = useShopStore((state) => state.removeFromCart);
    const incrementQuantity = useShopStore((state) => state.incrementQuantity);
    const decrementQuantity = useShopStore((state) => state.decrementQuantity);
    const getTotal = useShopStore((state) => state.getTotal);
    const getCartItemCount = useShopStore((state) => state.getCartItemCount);
    return (
        <aside>
            <h2>Panier</h2>

            <p>
                <strong>Article  :</strong> {getCartItemCount()}
            </p>

            {cart.length === 0 ? (
                <p>Votre panier est vide.</p>
            ) : (
                <>
                    <ul className="cart-list">
                        
                    </ul>
                    {cart.map((product) => (
                        <li key={product.id} className="cart-item">
                            <div>
                                <strong>{product.name}</strong>
                                <p>Prix unitaire : {formatPrice(product.price)}</p>
                                <p>Quantité : {product.quantity}</p>
                                <p>Sous-total : {formatPrice(product.price * product.quantity)}</p>
                            </div>

                            <div className="cart-actions">
                                <button onClick={() => decrementQuantity(product.id)}>-</button>
                                <button onClick={() => incrementQuantity(product.id)}>+</button>
                                <button onClick={() => removeFromCart(product.id)}>Supprimer</button>
                            </div>
                        </li>
                    ))}
                    <h3>Total : {formatPrice(getTotal())} €</h3>
                </>
            )}
        </aside>
    );
}