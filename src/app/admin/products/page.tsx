"use client";
// Admin - Menaxhimi i produkteve (lista, fshirja, stoku)
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";

type Product = {
  id: string; name: string; slug: string; brand: string;
  price: string; stock: number; images: string[];
  category: { name: string };
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    fetch(`/api/products?${q ? `q=${encodeURIComponent(q)}&` : ""}perPage=100`)
      .then((r) => r.json())
      .then((d) => setProducts(d.products ?? []))
      .finally(() => setLoading(false));
  }, [q]);

  useEffect(() => { const t = setTimeout(load, 300); return () => clearTimeout(t); }, [load]);

  const remove = async (id: string, name: string) => {
    if (!confirm(`Fshij produktin "${name}"? Ky veprim nuk kthehet.`)) return;
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) setProducts((p) => p.filter((x) => x.id !== id));
    else alert("Fshirja dështoi (produkti mund të ketë porosi të lidhura).");
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-bold text-frost">Produktet</h1>
        <Link href="/admin/products/new"><Button><Plus className="h-4 w-4" /> Shto Produkt</Button></Link>
      </div>

      <div className="relative mt-5 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mist" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Kërko produkt..." className="pl-10" />
      </div>

      {loading ? (
        <div className="flex justify-center py-24"><Loader2 className="h-7 w-7 animate-spin text-electric" /></div>
      ) : (
        <div className="mt-5 overflow-x-auto rounded-xl border border-steel">
          <table className="w-full min-w-[680px] text-sm">
            <thead className="bg-carbon text-left text-xs uppercase tracking-wider text-mist">
              <tr>
                <th className="px-4 py-3">Produkti</th>
                <th className="px-4 py-3">Kategoria</th>
                <th className="px-4 py-3">Çmimi</th>
                <th className="px-4 py-3">Stoku</th>
                <th className="px-4 py-3 text-right">Veprimet</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t border-steel bg-ink hover:bg-carbon/60">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-12 shrink-0 overflow-hidden rounded-md bg-steel/30">
                        <Image src={p.images[0]} alt="" fill sizes="48px" className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-frost">{p.name}</p>
                        <p className="text-xs text-mist">{p.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-mist">{p.category.name}</td>
                  <td className="px-4 py-3 font-semibold text-frost">{formatPrice(Number(p.price))}</td>
                  <td className="px-4 py-3">
                    <span className={p.stock > 5 ? "text-green-400" : p.stock > 0 ? "text-yellow-400" : "text-red-400"}>
                      {p.stock} copë
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/products/${p.id}`} className="rounded-lg border border-steel p-2 text-mist hover:border-electric hover:text-volt" aria-label="Edito">
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <button onClick={() => remove(p.id, p.name)} className="rounded-lg border border-steel p-2 text-mist hover:border-red-500 hover:text-red-400" aria-label="Fshij">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-12 text-center text-mist">Asnjë produkt.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
