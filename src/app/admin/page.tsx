// Admin - Statistikat (Total Orders, Revenue, Products, Customers + grafik)
import { ShoppingCart, Euro, Package, Users } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatPrice, ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from "@/lib/utils";
import { SalesChart } from "@/components/admin/SalesChart";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminStatsPage() {
  const [totalOrders, totalProducts, totalCustomers, revenueAgg, recentOrders] = await Promise.all([
    prisma.order.count(),
    prisma.product.count(),
    prisma.user.count({ where: { role: "USER" } }),
    prisma.order.aggregate({ _sum: { total: true }, where: { status: { not: "CANCELLED" } } }),
    prisma.order.findMany({ orderBy: { createdAt: "desc" }, take: 6, include: { user: { select: { name: true } } } }),
  ]);

  // Shitjet 12 muajt e fundit
  const since = new Date(); since.setMonth(since.getMonth() - 11); since.setDate(1);
  const orders = await prisma.order.findMany({
    where: { createdAt: { gte: since }, status: { not: "CANCELLED" } },
    select: { createdAt: true, total: true },
  });
  const months = ["Jan", "Shk", "Mar", "Pri", "Maj", "Qer", "Kor", "Gus", "Sht", "Tet", "Nën", "Dhj"];
  const salesByMonth = Array.from({ length: 12 }, (_, i) => {
    const d = new Date(since.getFullYear(), since.getMonth() + i, 1);
    const m = orders.filter((o) => o.createdAt.getFullYear() === d.getFullYear() && o.createdAt.getMonth() === d.getMonth());
    return { month: months[d.getMonth()], total: m.reduce((s, o) => s + Number(o.total), 0), orders: m.length };
  });

  const stats = [
    { label: "Total Porosi", value: String(totalOrders), Icon: ShoppingCart },
    { label: "Të Ardhurat", value: formatPrice(Number(revenueAgg._sum.total ?? 0)), Icon: Euro },
    { label: "Total Produkte", value: String(totalProducts), Icon: Package },
    { label: "Total Klientë", value: String(totalCustomers), Icon: Users },
  ];

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-frost">Statistikat</h1>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {stats.map(({ label, value, Icon }) => (
          <Card key={label} className="transition-all hover:border-electric/50">
            <CardContent className="flex items-center gap-4 p-5">
              <span className="rounded-xl bg-electric/10 p-3 text-volt"><Icon className="h-6 w-6" /></span>
              <div>
                <p className="text-xs text-mist">{label}</p>
                <p className="font-display text-xl font-bold text-frost">{value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle>Shitjet - 12 muajt e fundit</CardTitle></CardHeader>
        <CardContent><SalesChart data={salesByMonth} /></CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Porositë e fundit</CardTitle></CardHeader>
        <CardContent>
          {recentOrders.length === 0 ? (
            <p className="text-sm text-mist">Ende nuk ka porosi.</p>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((o) => (
                <div key={o.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-steel p-3 text-sm">
                  <div>
                    <p className="font-mono font-semibold text-volt">{o.orderNumber}</p>
                    <p className="text-xs text-mist">{o.user.name} • {new Date(o.createdAt).toLocaleDateString("sq-AL")}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={ORDER_STATUS_COLORS[o.status]}>{ORDER_STATUS_LABELS[o.status]}</Badge>
                    <p className="font-bold text-frost">{formatPrice(Number(o.total))}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
