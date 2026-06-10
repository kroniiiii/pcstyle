// Rreth Nesh
import type { Metadata } from "next";
import { Cpu, Users, Award, Rocket } from "lucide-react";

export const metadata: Metadata = {
  title: "Rreth Nesh",
  description: "Njihu me PC-STYLE - dyqani juaj i besuar për pajisje dhe pjesë teknologjike.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-electric">Historia jonë</p>
      <h1 className="mt-1 font-display text-3xl font-bold text-frost sm:text-4xl">Rreth PC-STYLE</h1>

      <div className="mt-8 space-y-5 leading-relaxed text-mist">
        <p>
          PC-STYLE lindi nga pasioni për teknologjinë dhe nga një bindje e thjeshtë: çdo person meriton
          qasje në pajisje cilësore, me çmime të drejta dhe me këshillim të sinqertë. Ajo që filloi si një
          dyqan i vogël për entuziastët e gaming-ut, sot është një nga destinacionet kryesore online për
          kompjuterë, komponentë dhe aksesorë teknologjikë.
        </p>
        <p>
          Ne nuk shesim thjesht produkte — ne ndihmojmë njerëzit të ndërtojnë setup-in e ëndrrave të tyre.
          Çdo produkt në katalogun tonë zgjidhet me kujdes, testohet nga ekipi ynë dhe vjen me garanci
          zyrtare. Nëse nuk do ta vendosnim në kompjuterët tanë, nuk do ta shisnim.
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { Icon: Cpu, title: "5000+", desc: "Produkte të shitura" },
          { Icon: Users, title: "3200+", desc: "Klientë të kënaqur" },
          { Icon: Award, title: "24 muaj", desc: "Garanci zyrtare" },
          { Icon: Rocket, title: "24-48h", desc: "Dërgesë e shpejtë" },
        ].map(({ Icon, title, desc }) => (
          <div key={title} className="rounded-xl border border-steel bg-carbon p-6 text-center transition-all hover:border-electric/60 hover:shadow-glow-sm">
            <Icon className="mx-auto h-7 w-7 text-electric" />
            <p className="mt-3 font-display text-2xl font-bold text-frost">{title}</p>
            <p className="mt-1 text-sm text-mist">{desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-electric/30 bg-electric/5 p-8">
        <h2 className="font-display text-xl font-bold text-frost">Misioni ynë</h2>
        <p className="mt-3 leading-relaxed text-mist">
          Të bëjmë teknologjinë premium të arritshme për të gjithë — me transparencë, ekspertizë dhe
          shërbim që e vendos klientin gjithmonë në qendër.
        </p>
      </div>
    </div>
  );
}
