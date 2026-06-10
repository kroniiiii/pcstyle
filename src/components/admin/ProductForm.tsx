"use client";
// ============================================================
// Forma e produktit - përdoret për Add dhe Edit (admin)
// Foto me URL (upload-i i file-ve mund të shtohet me UploadThing/S3)
// ============================================================
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, Trash2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type Category = { id: string; name: string };
type Spec = { key: string; value: string };

export type ProductFormData = {
  id?: string;
  name: string; description: string; price: string; oldPrice: string;
  brand: string; stock: string; categoryId: string;
  images: string[]; specs: Record<string, string>; featured: boolean;
};

const EMPTY: ProductFormData = {
  name: "", description: "", price: "", oldPrice: "", brand: "",
  stock: "0", categoryId: "", images: [""], specs: {}, featured: false,
};

export function ProductForm({ initial }: { initial?: ProductFormData }) {
  const router = useRouter();
  const isEdit = !!initial?.id;

  const [form, setForm] = useState<ProductFormData>(initial ?? EMPTY);
  const [specs, setSpecs] = useState<Spec[]>(
    initial ? Object.entries(initial.specs).map(([key, value]) => ({ key, value })) : [{ key: "", value: "" }]
  );
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/categories").then((r) => r.json()).then(setCategories).catch(() => {});
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const payload = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
        brand: form.brand,
        stock: Number(form.stock),
        categoryId: form.categoryId,
        images: form.images.filter(Boolean),
        specs: Object.fromEntries(specs.filter((s) => s.key && s.value).map((s) => [s.key, s.value])),
        featured: form.featured,
      };
      const res = await fetch(isEdit ? `/api/products/${initial!.id}` : "/api/products", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Gabim gjatë ruajtjes");
      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gabim i papritur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="rounded-xl border border-steel bg-carbon p-6">
        <h2 className="font-display text-lg font-bold text-frost">Informacionet bazë</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="name">Emri i produktit *</Label>
            <Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="desc">Përshkrimi *</Label>
            <Textarea id="desc" required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Karakteristikat kryesore, avantazhet dhe përdorimet e rekomanduara..." />
          </div>
          <div>
            <Label htmlFor="price">Çmimi (€) *</Label>
            <Input id="price" type="number" step="0.01" min="0" required value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="oldPrice">Çmimi i vjetër (€, për ofertë)</Label>
            <Input id="oldPrice" type="number" step="0.01" min="0" value={form.oldPrice} onChange={(e) => setForm({ ...form, oldPrice: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="brand">Marka *</Label>
            <Input id="brand" required value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="stock">Stoku *</Label>
            <Input id="stock" type="number" min="0" required value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="category">Kategoria *</Label>
            <Select id="category" required value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
              <option value="">Zgjidh kategorinë</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </Select>
          </div>
          <div className="flex items-end pb-2">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-mist">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="h-4 w-4 accent-[#1F6BFF]" />
              Produkt i veçuar (shfaqet në ballinë)
            </label>
          </div>
        </div>
      </div>

      {/* Fotot */}
      <div className="rounded-xl border border-steel bg-carbon p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-frost">Fotot (URL)</h2>
          <Button type="button" variant="outline" size="sm" onClick={() => setForm({ ...form, images: [...form.images, ""] })}>
            <Plus className="h-4 w-4" /> Shto foto
          </Button>
        </div>
        <div className="mt-4 space-y-3">
          {form.images.map((img, i) => (
            <div key={i} className="flex items-center gap-3">
              {img && (
                <div className="relative h-12 w-14 shrink-0 overflow-hidden rounded-md border border-steel bg-steel/30">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </div>
              )}
              <Input
                value={img}
                placeholder="https://..."
                onChange={(e) => {
                  const images = [...form.images];
                  images[i] = e.target.value;
                  setForm({ ...form, images });
                }}
              />
              {form.images.length > 1 && (
                <button type="button" onClick={() => setForm({ ...form, images: form.images.filter((_, x) => x !== i) })}
                  className="shrink-0 text-mist hover:text-red-400" aria-label="Hiq foton">
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Specifikimet */}
      <div className="rounded-xl border border-steel bg-carbon p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-frost">Specifikimet teknike</h2>
          <Button type="button" variant="outline" size="sm" onClick={() => setSpecs([...specs, { key: "", value: "" }])}>
            <Plus className="h-4 w-4" /> Shto specifikim
          </Button>
        </div>
        <div className="mt-4 space-y-3">
          {specs.map((spec, i) => (
            <div key={i} className="flex items-center gap-3">
              <Input value={spec.key} placeholder="p.sh. Procesori"
                onChange={(e) => setSpecs(specs.map((s, x) => (x === i ? { ...s, key: e.target.value } : s)))} />
              <Input value={spec.value} placeholder="p.sh. Intel Core i9"
                onChange={(e) => setSpecs(specs.map((s, x) => (x === i ? { ...s, value: e.target.value } : s)))} />
              <button type="button" onClick={() => setSpecs(specs.filter((_, x) => x !== i))}
                className="shrink-0 text-mist hover:text-red-400" aria-label="Hiq specifikimin">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {error && <p className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">{error}</p>}

      <div className="flex gap-3">
        <Button type="submit" size="lg" disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Save className="h-4 w-4" /> {isEdit ? "Ruaj ndryshimet" : "Shto produktin"}</>}
        </Button>
        <Button type="button" variant="ghost" size="lg" onClick={() => router.back()}>Anulo</Button>
      </div>
    </form>
  );
}
