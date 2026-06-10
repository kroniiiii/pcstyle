// ============================================================
// GET  /api/products - Lista me kërkim, filtra dhe paginim
// POST /api/products - Shton produkt (vetëm ADMIN)
// Prisma përdor parametrizim - mbrojtje e plotë nga SQL Injection
// ============================================================
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { productSchema } from "@/lib/validations";
import { slugify } from "@/lib/utils";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim();
  const category = searchParams.get("category");
  const brand = searchParams.get("brand");
  const minPrice = Number(searchParams.get("minPrice")) || undefined;
  const maxPrice = Number(searchParams.get("maxPrice")) || undefined;
  const sort = searchParams.get("sort") ?? "newest";
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const perPage = Math.min(100, Number(searchParams.get("perPage")) || 12);

  const where: Prisma.ProductWhereInput = {
    ...(q && {
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
        { brand: { contains: q, mode: "insensitive" } },
      ],
    }),
    ...(category && { category: { slug: category } }),
    ...(brand && { brand: { equals: brand, mode: "insensitive" } }),
    ...((minPrice || maxPrice) && { price: { gte: minPrice, lte: maxPrice } }),
  };

  const orderBy: Prisma.ProductOrderByWithRelationInput =
    sort === "price-asc" ? { price: "asc" } :
    sort === "price-desc" ? { price: "desc" } :
    sort === "name" ? { name: "asc" } : { createdAt: "desc" };

  const [products, total, brands] = await Promise.all([
    prisma.product.findMany({
      where, orderBy,
      skip: (page - 1) * perPage, take: perPage,
      include: { category: true },
    }),
    prisma.product.count({ where }),
    prisma.product.findMany({ select: { brand: true }, distinct: ["brand"], orderBy: { brand: "asc" } }),
  ]);

  return NextResponse.json({
    products, total, page,
    totalPages: Math.ceil(total / perPage),
    brands: brands.map((b) => b.brand),
  });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Akses i ndaluar" }, { status: 403 });
  }

  const body = await req.json();
  const parsed = productSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
  }

  const data = parsed.data;
  let slug = slugify(data.name);
  // Sigurohu që slug-u të jetë unik
  const dup = await prisma.product.findUnique({ where: { slug } });
  if (dup) slug = `${slug}-${Date.now().toString(36)}`;

  const product = await prisma.product.create({
    data: { ...data, oldPrice: data.oldPrice ?? null, slug },
  });
  return NextResponse.json(product, { status: 201 });
}
