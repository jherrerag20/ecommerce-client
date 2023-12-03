"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import toast from "react-hot-toast";
import { OrderForm } from "./oderForm";

const Summary = () => {

    const [showOrderForm, setShowOrderForm] = useState(false);
    const searchParams = useSearchParams();
    const items = useCart((state) => state.items);
    const removeAll = useCart((state) => state.removeAll);

    useEffect(() => {
        if (searchParams.get("success")) {
            toast.success("Orden completada");
            removeAll();
        }

        if (searchParams.get("canceled")) {
            toast.success("Error, algo salió mal");
        }
    }, [searchParams, removeAll]);

    const totalPrice = items.reduce((total, item) => {
        const displayPrice = item.quantity >= item.amount_wholesalePrice ? item.wholesalePrice : item.price;
        return total + displayPrice * item.quantity;
    }, 0);

    const isCheckoutDisabled = totalPrice <= 0 || totalPrice < 1000;

    const onCheckout = () => {
        setShowOrderForm(true);
    };

    const sendOrder = ( data: { number: string; state: string; fullName: string; phoneNumber: string; street: string; neighborhood: string; postalCode: string; city: string; deliveryType: "Sucursal" | "Envío"; references?: string | undefined; } ) => {
        
    }

    const sendToWhatsapp = async (data: { number: string; state: string; fullName: string; phoneNumber: string; street: string; neighborhood: string; postalCode: string; city: string; deliveryType: "Sucursal" | "Envío"; references?: string | undefined; }) => {
        
        const phoneNumber = '525511946091'; // Número de WhatsApp
        const whatsappMessage = encodeURIComponent(`Resumen de mi pedido:\n\nArtículos:\n${items.map(item => `${item.name}(${item.quantity})`).join(', ')}\n\nDatos:\nNombre: ${data.fullName}\nEstado: ${data.state}\nCiudad: ${data.city}\nCalle: ${data.street}\nNúmero: ${data.number}\nColonia: ${data.neighborhood}\nCódigo Postal: ${data.postalCode}\nTipo de entrega: ${data.deliveryType}\nReferencias: ${data.references || 'N/A'}`);

        const whatsappLink = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

        // Abrir el enlace de WhatsApp en una nueva ventana
        window.open(whatsappLink, '_blank');
        
    };

    return (
        <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 className="text-lg font-medium text-gray-900">Resumen de Orden (Monto minimo: $1000 MXN)</h2>
            <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="text-base font-medium text-gray-900">Total de la orden:</div>
                    <Currency value={totalPrice} />
                </div>
            </div>
            {!showOrderForm && (
                <Button onClick={onCheckout} className={`w-full mt-6 ${isCheckoutDisabled ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isCheckoutDisabled}>
                    Checkout
                </Button>
            )}

            {showOrderForm && (
                <OrderForm
                onSubmit={(data) => {
                    toast.success("Pedido realizado con éxito");
                    removeAll(); // Limpiar el carrito después de realizar el pedido
                    setShowOrderForm(false); // Ocultar el formulario después de la presentación
                    sendOrder( data );
                    sendToWhatsapp( data );
                }}
                />
            )}

        </div>
    );
};

export default Summary;
