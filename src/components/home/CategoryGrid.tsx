"use client";
// Rrjeti i kategorive me ikona
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Monitor, Laptop, Cpu, CircuitBoard, MemoryStick, HardDrive,
  MonitorPlay, Keyboard, Mouse, Headphones, Microchip, type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Monitor, Laptop, Cpu, CircuitBoard, MemoryStick, HardDrive,
  MonitorPlay, Keyboard, Mouse, Headphones, Gpu: Microchip,
};

export type CategoryData = { id: string; name: string; slug: string; icon: string | null };

export function CategoryGrid({ categories }: { categories: CategoryData[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {categories.map((cat, i) => {
        const Icon = ICONS[cat.icon ?? ""] ?? Cpu;
        return (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.04 }}
          >
            <Link
              href={`/shop?category=${cat.slug}`}
              className="group flex flex-col items-center gap-3 rounded-xl border border-steel bg-carbon p-5 text-center transition-all hover:border-electric/60 hover:shadow-glow-sm"
            >
              <span className="rounded-xl bg-electric/10 p-3 text-volt transition-colors group-hover:bg-electric group-hover:text-white">
                <Icon className="h-6 w-6" />
              </span>
              <span className="text-xs font-semibold text-mist group-hover:text-frost sm:text-sm">{cat.name}</span>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
