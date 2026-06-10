"use client";
// ============================================================
// Header - logo, navigim, search bar, shporta dhe profili
// ============================================================
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Search, ShoppingCart, User, Menu, X, LayoutDashboard, LogOut, Package } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Ballina" },
  { href: "/shop", label: "Dyqani" },
  { href: "/categories", label: "Kategoritë" },
  { href: "/about", label: "Rreth Nesh" },
  { href: "/contact", label: "Kontakti" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [q, setQ] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const { count } = useCart();
  const { data: session } = useSession();

  const search = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) {
      router.push(`/shop?q=${encodeURIComponent(q.trim())}`);
      setOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-steel/70 bg-ink/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center" aria-label="PC-STYLE Ballina">
          <Image src="/logo-dark.svg" alt="PC-STYLE" width={170} height={40} priority className="h-9 w-auto" />
        </Link>

        {/* Navigimi - desktop */}
        <nav className="hidden lg:flex items-center gap-1 ml-4">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href ? "text-volt bg-electric/10" : "text-mist hover:text-frost"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Search bar */}
        <form onSubmit={search} className="hidden md:flex flex-1 max-w-md ml-auto">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mist" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Kërko produkte, marka..."
              className="h-10 w-full rounded-full border border-steel bg-carbon pl-10 pr-4 text-sm text-frost placeholder:text-mist/60 outline-none focus:border-electric transition-colors"
            />
          </div>
        </form>

        {/* Veprimet djathtas */}
        <div className="ml-auto md:ml-0 flex items-center gap-1">
          <Link href="/cart" className="relative rounded-lg p-2.5 text-mist hover:text-frost transition-colors" aria-label="Shporta">
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-electric px-1 text-[11px] font-bold text-white shadow-glow-sm">
                {count}
              </span>
            )}
          </Link>

          {/* Menyja e përdoruesit */}
          <div className="relative">
            <button
              onClick={() => setUserMenu((v) => !v)}
              className="rounded-lg p-2.5 text-mist hover:text-frost transition-colors"
              aria-label="Llogaria"
            >
              <User className="h-5 w-5" />
            </button>
            {userMenu && (
              <div
                className="absolute right-0 top-12 w-56 rounded-xl border border-steel bg-carbon p-2 shadow-2xl animate-fade-up"
                onMouseLeave={() => setUserMenu(false)}
              >
                {session ? (
                  <>
                    <div className="border-b border-steel px-3 py-2">
                      <p className="text-sm font-semibold text-frost truncate">{session.user?.name}</p>
                      <p className="text-xs text-mist truncate">{session.user?.email}</p>
                    </div>
                    <Link href="/dashboard" onClick={() => setUserMenu(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-mist hover:bg-steel/60 hover:text-frost">
                      <Package className="h-4 w-4" /> Porositë e mia
                    </Link>
                    {session.user?.role === "ADMIN" && (
                      <Link href="/admin" onClick={() => setUserMenu(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-volt hover:bg-steel/60">
                        <LayoutDashboard className="h-4 w-4" /> Paneli i Adminit
                      </Link>
                    )}
                    <button onClick={() => signOut({ callbackUrl: "/" })} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-steel/60">
                      <LogOut className="h-4 w-4" /> Dil
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setUserMenu(false)} className="block rounded-lg px-3 py-2 text-sm text-mist hover:bg-steel/60 hover:text-frost">Kyçu</Link>
                    <Link href="/register" onClick={() => setUserMenu(false)} className="block rounded-lg px-3 py-2 text-sm text-mist hover:bg-steel/60 hover:text-frost">Regjistrohu</Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Butoni i menysë mobile */}
          <button onClick={() => setOpen((v) => !v)} className="lg:hidden rounded-lg p-2.5 text-mist hover:text-frost" aria-label="Menyja">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Menyja mobile */}
      {open && (
        <div className="lg:hidden border-t border-steel bg-ink px-4 py-4 animate-fade-up">
          <form onSubmit={search} className="mb-3 md:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mist" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Kërko produkte..."
                className="h-10 w-full rounded-full border border-steel bg-carbon pl-10 pr-4 text-sm text-frost outline-none focus:border-electric"
              />
            </div>
          </form>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block rounded-lg px-3 py-2.5 text-sm font-medium",
                pathname === item.href ? "text-volt bg-electric/10" : "text-mist hover:text-frost"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
