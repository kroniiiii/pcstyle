// ============================================================
// Ballina - Hero, kategoritë, produktet e veçuara dhe ofertat
// ============================================================
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { ProductCard } from "@/components/product/ProductCard";

 export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [categories, featured, deals] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.product.findMany({
      where: { featured: true }, take: 8,
      include: { category: true }, orderBy: { createdAt: "desc" },
    }),
    prisma.product.findMany({
      where: { oldPrice: { not: null } }, take: 4,
      include: { category: true }, orderBy: { createdAt: "desc" },
    }),
  ]);

  const serialize = (p: (typeof featured)[number]) => ({
    ...p, price: p.price.toString(), oldPrice: p.oldPrice?.toString() ?? null,
  });

  return (
    <>
      <Hero />

      {/* Kategoritë */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-electric">Eksploro</p>
            <h2 className="mt-1 font-display text-2xl font-bold text-frost sm:text-3xl">Kategoritë</h2>
          </div>
          <Link href="/categories" className="flex items-center gap-1 text-sm text-volt hover:underline">
            Të gjitha <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <CategoryGrid categories={categories} />
      </section>

      {/* Produktet e veçuara */}
      <section className="border-y border-steel bg-carbon/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-electric">Të zgjedhura</p>
              <h2 className="mt-1 font-display text-2xl font-bold text-frost sm:text-3xl">Produktet e Veçuara</h2>
            </div>
            <Link href="/shop" className="flex items-center gap-1 text-sm text-volt hover:underline">
              Shiko të gjitha <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {featured.map((p, i) => <ProductCard key={p.id} product={serialize(p)} index={i} />)}
          </div>
        </div>
      </section>

      {/* Ofertat */}
      {deals.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-electric">Kurse para</p>
            <h2 className="mt-1 font-display text-2xl font-bold text-frost sm:text-3xl">Ofertat e Javës 🔥</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {deals.map((p, i) => <ProductCard key={p.id} product={serialize(p)} index={i} />)}
          </div>
        </section>
      )}
    </>
  );
}
