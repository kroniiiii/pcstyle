"use client";
// Harrova fjalëkalimin
import { useState } from "react";
import Link from "next/link";
import { KeyRound, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="circuit-bg flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-steel bg-carbon p-8 animate-fade-up">
        <div className="text-center">
          <span className="inline-flex rounded-xl bg-electric/10 p-3 text-volt"><KeyRound className="h-6 w-6" /></span>
          <h1 className="mt-4 font-display text-2xl font-bold text-frost">Rivendos fjalëkalimin</h1>
          <p className="mt-1 text-sm text-mist">Shkruaj email-in dhe do të të dërgojmë një link rivendosjeje.</p>
        </div>
        {sent ? (
          <p className="mt-7 rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-400">
            Nëse emaili ekziston, linku i rivendosjes u dërgua. Kontrollo inbox-in (në modalitetin dev, linku shfaqet në konsolën e serverit).
          </p>
        ) : (
          <form onSubmit={submit} className="mt-7 space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ju@email.com" />
            </div>
            <Button type="submit" disabled={loading} className="w-full" size="lg">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Dërgo linkun"}
            </Button>
          </form>
        )}
        <p className="mt-6 text-center text-sm text-mist">
          <Link href="/login" className="text-volt hover:underline">← Kthehu te kyçja</Link>
        </p>
      </div>
    </div>
  );
}
