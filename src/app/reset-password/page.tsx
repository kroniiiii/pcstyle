"use client";
// Rivendosja e fjalëkalimit me token
import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function ResetForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") ?? "";
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) return setError(data.error ?? "Gabim");
    router.push("/login");
  };

  return (
    <div className="circuit-bg flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-steel bg-carbon p-8 animate-fade-up">
        <div className="text-center">
          <span className="inline-flex rounded-xl bg-electric/10 p-3 text-volt"><ShieldCheck className="h-6 w-6" /></span>
          <h1 className="mt-4 font-display text-2xl font-bold text-frost">Fjalëkalim i ri</h1>
        </div>
        <form onSubmit={submit} className="mt-7 space-y-4">
          <div>
            <Label htmlFor="password">Fjalëkalimi i ri</Label>
            <Input id="password" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 8 karaktere" />
          </div>
          {error && <p className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">{error}</p>}
          <Button type="submit" disabled={loading || !token} className="w-full" size="lg">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Ruaj fjalëkalimin"}
          </Button>
          {!token && <p className="text-center text-xs text-red-400">Token mungon në URL.</p>}
        </form>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return <Suspense><ResetForm /></Suspense>;
}
