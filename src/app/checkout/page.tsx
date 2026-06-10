"use client";
// ============================================================
// Checkout - forma e dërgesës, krijimi dhe konfirmimi i porosisë
// ============================================================
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type ConfirmedOrder = { orderNumber: string; total: string };

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState<ConfirmedOrder | null>(null);

  const [form, setForm] = useState({
    fullName: session?.user?.name ?? "",
    email: session?.user?.email ?? "",
    phone: "", address: "", city: "", zip: "", note: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Gabim gjatë porosisë");
      clearCart();
      setConfirmed({ orderNumber: data.orderNumber, total: data.total });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gabim i papritur");
    } finally {
      setLoading(false);
    }
  };

  // Ekrani i konfirmimit të porosisë
  if (confirmed) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center animate-fade-up">
        <CheckCircle2 className="mx-auto h-16 w-16 text-green-400" />
        <h1 className="mt-5 font-display text-3xl font-bold text-frost">Porosia u konfirmua! 🎉</h1>
        <p className="mt-3 text-mist">
          Faleminderit për blerjen. Numri i porosisë suaj është{" "}
          <span className="font-mono font-bold text-volt">{confirmed.orderNumber}</span>.
        </p>
        <p className="mt-1 text-sm text-mist">Do të njoftoheni kur porosia të niset.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/dashboard"><Button>Shiko Porositë</Button></Link>
          <Link href="/shop"><Button variant="outline">Vazhdo Blerjet</Button></Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-bold text-frost">Shporta është bosh</h1>
        <Link href="/shop" className="mt-6 inline-block"><Button>Shko te Dyqani</Button></Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-frost">Pagesa</h1>

      <form onSubmit={submit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Forma e dërgesës */}
        <div className="rounded-xl border border-steel bg-carbon p-6">
          <h2 className="font-display text-lg font-bold text-frost">Të dhënat e dërgesës</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="fullName">Emri i plotë *</Label>
              <Input id="fullName" required value={form.fullName} onChange={set("fullName")} placeholder="Filan Fisteku" />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" required value={form.email} onChange={set("email")} placeholder="ju@email.com" />
            </div>
            <div>
              <Label htmlFor="phone">Telefoni *</Label>
              <Input id="phone" required value={form.phone} onChange={set("phone")} placeholder="+383 44 ..." />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="address">Adresa *</Label>
              <Input id="address" required value={form.address} onChange={set("address")} placeholder="Rruga, numri, hyrja" />
            </div>
            <div>
              <Label htmlFor="city">Qyteti *</Label>
              <Input id="city" required value={form.city} onChange={set("city")} placeholder="Prishtinë" />
            </div>
            <div>
              <Label htmlFor="zip">Kodi postar *</Label>
              <Input id="zip" required value={form.zip} onChange={set("zip")} placeholder="10000" />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="note">Shënim (opsionale)</Label>
              <Textarea id="note" value={form.note} onChange={set("note")} placeholder="Udhëzime për dërgesën..." />
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 rounded-lg border border-electric/30 bg-electric/10 p-3 text-xs text-volt">
            <ShieldCheck className="h-4 w-4 shrink-0" />
            Pagesa bëhet me para në dorë (cash) në momentin e dorëzimit. Të dhënat tuaja janë të mbrojtura.
          </div>

          {error && <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">{error}</p>}
        </div>

        {/* Përmbledhja */}
        <aside className="h-fit rounded-xl border border-steel bg-carbon p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-lg font-bold text-frost">Porosia juaj</h2>
          <div className="mt-4 space-y-3">
            {items.map((item) => (
              <div key={item.productId} className="flex items-center gap-3 text-sm">
                <div className="relative h-12 w-14 shrink-0 overflow-hidden rounded-md bg-steel/30">
                  <Image src={item.image} alt="" fill sizes="60px" className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-frost">{item.name}</p>
                  <p className="text-xs text-mist">{item.quantity} × {formatPrice(item.price)}</p>
                </div>
                <p className="font-semibold text-frost">{formatPrice(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-2 border-t border-steel pt-4 text-sm">
            <div className="flex justify-between text-mist"><span>Nëntotali</span><span>{formatPrice(total)}</span></div>
            <div className="flex justify-between text-mist"><span>Dërgesa</span><span className="text-green-400">Falas</span></div>
            <div className="flex justify-between pt-2 text-base font-bold text-frost"><span>Totali</span><span>{formatPrice(total)}</span></div>
          </div>
          <Button type="submit" size="lg" disabled={loading} className="mt-6 w-full">
            {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Duke u procesuar...</> : "Konfirmo Porosinë"}
          </Button>
        </aside>
      </form>
    </div>
  );
}
