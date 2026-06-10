// ============================================================
// Footer - kontaktet, rrjetet sociale, informacionet e kompanisë
// ============================================================
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Youtube, Twitter, MapPin, Phone, Mail, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-steel bg-carbon/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brendi */}
          <div>
            <Image src="/logo-dark.svg" alt="PC-STYLE" width={180} height={42} className="h-10 w-auto" />
            <p className="mt-4 text-sm leading-relaxed text-mist">
              PC-STYLE është destinacioni juaj për pajisje dhe pjesë teknologjike premium —
              nga kompjuterët gaming deri te aksesorët profesionalë.
            </p>
            <div className="mt-5 flex gap-3">
              {[
                { Icon: Facebook, href: "https://facebook.com", label: "Facebook" },
                { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                { Icon: Twitter, href: "https://x.com", label: "X / Twitter" },
                { Icon: Youtube, href: "https://youtube.com", label: "YouTube" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="rounded-lg border border-steel p-2 text-mist transition-all hover:border-electric hover:text-volt hover:shadow-glow-sm"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Lidhje të shpejta */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-frost">Dyqani</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                ["/shop", "Të gjitha produktet"],
                ["/shop?category=desktop", "Kompjuterë Desktop"],
                ["/shop?category=laptope", "Laptopë"],
                ["/shop?category=gpu", "Kartela Grafike"],
                ["/shop?category=monitore", "Monitorë"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-mist transition-colors hover:text-volt">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kompania */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-frost">Kompania</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                ["/about", "Rreth Nesh"],
                ["/contact", "Kontakti"],
                ["/dashboard", "Llogaria ime"],
                ["/cart", "Shporta"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-mist transition-colors hover:text-volt">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontaktet */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-frost">Kontakti</h3>
            <ul className="mt-4 space-y-3 text-sm text-mist">
              <li className="flex items-start gap-2.5"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-electric" /> Rr. Abedin Sogojeva, Fushë Kosovë 12000, Kosovë</li>
              <li className="flex items-center gap-2.5"><Phone className="h-4 w-4 shrink-0 text-electric" /> +383 48 265 537</li>
              <li className="flex items-center gap-2.5"><Mail className="h-4 w-4 shrink-0 text-electric" /> saturni28@hotmail.com</li>
              <li className="flex items-center gap-2.5"><Clock className="h-4 w-4 shrink-0 text-electric" /> 09:00AM - 19:00PM</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-steel pt-6 text-xs text-mist sm:flex-row">
          <p>© {new Date().getFullYear()} PC-STYLE. Të gjitha të drejtat e rezervuara.</p>
          <p>
            Website i krijuar nga <span className="font-semibold text-volt">Kron Qelaj</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}
