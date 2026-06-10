// Faqja e kategorive
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { CategoryGrid } from "@/components/home/CategoryGrid";

export const metadata: Metadata = {
  title: "Kategoritë",
  description: "Të gjitha kategoritë e produkteve teknologjike në PC-STYLE.",
};
export const revalidate = 300;

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { products: true } } },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-electric">Eksploro</p>
      <h1 className="mt-1 font-display text-3xl font-bold text-frost sm:text-4xl">Kategoritë</h1>
      <p className="mt-2 max-w-xl text-mist">
        Zgjidh kategorinë që të intereson dhe gjej pajisjen e duhur për setup-in tënd.
      </p>
      <div className="mt-10">
        <CategoryGrid categories={categories} />
      </div>
    </div>
  );
}
