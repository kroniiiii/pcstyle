// GET një porosi; PATCH ndryshon statusin (vetëm ADMIN)
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

type Params = { params: Promise<{ id: string }> };
const STATUSES = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

export async function GET(_req: Request, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "I paautorizuar" }, { status: 401 });

  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true, user: { select: { name: true, email: true } } },
  });
  if (!order) return NextResponse.json({ error: "Porosia nuk u gjet" }, { status: 404 });
  // Përdoruesi sheh vetëm porositë e veta
  if (session.user.role !== "ADMIN" && order.userId !== session.user.id) {
    return NextResponse.json({ error: "Akses i ndaluar" }, { status: 403 });
  }
  return NextResponse.json(order);
}

export async function PATCH(req: Request, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") return NextResponse.json({ error: "Akses i ndaluar" }, { status: 403 });

  const { id } = await params;
  const { status } = await req.json();
  if (!STATUSES.includes(status)) return NextResponse.json({ error: "Status i pavlefshëm" }, { status: 400 });

  const order = await prisma.order.update({ where: { id }, data: { status } });
  return NextResponse.json(order);
}
