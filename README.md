# PC-STYLE 🖥️⚡

Dyqan online modern dhe profesional për shitjen e pajisjeve dhe pjesëve të teknologjisë.

**Stack:** Next.js 15 (App Router) • TypeScript • Tailwind CSS • Framer Motion • Prisma ORM • PostgreSQL • NextAuth (JWT)

---

## 📦 Çfarë përmban

- 🏠 Ballina me Hero, kategori, produkte të veçuara dhe oferta
- 🛒 Dyqan me kërkim të avancuar, filtrim sipas kategorisë / çmimit / markës, renditje dhe paginim
- 📄 Faqe detajesh produkti me galeri fotosh, specifikime teknike dhe SEO/Open Graph dinamik
- 🛍️ Shportë (add / remove / update quantity) me ruajtje në localStorage
- 💳 Checkout me validim formash dhe konfirmim porosie
- 🔐 Autentifikim i plotë: Register, Login, Logout, Forgot/Reset Password (bcrypt + JWT)
- 👤 User Dashboard me historikun e porosive dhe statuset (Pending → Processing → Shipped → Delivered)
- 🛠️ **Admin Dashboard**: statistika (Total Orders, Revenue, Products, Customers), grafik shitjesh,
  menaxhim produktesh (Add/Edit/Delete, foto, stok), menaxhim porosish (kërkim, ndryshim statusi,
  të dhënat e klientit), menaxhim përdoruesish (blloko/aktivizo, rolet)
- 🔒 Siguria: hashing me bcrypt, role-based access (middleware), validim me Zod, Prisma (mbrojtje nga SQL Injection), React escaping (mbrojtje nga XSS)
- 🔍 SEO: meta tags dinamike, sitemap.xml, robots.txt, Open Graph
- 📱 Plotësisht responsive (Desktop / Tablet / Mobile)

---

## 🚀 Instalimi (hap pas hapi)

### 1. Parakushtet
- **Node.js 20+** → https://nodejs.org
- **PostgreSQL 15+** → https://www.postgresql.org/download (ose përdor falas https://neon.tech / https://supabase.com)

### 2. Instalo varësitë
```bash
cd pc-style
npm install
```

### 3. Konfiguro databazën
Krijo një databazë PostgreSQL me emrin `pcstyle`, pastaj kopjo file-in e mjedisit:
```bash
cp .env.example .env
```
Hap `.env` dhe vendos:
```env
DATABASE_URL="postgresql://postgres:FJALEKALIMI_YT@localhost:5432/pcstyle?schema=public"
NEXTAUTH_SECRET="gjenero-nje-sekret"   # gjeneroje me: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 4. Krijo tabelat dhe mbushi me të dhëna demo
```bash
npm run db:push    # krijon tabelat në PostgreSQL
npm run db:seed    # shton 11 kategori, 23 produkte demo dhe 2 përdorues
```

### 5. Starto projektin
```bash
npm run dev
```
Hap **http://localhost:3000** 🎉

---

## 🔑 Llogaritë demo

| Roli  | Email               | Fjalëkalimi |
|-------|---------------------|-------------|
| Admin | admin@pcstyle.com   | Admin123!   |
| User  | demo@pcstyle.com    | User123!    |

Paneli i adminit: **http://localhost:3000/admin**

---

## ☁️ Deploy në Vercel

1. Ngarko projektin në GitHub.
2. Krijo një databazë PostgreSQL në cloud (Neon, Supabase ose Vercel Postgres).
3. Në https://vercel.com → **New Project** → importo repo-n.
4. Shto Environment Variables: `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL` (URL-ja e Vercel), `NEXT_PUBLIC_SITE_URL`.
5. Deploy. Pas deploy-it të parë, ekzekuto lokalisht me `DATABASE_URL` e cloud-it:
   ```bash
   npm run db:push && npm run db:seed
   ```

---

## 📁 Struktura e projektit

```
pc-style/
├── prisma/
│   ├── schema.prisma        # Skema e databazës
│   └── seed.ts              # Të dhënat demo
├── public/                  # Logot (dark/light) dhe favicon
└── src/
    ├── middleware.ts        # Role-based access (/admin, /dashboard)
    ├── lib/                 # prisma, auth, utils, validations (Zod)
    ├── types/               # Tipat e NextAuth
    ├── components/
    │   ├── ui/              # Button, Input, Card... (stil shadcn)
    │   ├── layout/          # Header, Footer, Providers
    │   ├── home/            # Hero, CategoryGrid
    │   ├── product/         # ProductCard, Gallery, AddToCart
    │   ├── cart/            # CartProvider (context + localStorage)
    │   └── admin/           # ProductForm, SalesChart
    └── app/
        ├── api/             # Të gjitha API routes (REST)
        ├── shop/            # Dyqani me filtra
        ├── product/[slug]/  # Detajet e produktit
        ├── cart/ checkout/  # Shporta dhe pagesa
        ├── login/ register/ forgot-password/ reset-password/
        ├── dashboard/       # Porositë e përdoruesit
        ├── admin/           # Paneli i administrimit
        ├── sitemap.ts       # SEO
        └── robots.ts        # SEO
```

## 📝 Shënime

- Fotot e produkteve demo janë placeholder (placehold.co) — zëvendësoji me URL të fotove reale nga paneli i adminit.
- "Forgot Password" në modalitetin dev e shfaq linkun e rivendosjes në konsolën e serverit; në produksion lidhe me një shërbim email-i (Resend, SendGrid).
- Upload-i i fotove bëhet me URL; mund të zgjerohet lehtë me UploadThing ose S3.

---

**Website i krijuar nga Kron Qelaj.**
