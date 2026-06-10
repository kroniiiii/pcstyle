"use client";
// Kartela e produktit - përdoret në Home dhe Shop
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, PackageX } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/components/cart/CartProvider";
import { Badge } from "@/components/ui/badge";

export type ProductCardData = {
  id: string; name: string; slug: string; brand: string;
  price: string | number; oldPrice?: string | number | null;
  images: string[]; stock: number;
  category?: { name: string } | null;
};

export function ProductCard({ product, index = 0 }: { product: ProductCardData; index?: number }) {
  const { addItem } = useCart();
  const price = Number(product.price);
  const oldPrice = product.oldPrice ? Number(product.oldPrice) : null;
  const discount = oldPrice ? Math.round((1 - price / oldPrice) * 100) : null;
  const out = product.stock <= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-steel bg-carbon transition-all duration-300 hover:border-electric/60 hover:shadow-glow-sm"
    >
      <Link href={`/product/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-steel/30">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {discount && (
          <Badge className="absolute left-3 top-3 border-electric/40 bg-electric text-white shadow-glow-sm">-{discount}%</Badge>
        )}
        {out && (
          <Badge className="absolute right-3 top-3 border-red-500/40 bg-red-600/90 text-white">Pa stok</Badge>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-electric">{product.brand}</p>
        <Link href={`/product/${product.slug}`} className="mt-1 line-clamp-2 text-sm font-semibold text-frost transition-colors hover:text-volt">
          {product.name}
        </Link>
        {product.category && <p className="mt-1 text-xs text-mist">{product.category.name}</p>}

        <div className="mt-auto flex items-end justify-between pt-4">
          <div>
            {oldPrice && <p className="text-xs text-mist line-through">{formatPrice(oldPrice)}</p>}
            <p className="font-display text-lg font-bold text-frost">{formatPrice(price)}</p>
          </div>
          <button
            onClick={() =>
              !out &&
              addItem({
                productId: product.id, name: product.name, slug: product.slug,
                price, image: product.images[0], stock: product.stock,
              })
            }
            disabled={out}
            aria-label={out ? "Pa stok" : "Shto në shportë"}
            className="rounded-lg bg-electric/15 p-2.5 text-volt transition-all hover:bg-electric hover:text-white hover:shadow-glow-sm disabled:opacity-40 disabled:pointer-events-none"
          >
            {out ? <PackageX className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
