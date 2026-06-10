"use client";
// Kyçja (Login)
import { useState, Suspense } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (res?.error) {
      setError(res.error === "CredentialsSignin" ? "Email ose fjalëkalim i gabuar" : res.error);
    } else {
      router.push(searchParams.get("callbackUrl") ?? "/");
      router.refresh();
    }
  };

  return (
    <div className="circuit-bg flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-steel bg-carbon p-8 animate-fade-up">
        <div className="text-center">
          <span className="inline-flex rounded-xl bg-electric/10 p-3 text-volt"><LogIn className="h-6 w-6" /></span>
          <h1 className="mt-4 font-display text-2xl font-bold text-frost">Mirë se erdhe përsëri</h1>
          <p className="mt-1 text-sm text-mist">Kyçu për të vazhduar në PC-STYLE</p>
        </div>
        <form onSubmit={submit} className="mt-7 space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ju@email.com" />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Fjalëkalimi</Label>
              <Link href="/forgot-password" className="mb-1.5 text-xs text-volt hover:underline">Ke harruar fjalëkalimin?</Link>
            </div>
            <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </div>
          {error && <p className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full" size="lg">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Kyçu"}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-mist">
          Nuk ke llogari? <Link href="/register" className="font-semibold text-volt hover:underline">Regjistrohu</Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return <Suspense><LoginForm /></Suspense>;
}
