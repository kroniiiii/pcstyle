"use client";
// Butoni "Shto në shportë" me zgjedhje sasie
import { useState } from "react";
import { Minus, Plus, ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/CartProvider";

type Props = {
  product: { id: string; name: string; slug: string; price: number; image: string; stock: number };
};

export function AddToCart({ product }: Props) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const out = product.stock <= 0;

  const add = () => {
    addItem({ productId: product.id, name: product.name, slug: product.slug, price: product.price, image: product.image, stock: product.stock }, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center rounded-lg border border-steel">
        <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-2.5 text-mist hover:text-frost" aria-label="Zvogëlo sasinë">
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-10 text-center text-sm font-semibold text-frost">{qty}</span>
        <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))} className="p-2.5 text-mist hover:text-frost" aria-label="Rrit sasinë">
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <Button size="lg" onClick={add} disabled={out} className="flex-1 sm:flex-none">
        {added ? <><Check className="h-4 w-4" /> U shtua!</> : <><ShoppingCart className="h-4 w-4" /> {out ? "Pa stok" : "Shto në shportë"}</>}
      </Button>
    </div>
  );
}
