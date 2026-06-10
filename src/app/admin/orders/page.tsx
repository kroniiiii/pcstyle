"use client";
// Admin - Menaxhimi i porosive (lista, klienti, statusi, kërkimi)
import { useEffect, useState, useCallback } from "react";
import { Search, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { formatPrice, ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from "@/lib/utils";

type Order = {
  id: string; orderNumber: string; status: string; total: string;
  fullName: string; email: string; phone: string; address: string; city: string; zip: string;
  note: string | null; createdAt: string;
  items: { id: string; name: string; quantity: number; price: string }[];
  user: { name: string; email: string };
};

const STATUSES = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    fetch(`/api/orders${q ? `?q=${encodeURIComponent(q)}` : ""}`)
      .then((r) => r.json())
      .then((d) => setOrders(Array.isArray(d) ? d : []))
      .finally(() => setLoading(false));
  }, [q]);

  useEffect(() => { const t = setTimeout(load, 300); return () => clearTimeout(t); }, [load]);

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-frost">Porositë</h1>

      <div className="relative mt-5 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mist" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Kërko sipas emrit, email ose ID..." className="pl-10" />
      </div>

      {loading ? (
        <div className="flex justify-center py-24"><Loader2 className="h-7 w-7 animate-spin text-electric" /></div>
      ) : orders.length === 0 ? (
        <p className="mt-10 rounded-xl border border-steel bg-carbon py-16 text-center text-mist">Asnjë porosi nuk u gjet.</p>
      ) : (
        <div className="mt-5 space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="rounded-xl border border-steel bg-carbon">
              <div className="flex flex-wrap items-center justify-between gap-3 p-4">
                <div className="min-w-0">
                  <p className="font-mono text-sm font-bold text-volt">{o.orderNumber}</p>
                  <p className="text-xs text-mist">
                    {o.fullName} • {new Date(o.createdAt).toLocaleDateString("sq-AL")} • {o.items.length} artikuj
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={ORDER_STATUS_COLORS[o.status]}>{ORDER_STATUS_LABELS[o.status]}</Badge>
                  <p className="font-display font-bold text-frost">{formatPrice(Number(o.total))}</p>
                  <Select value={o.status} onChange={(e) => updateStatus(o.id, e.target.value)} className="w-40 h-9">
                    {STATUSES.map((s) => <option key={s} value={s}>{ORDER_STATUS_LABELS[s]}</option>)}
                  </Select>
                  <button onClick={() => setOpen(open === o.id ? null : o.id)} className="text-mist hover:text-frost" aria-label="Detajet">
                    {open === o.id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {open === o.id && (
                <div className="grid gap-6 border-t border-steel p-4 sm:grid-cols-2 animate-fade-up">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-electric">Të dhënat e klientit</h3>
                    <div className="mt-2 space-y-1 text-sm text-mist">
                      <p><span className="text-frost">Emri:</span> {o.fullName}</p>
                      <p><span className="text-frost">Email:</span> {o.email}</p>
                      <p><span className="text-frost">Tel:</span> {o.phone}</p>
                      <p><span className="text-frost">Adresa:</span> {o.address}, {o.city} {o.zip}</p>
                      {o.note && <p><span className="text-frost">Shënim:</span> {o.note}</p>}
                      <p><span className="text-frost">Llogaria:</span> {o.user.name} ({o.user.email})</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-electric">Artikujt</h3>
                    <div className="mt-2 space-y-1.5 text-sm">
                      {o.items.map((item) => (
                        <div key={item.id} className="flex justify-between gap-3 text-mist">
                          <span className="truncate">{item.name}</span>
                          <span className="shrink-0">{item.quantity} × {formatPrice(Number(item.price))}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
