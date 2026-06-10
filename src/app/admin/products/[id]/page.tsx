// Admin - Edito produkt
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-bold text-frost">Edito Produktin</h1>
      <ProductForm
        initial={{
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price.toString(),
          oldPrice: product.oldPrice?.toString() ?? "",
          brand: product.brand,
          stock: String(product.stock),
          categoryId: product.categoryId,
          images: product.images,
          specs: product.specs as Record<string, string>,
          featured: product.featured,
        }}
      />
    </div>
  );
}
