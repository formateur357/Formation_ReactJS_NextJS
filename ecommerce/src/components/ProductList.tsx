import { useMemo, useState } from "react";
import type { Category, Product } from "../types/Product";
import { products } from "../data/products";
import { ProductCard } from "./ProductCard";

export default function ProductList() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState<Category | "">("");

    const filteredProducts: Product[] = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());

            const matchesCategory = category === "" || product.category === category;

            return matchesSearch && matchesCategory;
        });
    }, [search, category]);

    return (
        <section>
            <h2>Catalogue</h2>
            <div className="filters">
                <input
                    type="text"
                    placeholder="Rechercher..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category | "")}
                >
                    <option value="">Toutes les catégories</option>
                    <option value="ordinateur">Ordinateurs</option>
                    <option value="smartphone">SmartPhone</option>
                    <option value="audio">Audio</option>
                </select>
            </div>

            {filteredProducts.length === 0 ? (
                <p>Aucun produit trouvé.</p>
            ) : (
                <div className="products">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}

        </section>
    );
}