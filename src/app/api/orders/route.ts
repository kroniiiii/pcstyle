// ============================================================
// GET  /api/orders - ADMIN: të gjitha; USER: vetëm të vetat
// POST /api/orders - Krijon porosi nga checkout (transaksion)
// ============================================================
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { checkoutSchema } from "@/lib/validations";
import { generateOrderNumber } from "@/lib/utils";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "I paautorizuar" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim(); // kërkim sipas emrit ose ID (vetëm admin)

  const isAdmin = session.user.role === "ADMIN";
  const orders = await prisma.order.findMany({
    where: {
      ...(isAdmin ? {} : { userId: session.user.id }),
      ...(isAdmin && q
        ? { OR: [
            { orderNumber: { contains: q, mode: "insensitive" } },
            { fullName: { contains: q, mode: "insensitive" } },
            { email: { contains: q, mode: "insensitive" } },
          ] }
        : {}),
    },
    include: { items: true, user: { select: { name: true, email: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(orders);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Kyçu për të vazhduar me porosinë" }, { status: 401 });

  const body = await req.json();
  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
  const data = parsed.data;

  // Transaksion: verifiko stokun, llogarit totalin në server, zbrit stokun
  try {
    const order = await prisma.$transaction(async (tx) => {
      const ids = data.items.map((i) => i.productId);
      const products = await tx.product.findMany({ where: { id: { in: ids } } });

      let total = 0;
      const items = data.items.map((i) => {
        const p = products.find((x) => x.id === i.productId);
        if (!p) throw new Error("Një produkt nuk ekziston më");
        if (p.stock < i.quantity) throw new Error(`Stok i pamjaftueshëm për: ${p.name}`);
        total += Number(p.price) * i.quantity;
        return { productId: p.id, name: p.name, price: p.price, quantity: i.quantity, image: p.images[0] ?? null };
      });

      // Zbrit stokun
      for (const i of data.items) {
        await tx.product.update({
          where: { id: i.productId },
          data: { stock: { decrement: i.quantity } },
        });
      }

      return tx.order.create({
        data: {
          orderNumber: generateOrderNumber(),
          userId: session.user.id,
          total,
          fullName: data.fullName, email: data.email, phone: data.phone,
          address: data.address, city: data.city, zip: data.zip, note: data.note,
          items: { create: items },
        },
        include: { items: true },
      });
    });

    return NextResponse.json(order, { status: 201 });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Gabim gjatë krijimit të porosisë";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
