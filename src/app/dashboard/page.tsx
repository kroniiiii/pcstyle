// User Dashboard - porositë e përdoruesit
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Package } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatPrice, ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Llogaria ime" };

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login?callbackUrl=/dashboard");

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-electric">Llogaria ime</p>
      <h1 className="mt-1 font-display text-3xl font-bold text-frost">Përshëndetje, {session.user.name} 👋</h1>
      <p className="mt-1 text-sm text-mist">Këtu mund të ndjekësh të gjitha porositë e tua.</p>

      {orders.length === 0 ? (
        <div className="mt-10 rounded-xl border border-steel bg-carbon py-20 text-center">
          <Package className="mx-auto h-12 w-12 text-steel" />
          <p className="mt-4 font-semibold text-frost">Ende nuk ke porosi</p>
          <p className="mt-1 text-sm text-mist">Porositë e tua do të shfaqen këtu.</p>
        </div>
      ) : (
        <div className="mt-8 space-y-5">
          {orders.map((order) => (
            <div key={order.id} className="rounded-xl border border-steel bg-carbon p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-mono text-sm font-bold text-volt">{order.orderNumber}</p>
                  <p className="text-xs text-mist">
                    {new Date(order.createdAt).toLocaleDateString("sq-AL", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={ORDER_STATUS_COLORS[order.status]}>{ORDER_STATUS_LABELS[order.status]}</Badge>
                  <p className="font-display font-bold text-frost">{formatPrice(Number(order.total))}</p>
                </div>
              </div>
              <div className="mt-4 space-y-2 border-t border-steel pt-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 text-sm">
                    {item.image && (
                      <div className="relative h-10 w-12 shrink-0 overflow-hidden rounded-md bg-steel/30">
                        <Image src={item.image} alt="" fill sizes="48px" className="object-cover" />
                      </div>
                    )}
                    <p className="flex-1 truncate text-mist">{item.name}</p>
                    <p className="text-mist">{item.quantity} × {formatPrice(Number(item.price))}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
