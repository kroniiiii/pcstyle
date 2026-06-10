// ============================================================
// Detajet e produktit - galeri, specifikime, SEO dinamike
// ============================================================
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShieldCheck, Truck, RotateCcw, ChevronRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { ProductGallery } from "@/components/product/ProductGallery";
import { AddToCart } from "@/components/product/AddToCart";
import { ProductCard } from "@/components/product/ProductCard";
import { Badge } from "@/components/ui/badge";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

// Meta Tags dinamike + Open Graph për secilin produkt
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug }, include: { category: true } });
  if (!product) return { title: "Produkti nuk u gjet" };

  return {
    title: product.name,
    description: product.description.slice(0, 160),
    openGraph: {
      title: `${product.name} | PC-STYLE`,
      description: product.description.slice(0, 160),
      images: product.images.map((url) => ({ url })),
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });
  if (!product) notFound();

  // Produkte të ngjashme nga e njëjta kategori
  const related = await prisma.product.findMany({
    where: { categoryId: product.categoryId, id: { not: product.id } },
    take: 4,
    include: { category: true },
  });

  const price = Number(product.price);
  const oldPrice = product.oldPrice ? Number(product.oldPrice) : null;
  const specs = product.specs as Record<string, string>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      {/* Breadcrumbs */}
      <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-mist" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-volt">Ballina</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/shop" className="hover:text-volt">Dyqani</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href={`/shop?category=${product.category.slug}`} className="hover:text-volt">{product.category.name}</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-frost">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} name={product.name} />

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-electric">{product.brand}</p>
          <h1 className="mt-2 font-display text-2xl font-bold text-frost sm:text-3xl">{product.name}</h1>

          <div className="mt-4 flex items-center gap-3">
            {product.stock > 0 ? (
              <Badge className="border-green-500/30 bg-green-500/10 text-green-400">✓ Në stok ({product.stock} copë)</Badge>
            ) : (
              <Badge className="border-red-500/30 bg-red-500/10 text-red-400">Pa stok</Badge>
            )}
            <Badge className="border-steel bg-steel/40 text-mist">{product.category.name}</Badge>
          </div>

          <div className="mt-6 flex items-end gap-3">
            <p className="font-display text-4xl font-bold text-frost">{formatPrice(price)}</p>
            {oldPrice && (
              <>
                <p className="mb-1 text-lg text-mist line-through">{formatPrice(oldPrice)}</p>
                <Badge className="mb-1.5 border-electric/40 bg-electric text-white">
                  Kursen {formatPrice(oldPrice - price)}
                </Badge>
              </>
            )}
          </div>

          <p className="mt-6 leading-relaxed text-mist">{product.description}</p>

          <div className="mt-8">
            <AddToCart
              product={{
                id: product.id, name: product.name, slug: product.slug,
                price, image: product.images[0], stock: product.stock,
              }}
            />
          </div>

          {/* Garancitë */}
          <div className="mt-8 grid grid-cols-3 gap-3 rounded-xl border border-steel bg-carbon p-4 text-center text-xs text-mist">
            <div className="flex flex-col items-center gap-1.5"><Truck className="h-5 w-5 text-electric" /> Dërgesë 24-48h</div>
            <div className="flex flex-col items-center gap-1.5"><ShieldCheck className="h-5 w-5 text-electric" /> Garanci zyrtare</div>
            <div className="flex flex-col items-center gap-1.5"><RotateCcw className="h-5 w-5 text-electric" /> Kthim 14 ditë</div>
          </div>
        </div>
      </div>

      {/* Specifikimet teknike */}
      <section className="mt-14">
        <h2 className="font-display text-xl font-bold text-frost">Specifikimet Teknike</h2>
        <div className="mt-4 overflow-hidden rounded-xl border border-steel">
          {Object.entries(specs).map(([key, value], i) => (
            <div key={key} className={`grid grid-cols-1 sm:grid-cols-[220px_1fr] ${i % 2 === 0 ? "bg-carbon" : "bg-ink"}`}>
              <div className="px-5 py-3 text-sm font-semibold text-mist">{key}</div>
              <div className="px-5 pb-3 sm:py-3 text-sm text-frost">{value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Produkte të ngjashme */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-xl font-bold text-frost">Produkte të Ngjashme</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard
                key={p.id}
                product={{ ...p, price: p.price.toString(), oldPrice: p.oldPrice?.toString() ?? null }}
                index={i}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
