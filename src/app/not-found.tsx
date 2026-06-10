// Faqja 404
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="circuit-bg flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-7xl font-bold text-electric">404</p>
      <h1 className="mt-3 font-display text-2xl font-bold text-frost">Faqja nuk u gjet</h1>
      <p className="mt-2 text-mist">Faqja që kërkove nuk ekziston ose është zhvendosur.</p>
      <Link href="/" className="mt-7"><Button size="lg">Kthehu në Ballinë</Button></Link>
    </div>
  );
}
