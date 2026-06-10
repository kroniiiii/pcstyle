"use client";
// Admin - Menaxhimi i përdoruesve (blloko/aktivizo, rolet)
import { useEffect, useState } from "react";
import { Loader2, ShieldCheck, ShieldOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

type User = {
  id: string; name: string; email: string; role: "USER" | "ADMIN";
  isActive: boolean; createdAt: string; _count: { orders: number };
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then((d) => setUsers(Array.isArray(d) ? d : []))
      .finally(() => setLoading(false));
  }, []);

  const patch = async (id: string, data: { isActive?: boolean; role?: string }) => {
    const res = await fetch(`/api/admin/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const updated = await res.json();
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...updated } : u)));
    } else {
      const d = await res.json();
      alert(d.error ?? "Veprimi dështoi");
    }
  };

  if (loading) return <div className="flex justify-center py-24"><Loader2 className="h-7 w-7 animate-spin text-electric" /></div>;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-frost">Përdoruesit</h1>

      <div className="mt-5 overflow-x-auto rounded-xl border border-steel">
        <table className="w-full min-w-[680px] text-sm">
          <thead className="bg-carbon text-left text-xs uppercase tracking-wider text-mist">
            <tr>
              <th className="px-4 py-3">Përdoruesi</th>
              <th className="px-4 py-3">Roli</th>
              <th className="px-4 py-3">Porosi</th>
              <th className="px-4 py-3">Statusi</th>
              <th className="px-4 py-3 text-right">Veprimet</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-steel bg-ink hover:bg-carbon/60">
                <td className="px-4 py-3">
                  <p className="font-medium text-frost">{u.name}</p>
                  <p className="text-xs text-mist">{u.email}</p>
                </td>
                <td className="px-4 py-3">
                  <Select value={u.role} onChange={(e) => patch(u.id, { role: e.target.value })} className="h-9 w-28">
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                  </Select>
                </td>
                <td className="px-4 py-3 text-mist">{u._count.orders}</td>
                <td className="px-4 py-3">
                  {u.isActive
                    ? <Badge className="border-green-500/30 bg-green-500/10 text-green-400">Aktiv</Badge>
                    : <Badge className="border-red-500/30 bg-red-500/10 text-red-400">I bllokuar</Badge>}
                </td>
                <td className="px-4 py-3 text-right">
                  <Button
                    size="sm"
                    variant={u.isActive ? "danger" : "default"}
                    onClick={() => patch(u.id, { isActive: !u.isActive })}
                  >
                    {u.isActive ? <><ShieldOff className="h-3.5 w-3.5" /> Blloko</> : <><ShieldCheck className="h-3.5 w-3.5" /> Aktivizo</>}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
