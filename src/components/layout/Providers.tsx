"use client";
// Mbështjellësi global i providers (sesioni + shporta)
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/components/cart/CartProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartProvider>{children}</CartProvider>
    </SessionProvider>
  );
}
