import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { Product } from "@/types";
import toast from "react-hot-toast";


interface CartStore {
    items: Product[];
    addItem: (data: Product) => void;
    removeItem: (id: string) => void;
    removeAll: () => void;
    updateItem: (id: string, quantity: number) => void;
  }
  
  const useCart = create(
    persist<CartStore>(
      (set, get) => ({
        items: [],
        addItem: (data: Product) => {
          const currentItems = get().items;
          const existingItem = currentItems.find((item) => item.id === data.id);
  
          if (existingItem) {
            set({
              items: currentItems.map((item) =>
                item.id === data.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            });
            toast.success("Se aumento el valor del articulo en el carrito");
          } else {
            set({
              items: [...currentItems, { ...data, quantity: 1 }],
            });
            toast.success("Artículo agregado al carrito");
          }
        },
        removeItem: (id: string) => {
          set({
            items: [...get().items.filter((item) => item.id !== id)],
          });
          toast.success("Artículo eliminado del carrito");
        },
        removeAll: () => set({ items: [] }),
        updateItem: (id: string, quantity: number) => {
          set({
            items: get().items.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
          });
        },
      }),
      {
        name: "cart-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  );
  
  export default useCart;