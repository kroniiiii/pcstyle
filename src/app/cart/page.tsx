"use client";
// ============================================================
// Shporta - shto/hiq/ndrysho sasinë
// ============================================================
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, count } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-28 text-center">
        <ShoppingBag className="mx-auto h-14 w-14 text-steel" />
        <h1 className="mt-5 font-display text-2xl font-bold text-frost">Shporta juaj është bosh</h1>
        <p className="mt-2 text-mist">Shto disa produkte nga dyqani për të vazhduar.</p>
        <Link href="/shop" className="mt-7 inline-block">
          <Button size="lg">Shko te Dyqani <ArrowRight className="h-4 w-4" /></Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-frost">Shporta <span className="text-base font-normal text-mist">({count} artikuj)</span></h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Artikujt */}
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.productId} className="flex gap-4 rounded-xl border border-steel bg-carbon p-4">
              <Link href={`/product/${item.slug}`} className="relative h-24 w-28 shrink-0 overflow-hidden rounded-lg bg-steel/30">
                <Image src={item.image} alt={item.name} fill sizes="120px" className="object-cover" />
              </Link>
              <div className="flex flex-1 flex-col">
                <Link href={`/product/${item.slug}`} className="line-clamp-2 text-sm font-semibold text-frost hover:text-volt">
                  {item.name}
                </Link>
                <p className="mt-1 text-sm text-volt font-semibold">{formatPrice(item.price)}</p>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <div className="flex items-center rounded-lg border border-steel">
                    <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="p-2 text-mist hover:text-frost" aria-label="Zvogëlo">
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-9 text-center text-sm font-semibold text-frost">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="p-2 text-mist hover:text-frost" aria-label="Rrit">
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-sm font-bold text-frost">{formatPrice(item.price * item.quantity)}</p>
                    <button onClick={() => removeItem(item.productId)} className="text-mist hover:text-red-400 transition-colors" aria-label="Hiq nga shporta">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Përmbledhja */}
        <aside className="h-fit rounded-xl border border-steel bg-carbon p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-lg font-bold text-frost">Përmbledhja e Porosisë</h2>
          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between text-mist"><span>Nëntotali</span><span>{formatPrice(total)}</span></div>
            <div className="flex justify-between text-mist"><span>Dërgesa</span><span className="text-green-400">Falas</span></div>
            <div className="border-t border-steel pt-3 flex justify-between text-base font-bold text-frost">
              <span>Totali</span><span>{formatPrice(total)}</span>
            </div>
          </div>
          <Link href="/checkout" className="mt-6 block">
            <Button size="lg" className="w-full">Vazhdo me Pagesën <ArrowRight className="h-4 w-4" /></Button>
          </Link>
          <Link href="/shop" className="mt-3 block text-center text-sm text-mist hover:text-volt">
            ← Vazhdo blerjet
          </Link>
        </aside>
      </div>
    </div>
  );
}
