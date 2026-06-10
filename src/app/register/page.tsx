"use client";
// Regjistrimi
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Loader2, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Gabim gjatë regjistrimit");
      // Kyçje automatike pas regjistrimit
      await signIn("credentials", { email: form.email, password: form.password, redirect: false });
      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gabim i papritur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="circuit-bg flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-steel bg-carbon p-8 animate-fade-up">
        <div className="text-center">
          <span className="inline-flex rounded-xl bg-electric/10 p-3 text-volt"><UserPlus className="h-6 w-6" /></span>
          <h1 className="mt-4 font-display text-2xl font-bold text-frost">Krijo llogari</h1>
          <p className="mt-1 text-sm text-mist">Bashkohu me PC-STYLE për oferta ekskluzive</p>
        </div>
        <form onSubmit={submit} className="mt-7 space-y-4">
          <div>
            <Label htmlFor="name">Emri i plotë</Label>
            <Input id="name" required value={form.name} onChange={set("name")} placeholder="Filan Fisteku" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required value={form.email} onChange={set("email")} placeholder="ju@email.com" />
          </div>
          <div>
            <Label htmlFor="password">Fjalëkalimi</Label>
            <Input id="password" type="password" required minLength={8} value={form.password} onChange={set("password")} placeholder="Min. 8 karaktere, 1 shkronjë e madhe, 1 numër" />
          </div>
          {error && <p className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full" size="lg">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Regjistrohu"}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-mist">
          Ke llogari? <Link href="/login" className="font-semibold text-volt hover:underline">Kyçu</Link>
        </p>
      </div>
    </div>
  );
}
