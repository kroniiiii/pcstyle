// Kontakti (server) - meta + forma client
import type { Metadata } from "next";
import { ContactForm } from "./contact-form";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Kontakti",
  description: "Na kontaktoni për pyetje, oferta ose suport teknik - PC-STYLE.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-electric">Na shkruani</p>
      <h1 className="mt-1 font-display text-3xl font-bold text-frost sm:text-4xl">Kontakti</h1>

      <div className="mt-10 grid gap-8 lg:grid-cols-[360px_1fr]">
        <div className="space-y-4">
          {[
            { Icon: MapPin, title: "Adresa", value: "Rr. UÇK, Prishtinë 10000, Kosovë" },
            { Icon: Phone, title: "Telefoni", value: "+383 44 000 000" },
            { Icon: Mail, title: "Email", value: "info@pcstyle.com" },
            { Icon: Clock, title: "Orari", value: "Hën–Sht: 09:00 – 20:00" },
          ].map(({ Icon, title, value }) => (
            <div key={title} className="flex items-start gap-4 rounded-xl border border-steel bg-carbon p-5">
              <span className="rounded-lg bg-electric/10 p-2.5 text-volt"><Icon className="h-5 w-5" /></span>
              <div>
                <p className="text-sm font-semibold text-frost">{title}</p>
                <p className="mt-0.5 text-sm text-mist">{value}</p>
              </div>
            </div>
          ))}
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
