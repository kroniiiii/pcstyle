// Faqja e dyqanit - kërkim i avancuar dhe filtra
import { Suspense } from "react";
import type { Metadata } from "next";
import { ShopClient } from "./shop-client";

export const metadata: Metadata = {
  title: "Dyqani",
  description: "Eksploro të gjitha produktet teknologjike: desktop, laptopë, GPU, CPU, RAM, SSD, monitorë dhe aksesorë.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center text-mist">Duke u ngarkuar...</div>}>
      <ShopClient />
    </Suspense>
  );
}
