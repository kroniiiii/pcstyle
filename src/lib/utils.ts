// Funksione ndihmëse të përbashkëta

// Bashkim i thjeshtë klasash (pa varësi shtesë)
export function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ");
}

// Formatim çmimi në EUR
export function formatPrice(price: number | string) {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(Number(price));
}

// Gjenerim numri porosie: PCS-2026-XXXXXX
export function generateOrderNumber() {
  const year = new Date().getFullYear();
  const rand = Math.floor(100000 + Math.random() * 900000);
  return `PCS-${year}-${rand}`;
}

// Slug nga emri i produktit
export function slugify(text: string) {
  return text.toLowerCase()
    .replace(/ë/g, "e").replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Etiketat shqip të statuseve të porosisë
export const ORDER_STATUS_LABELS: Record<string, string> = {
  PENDING: "Në pritje",
  PROCESSING: "Në përpunim",
  SHIPPED: "Dërguar",
  DELIVERED: "Dorëzuar",
  CANCELLED: "Anuluar",
};

export const ORDER_STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  PROCESSING: "bg-electric/15 text-volt border-electric/30",
  SHIPPED: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  DELIVERED: "bg-green-500/15 text-green-400 border-green-500/30",
  CANCELLED: "bg-red-500/15 text-red-400 border-red-500/30",
};
