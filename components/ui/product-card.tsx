"use client"

import Image from "next/image";
import { Expand, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";

import { Product } from "@/types";
import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import usePreviewModal from "@/hooks/use-preview-modal";
import useCart from "@/hooks/use-cart";
import { Badge } from "./badge";
import toast from "react-hot-toast";

export interface ProductCardProps {

    data: Product;

}

const ProductCard : React.FC< ProductCardProps > = ({
    data
}) => {

    const previewModal =  usePreviewModal();
    const router = useRouter();
    const cart = useCart();
    
    const handleClick = () => {
        router.push(`/product/${data?.id}`);
    }

    const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();

        previewModal.onOpen(data);
    }

    const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {

        if( data.amount <= 0 ){
            toast.error("Ya no se puede comprar este producto");
            return;
        }

        event.stopPropagation();

        cart.addItem(data);
    }

    

    return (  

        <div onClick={handleClick} className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
            
            <div className="aspect-square rounded-xl bg-gray-100 relative">

                <Image 
                    alt="Image"
                    src={data.images?.[0]?.url}
                    fill
                    className="aspect-square object-cover rounded-md"
                />

                <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">

                    <div className="flex gap-x-6 justify-center">
                        
                        <IconButton onClick={onPreview} icon={<Expand size={20} className="text-gray-600" />}/> 
                        <IconButton onClick={onAddToCart} icon={<ShoppingCart size={20} className="text-gray-600" />}/> 

                    </div>

                </div>

            </div>
            {/* Description */}
            <div className="font-semibold text-lg">
                <p>
                    {data.name}
                </p>
                {data.amount <= 0 && (
                        <Badge variant="outline" className="text-red-500">Sold Out</Badge>
                    )}
                <p className="text-sm text-gray-500">
                    {data.category?.name}
                </p>
            </div>
            {/* Price */}
            <div className="flex items-center">
                {data.wholesalePrice !== data.price ? (
                <>
                    <Currency value={data.price} /> - <Currency value={data.wholesalePrice} />
                </>
                ) : (
                <Currency value={data.price} />
                )}
            </div>

        </div>

     );
}
 
export default ProductCard;