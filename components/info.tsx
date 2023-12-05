"use client";

import { ShoppingCart } from "lucide-react";

import Currency  from "@/components/ui/currency";
import Button from "@/components/ui/button";
import { Product } from "@/types";
import useCart from "@/hooks/use-cart";
import toast from "react-hot-toast";
import { Badge } from "./ui/badge";

interface InfoProps {
  data: Product
};

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();

  const onAddToCart = () => {
    if( data.amount <= 0 ){
      toast.error("Ya no se puede comprar este producto");
      return;
    }
    cart.addItem(data);
  }

  return ( 
    <div>
      <h1 className="text-3xl font-bold text-gray-900">
        {data.name}
        {data.amount <= 0 && (
          <Badge variant="outline" className="text-red-500 text-lg sm:text-sm">Sold Out</Badge>
        )}
      </h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900 flex">
          {data.wholesalePrice !== data.price ? (
                <>
                    <Currency value={data.price} /> - <Currency value={data.wholesalePrice} />
                </>
                ) : (
                <Currency value={data.price} />
          )}
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Size:</h3>
          <div>
            {data?.size?.value}
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Color:</h3>
          <div className="h-6 w-6 rounded-full border border-gray-600" style={{ backgroundColor: data?.color?.value }} />
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Cantidad para considerar mayoreo:</h3>
          <div>
            {data?.amount_wholesalePrice}
          </div>
        </div>
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button onClick={onAddToCart} className="flex items-center gap-x-2">
          Add To Cart
          <ShoppingCart size={20} />
        </Button>
      </div>
    </div>
  );
}
 
export default Info;