"use client";
// ============================================================
// Hero - seksioni hyrës me oferta dhe animacione
// ============================================================
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Truck, ShieldCheck, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="circuit-bg relative overflow-hidden border-b border-steel">
      {/* Shkëlqim blu dekorativ */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-electric/15 blur-[140px]" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-28">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-electric/40 bg-electric/10 px-4 py-1.5 text-xs font-semibold text-volt"
          >
            <Zap className="h-3.5 w-3.5" /> Oferta të reja çdo javë — deri në -25%
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-frost sm:text-5xl lg:text-6xl"
          >
            Ndërto setup-in tënd.
            <span className="block bg-gradient-to-r from-electric to-volt bg-clip-text text-transparent">
              Pa kompromis.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mt-5 max-w-lg text-base leading-relaxed text-mist sm:text-lg"
          >
            Kompjuterë gaming, laptopë, kartela grafike, procesorë dhe çdo pjesë që të duhet —
            të zgjedhura me kujdes, me garanci zyrtare dhe dërgesë të shpejtë në gjithë vendin.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link href="/shop">
              <Button size="lg">Shiko Dyqanin <ArrowRight className="h-4 w-4" /></Button>
            </Link>
            <Link href="/categories">
              <Button size="lg" variant="outline">Eksploro Kategoritë</Button>
            </Link>
          </motion.div>

          {/* Përfitimet */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 grid grid-cols-3 gap-4 max-w-lg"
          >
            {[
              { Icon: Truck, label: "Dërgesë 24-48h" },
              { Icon: ShieldCheck, label: "Garanci zyrtare" },
              { Icon: Cpu, label: "Pjesë origjinale" },
            ].map(({ Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-xs text-mist sm:text-sm">
                <Icon className="h-4 w-4 shrink-0 text-electric" /> {label}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Ilustrim chip-i i animuar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="relative mx-auto hidden w-full max-w-md lg:block"
        >
          <div className="animate-pulse-glow relative aspect-square rounded-3xl border border-electric/30 bg-carbon p-10">
            <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
              <defs>
                <linearGradient id="hg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#4D9FFF" /><stop offset="1" stopColor="#1F6BFF" />
                </linearGradient>
              </defs>
              <rect x="60" y="60" width="80" height="80" rx="10" fill="url(#hg)" />
              <rect x="78" y="78" width="44" height="44" rx="6" fill="#06080F" />
              <text x="100" y="106" textAnchor="middle" fill="#4D9FFF" fontSize="13" fontWeight="bold" fontFamily="monospace">PCS</text>
              <g stroke="url(#hg)" strokeWidth="4" strokeLinecap="round">
                <path d="M75 60V30M100 60V20M125 60V30M75 140v30M100 140v40M125 140v30M60 75H30M60 100H20M60 125H30M140 75h30M140 100h40M140 125h30" />
              </g>
              <g fill="#4D9FFF">
                <circle cx="30" cy="75" r="4" /><circle cx="20" cy="100" r="4" /><circle cx="30" cy="125" r="4" />
                <circle cx="170" cy="75" r="4" /><circle cx="180" cy="100" r="4" /><circle cx="170" cy="125" r="4" />
                <circle cx="75" cy="30" r="4" /><circle cx="100" cy="20" r="4" /><circle cx="125" cy="30" r="4" />
                <circle cx="75" cy="170" r="4" /><circle cx="100" cy="180" r="4" /><circle cx="125" cy="170" r="4" />
              </g>
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
