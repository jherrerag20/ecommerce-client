"use client";

import { useState } from 'react';
import { Product } from "@/types";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";

interface ProductListProps {
    title: string;
    items: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ title, items }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    // Filtrar elementos basados en el término de búsqueda
    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-4">
            <h3 className="font-bold text-3xl">{title}</h3>
            {items.length === 0 && <NoResults />}

            {/* Agrega un campo de búsqueda */}
            <input
                type="text"
                placeholder="Buscar producto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border p-2 rounded w-full"
            />

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Muestra los elementos filtrados en lugar de todos los elementos */}
                {filteredItems.length === 0 ? (
                    <NoResults />
                ) : (
                    filteredItems.map((item) => (
                        <ProductCard key={item.id} data={item} />
                    ))
                )}
            </div>
        </div>
    );
};

export default ProductList;
