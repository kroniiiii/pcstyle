// GET /api/admin/stats - Statistika për dashboard-in e adminit
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") return NextResponse.json({ error: "Akses i ndaluar" }, { status: 403 });

  const [totalOrders, totalProducts, totalCustomers, revenueAgg, recentOrders] = await Promise.all([
    prisma.order.count(),
    prisma.product.count(),
    prisma.user.count({ where: { role: "USER" } }),
    prisma.order.aggregate({ _sum: { total: true }, where: { status: { not: "CANCELLED" } } }),
    prisma.order.findMany({ orderBy: { createdAt: "desc" }, take: 8, include: { user: { select: { name: true } } } }),
  ]);

  // Shitjet sipas muajve (12 muajt e fundit) për grafikun
  const since = new Date();
  since.setMonth(since.getMonth() - 11);
  since.setDate(1);
  const orders = await prisma.order.findMany({
    where: { createdAt: { gte: since }, status: { not: "CANCELLED" } },
    select: { createdAt: true, total: true },
  });
  const monthNames = ["Jan", "Shk", "Mar", "Pri", "Maj", "Qer", "Kor", "Gus", "Sht", "Tet", "Nën", "Dhj"];
  const salesByMonth: { month: string; total: number; orders: number }[] = [];
  for (let i = 0; i < 12; i++) {
    const d = new Date(since.getFullYear(), since.getMonth() + i, 1);
    const monthOrders = orders.filter((o) =>
      o.createdAt.getFullYear() === d.getFullYear() && o.createdAt.getMonth() === d.getMonth());
    salesByMonth.push({
      month: `${monthNames[d.getMonth()]} '${String(d.getFullYear()).slice(2)}`,
      total: monthOrders.reduce((s, o) => s + Number(o.total), 0),
      orders: monthOrders.length,
    });
  }

  return NextResponse.json({
    totalOrders, totalProducts, totalCustomers,
    totalRevenue: Number(revenueAgg._sum.total ?? 0),
    salesByMonth, recentOrders,
  });
}
