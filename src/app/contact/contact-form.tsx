"use client";
// Forma e kontaktit
import { useState } from "react";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (!res.ok) {
      const d = await res.json();
      return setError(d.error ?? "Gabim gjatë dërgimit");
    }
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-green-500/30 bg-green-500/5 p-12 text-center animate-fade-up">
        <CheckCircle2 className="h-12 w-12 text-green-400" />
        <h2 className="mt-4 font-display text-xl font-bold text-frost">Mesazhi u dërgua!</h2>
        <p className="mt-2 text-sm text-mist">Do t&apos;ju përgjigjemi brenda 24 orëve.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-xl border border-steel bg-carbon p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Emri</Label>
          <Input id="name" required value={form.name} onChange={set("name")} placeholder="Emri juaj" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required value={form.email} onChange={set("email")} placeholder="ju@email.com" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="subject">Subjekti</Label>
          <Input id="subject" required value={form.subject} onChange={set("subject")} placeholder="Si mund t'ju ndihmojmë?" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="message">Mesazhi</Label>
          <Textarea id="message" required value={form.message} onChange={set("message")} placeholder="Shkruani mesazhin tuaj..." />
        </div>
      </div>
      {error && <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">{error}</p>}
      <Button type="submit" disabled={loading} size="lg" className="mt-5">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Send className="h-4 w-4" /> Dërgo Mesazhin</>}
      </Button>
    </form>
  );
}
