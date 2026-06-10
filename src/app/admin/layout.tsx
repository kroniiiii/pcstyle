// Layout i panelit të administrimit me sidebar
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart, Users, ArrowLeft } from "lucide-react";
import { authOptions } from "@/lib/auth";

export const metadata = { title: "Admin Dashboard", robots: { index: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") redirect("/");

  const nav = [
    { href: "/admin", label: "Statistikat", Icon: LayoutDashboard },
    { href: "/admin/products", label: "Produktet", Icon: Package },
    { href: "/admin/orders", label: "Porositë", Icon: ShoppingCart },
    { href: "/admin/users", label: "Përdoruesit", Icon: Users },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="h-fit rounded-xl border border-steel bg-carbon p-3 lg:sticky lg:top-24">
          <p className="px-3 py-2 font-display text-xs font-bold uppercase tracking-widest text-electric">Admin Panel</p>
          <nav className="space-y-1">
            {nav.map(({ href, label, Icon }) => (
              <Link key={href} href={href} className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-mist transition-colors hover:bg-steel/60 hover:text-frost">
                <Icon className="h-4 w-4" /> {label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 border-t border-steel pt-3">
            <Link href="/" className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-mist hover:text-frost">
              <ArrowLeft className="h-4 w-4" /> Kthehu te dyqani
            </Link>
          </div>
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
