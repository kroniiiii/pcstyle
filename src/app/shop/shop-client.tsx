"use client";
// ============================================================
// Dyqani - kërkim, filtrim sipas kategorisë/çmimit/markës, renditje
// ============================================================
import { useCallback, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SlidersHorizontal, X, Loader2 } from "lucide-react";
import { ProductCard, type ProductCardData } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type Category = { id: string; name: string; slug: string };

export function ShopClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<ProductCardData[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Filtrat nga URL
  const q = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "";
  const brand = searchParams.get("brand") ?? "";
  const minPrice = searchParams.get("minPrice") ?? "";
  const maxPrice = searchParams.get("maxPrice") ?? "";
  const sort = searchParams.get("sort") ?? "newest";
  const page = Number(searchParams.get("page") ?? 1);

  const setParam = useCallback((updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([k, v]) => (v ? params.set(k, v) : params.delete(k)));
    if (!("page" in updates)) params.delete("page"); // rikthe në faqen 1 kur ndryshon filtri
    router.push(`/shop?${params.toString()}`);
  }, [router, searchParams]);

  // Merr kategoritë një herë
  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then(setCategories)
      .catch(() => {});
  }, []);

  // Merr produktet sa herë ndryshojnë filtrat
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (category) params.set("category", category);
    if (brand) params.set("brand", brand);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (sort) params.set("sort", sort);
    params.set("page", String(page));

    fetch(`/api/products?${params.toString()}`)
      .then((r) => r.json())
      .then((d) => {
        setProducts(d.products ?? []);
        setTotal(d.total ?? 0);
        setTotalPages(d.totalPages ?? 1);
        if (d.brands) setBrands(d.brands);
      })
      .finally(() => setLoading(false));
  }, [q, category, brand, minPrice, maxPrice, sort, page]);

  const hasFilters = q || category || brand || minPrice || maxPrice;

  const Filters = (
    <div className="space-y-5">
      <div>
        <Label htmlFor="f-cat">Kategoria</Label>
        <Select id="f-cat" value={category} onChange={(e) => setParam({ category: e.target.value })}>
          <option value="">Të gjitha</option>
          {categories.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
        </Select>
      </div>
      <div>
        <Label htmlFor="f-brand">Marka</Label>
        <Select id="f-brand" value={brand} onChange={(e) => setParam({ brand: e.target.value })}>
          <option value="">Të gjitha</option>
          {brands.map((b) => <option key={b} value={b}>{b}</option>)}
        </Select>
      </div>
      <div>
        <Label>Çmimi (€)</Label>
        <div className="flex items-center gap-2">
          <Input type="number" min={0} placeholder="Nga" defaultValue={minPrice}
            onBlur={(e) => setParam({ minPrice: e.target.value })} />
          <span className="text-mist">–</span>
          <Input type="number" min={0} placeholder="Deri" defaultValue={maxPrice}
            onBlur={(e) => setParam({ maxPrice: e.target.value })} />
        </div>
      </div>
      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={() => router.push("/shop")} className="w-full">
          <X className="h-4 w-4" /> Pastro filtrat
        </Button>
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-electric">PC-STYLE</p>
          <h1 className="mt-1 font-display text-3xl font-bold text-frost">
            {q ? `Rezultatet për "${q}"` : "Dyqani"}
          </h1>
          <p className="mt-1 text-sm text-mist">{total} produkte të gjetura</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="lg:hidden" onClick={() => setShowFilters((v) => !v)}>
            <SlidersHorizontal className="h-4 w-4" /> Filtrat
          </Button>
          <Select value={sort} onChange={(e) => setParam({ sort: e.target.value })} className="w-44">
            <option value="newest">Më të rejat</option>
            <option value="price-asc">Çmimi: i ulët → i lartë</option>
            <option value="price-desc">Çmimi: i lartë → i ulët</option>
            <option value="name">Emri (A-Z)</option>
          </Select>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        {/* Filtrat - sidebar desktop */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-xl border border-steel bg-carbon p-5">
            <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-frost">Filtrat</h2>
            {Filters}
          </div>
        </aside>

        {/* Filtrat - mobile */}
        {showFilters && (
          <div className="rounded-xl border border-steel bg-carbon p-5 lg:hidden animate-fade-up">{Filters}</div>
        )}

        {/* Rrjeti i produkteve */}
        <div>
          {loading ? (
            <div className="flex items-center justify-center py-32 text-mist">
              <Loader2 className="h-7 w-7 animate-spin text-electric" />
            </div>
          ) : products.length === 0 ? (
            <div className="rounded-xl border border-steel bg-carbon py-24 text-center">
              <p className="text-lg font-semibold text-frost">Asnjë produkt nuk u gjet</p>
              <p className="mt-1 text-sm text-mist">Provo të ndryshosh filtrat ose termin e kërkimit.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
                {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
              </div>
              {/* Paginimi */}
              {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      onClick={() => setParam({ page: String(n) })}
                      className={`h-9 w-9 rounded-lg text-sm font-semibold transition-colors ${
                        n === page ? "bg-electric text-white shadow-glow-sm" : "border border-steel text-mist hover:border-electric hover:text-volt"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
