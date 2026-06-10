// ============================================================
// PC-STYLE - Seed data: kategori, produkte demo, përdorues
// Ekzekuto me: npm run db:seed
// ============================================================
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Foto placeholder me ngjyrat e brendit (zëvendësoji me foto reale më vonë)
const img = (label: string) =>
  `https://placehold.co/800x600/0C1018/4D9FFF/png?text=${encodeURIComponent(label)}`;

const categories = [
  { name: "Kompjuterë Desktop", slug: "desktop", icon: "Monitor" },
  { name: "Laptopë", slug: "laptope", icon: "Laptop" },
  { name: "Kartela Grafike (GPU)", slug: "gpu", icon: "Gpu" },
  { name: "Procesorë (CPU)", slug: "cpu", icon: "Cpu" },
  { name: "Motherboard", slug: "motherboard", icon: "CircuitBoard" },
  { name: "RAM", slug: "ram", icon: "MemoryStick" },
  { name: "SSD / HDD", slug: "storage", icon: "HardDrive" },
  { name: "Monitorë", slug: "monitore", icon: "MonitorPlay" },
  { name: "Tastiera", slug: "tastiera", icon: "Keyboard" },
  { name: "Mausë", slug: "mause", icon: "Mouse" },
  { name: "Aksesorë", slug: "aksesore", icon: "Headphones" },
];

type SeedProduct = {
  name: string; slug: string; cat: string; brand: string; price: number;
  oldPrice?: number; stock: number; featured?: boolean;
  description: string; specs: Record<string, string>;
};

const products: SeedProduct[] = [
  {
    name: "PC-STYLE Titan X9 Gaming Desktop", slug: "pc-style-titan-x9", cat: "desktop",
    brand: "PC-STYLE", price: 2199, oldPrice: 2499, stock: 8, featured: true,
    description:
      "Titan X9 është kompjuteri ynë më i fuqishëm gaming, i ndërtuar për performancë maksimale në 4K. " +
      "Karakteristikat kryesore: ftohje me lëng AIO 360mm, ndriçim ARGB i sinkronizuar dhe kasë me xham të kalitur. " +
      "Avantazhet: temperatura të ulëta nën ngarkesë, zhurmë minimale dhe hapësirë për përmirësime të ardhshme. " +
      "Përdorimet e rekomanduara: gaming AAA në 4K, streaming, rendering 3D dhe punë profesionale kreative.",
    specs: { Procesori: "Intel Core i9-14900K", "Kartela Grafike": "GeForce RTX 4080 Super 16GB", RAM: "32GB DDR5 6000MHz", Ruajtja: "2TB NVMe Gen4 SSD", Motherboard: "Z790 ATX", Furnizimi: "850W 80+ Gold", Ftohja: "AIO 360mm Liquid", Garancia: "24 muaj" },
  },
  {
    name: "PC-STYLE Creator Pro Workstation", slug: "pc-style-creator-pro", cat: "desktop",
    brand: "PC-STYLE", price: 1649, stock: 12,
    description:
      "Workstation i optimizuar për kreatorë përmbajtjesh dhe inxhinierë. Karakteristikat kryesore: CPU me shumë bërthama, " +
      "memorie e shpejtë dhe ruajtje NVMe me kapacitet të lartë. Avantazhet: kohë renderimi të shkurtra dhe multitasking pa kompromis. " +
      "Përdorimet e rekomanduara: video editing 4K, modelim 3D, CAD dhe zhvillim softueri.",
    specs: { Procesori: "AMD Ryzen 9 7900X", "Kartela Grafike": "RTX 4070 12GB", RAM: "64GB DDR5", Ruajtja: "2TB NVMe + 4TB HDD", Furnizimi: "750W 80+ Gold", Garancia: "24 muaj" },
  },
  {
    name: "ASUS ROG Strix G16 (2025)", slug: "asus-rog-strix-g16", cat: "laptope",
    brand: "ASUS", price: 1799, oldPrice: 1999, stock: 15, featured: true,
    description:
      "Laptop gaming premium me ekran 16\" QHD+ 240Hz. Karakteristikat kryesore: shasi alumini, tastierë RGB per-key dhe " +
      "sistem ftohjeje me metal të lëngshëm. Avantazhet: performancë desktop-class në formë portative dhe ekran me ngjyra të sakta. " +
      "Përdorimet e rekomanduara: gaming kompetitiv, krijim përmbajtjesh dhe punë mobile profesionale.",
    specs: { Ekrani: "16\" QHD+ 240Hz 100% DCI-P3", Procesori: "Intel Core i9-14900HX", GPU: "RTX 4070 Laptop 8GB", RAM: "32GB DDR5", Ruajtja: "1TB NVMe Gen4", Bateria: "90Wh", Pesha: "2.5 kg" },
  },
  {
    name: "Lenovo ThinkPad X1 Carbon Gen 12", slug: "lenovo-thinkpad-x1-carbon-g12", cat: "laptope",
    brand: "Lenovo", price: 1549, stock: 10,
    description:
      "Standardi i artë i laptopëve të biznesit. Karakteristikat kryesore: pesha vetëm 1.09kg, fibra karboni, tastierë legjendare " +
      "dhe siguri e nivelit enterprise. Avantazhet: autonomi e gjatë baterie, qëndrueshmëri MIL-SPEC dhe ekran anti-glare. " +
      "Përdorimet e rekomanduara: punë biznesi, udhëtime dhe produktivitet i përditshëm.",
    specs: { Ekrani: "14\" 2.8K OLED", Procesori: "Intel Core Ultra 7 155U", RAM: "32GB LPDDR5x", Ruajtja: "1TB NVMe", Pesha: "1.09 kg", Bateria: "57Wh - deri 14 orë" },
  },
  {
    name: "Apple MacBook Air 13\" M3", slug: "macbook-air-13-m3", cat: "laptope",
    brand: "Apple", price: 1249, stock: 20,
    description:
      "Laptopi më popullor i Apple, tani me chip-in M3. Karakteristikat kryesore: dizajn pa ventilator plotësisht i heshtur, " +
      "ekran Liquid Retina dhe deri në 18 orë bateri. Avantazhet: efikasitet i jashtëzakonshëm energjie dhe ekosistem i integruar Apple. " +
      "Përdorimet e rekomanduara: studentë, profesionistë mobilë dhe krijues të lehtë përmbajtjesh.",
    specs: { Ekrani: "13.6\" Liquid Retina", Chip: "Apple M3 (8C CPU / 10C GPU)", RAM: "16GB Unified", Ruajtja: "512GB SSD", Bateria: "deri 18 orë", Pesha: "1.24 kg" },
  },
  {
    name: "NVIDIA GeForce RTX 4080 Super 16GB", slug: "rtx-4080-super", cat: "gpu",
    brand: "NVIDIA", price: 1099, oldPrice: 1199, stock: 6, featured: true,
    description:
      "Kartela grafike flagship për gaming 4K dhe AI. Karakteristikat kryesore: 16GB GDDR6X, DLSS 3.5 me Frame Generation dhe " +
      "Ray Tracing i gjeneratës së tretë. Avantazhet: mbi 100 FPS në 4K në shumicën e titujve AAA dhe efikasitet i lartë energjie. " +
      "Përdorimet e rekomanduara: gaming 4K, rendering profesional dhe ngarkesa AI/ML.",
    specs: { Memoria: "16GB GDDR6X", "CUDA Cores": "10240", "Boost Clock": "2550 MHz", TDP: "320W", Portat: "3x DP 1.4a, 1x HDMI 2.1", "Furnizimi i rekomanduar": "750W" },
  },
  {
    name: "AMD Radeon RX 7800 XT 16GB", slug: "rx-7800-xt", cat: "gpu",
    brand: "AMD", price: 529, stock: 14,
    description:
      "Raporti më i mirë çmim/performancë për gaming 1440p. Karakteristikat kryesore: 16GB GDDR6, arkitektura RDNA 3 dhe FSR 3. " +
      "Avantazhet: VRAM e bollshme për lojërat moderne dhe çmim konkurrues. " +
      "Përdorimet e rekomanduara: gaming 1440p high-refresh dhe editim video.",
    specs: { Memoria: "16GB GDDR6", "Stream Processors": "3840", "Game Clock": "2124 MHz", TDP: "263W", Portat: "2x DP 2.1, 2x HDMI 2.1" },
  },
  {
    name: "Intel Core i9-14900K", slug: "intel-i9-14900k", cat: "cpu",
    brand: "Intel", price: 569, stock: 18, featured: true,
    description:
      "Procesori më i shpejtë i Intel për desktop. Karakteristikat kryesore: 24 bërthama (8P+16E), 32 threads dhe deri 6.0 GHz boost. " +
      "Avantazhet: performancë lider në gaming dhe produktivitet, overclocking i hapur. " +
      "Përdorimet e rekomanduara: gaming high-end, streaming njëkohësisht dhe ngarkesa profesionale.",
    specs: { Bërthamat: "24 (8P + 16E)", Threads: "32", "Max Boost": "6.0 GHz", Cache: "36MB L3", Socket: "LGA1700", TDP: "125W (253W max)" },
  },
  {
    name: "AMD Ryzen 7 7800X3D", slug: "ryzen-7-7800x3d", cat: "cpu",
    brand: "AMD", price: 449, stock: 22,
    description:
      "Procesori më i mirë për gaming falë teknologjisë 3D V-Cache. Karakteristikat kryesore: 96MB cache L3 dhe efikasitet i lartë. " +
      "Avantazhet: FPS lider në lojëra me konsum të ulët energjie. Përdorimet e rekomanduara: gaming kompetitiv dhe sisteme high-end.",
    specs: { Bërthamat: "8", Threads: "16", "Max Boost": "5.0 GHz", Cache: "96MB L3 (3D V-Cache)", Socket: "AM5", TDP: "120W" },
  },
  {
    name: "ASUS ROG Strix Z790-E Gaming WiFi", slug: "asus-z790-e", cat: "motherboard",
    brand: "ASUS", price: 419, stock: 9,
    description:
      "Motherboard premium për platformën Intel LGA1700. Karakteristikat kryesore: VRM 18+1, DDR5 deri 7800MHz, 5x slote M.2 dhe WiFi 6E. " +
      "Avantazhet: overclocking i qëndrueshëm dhe lidhje e plotë moderne. Përdorimet e rekomanduara: build-e high-end me i7/i9.",
    specs: { Socket: "LGA1700", Chipset: "Intel Z790", RAM: "4x DDR5 deri 7800MHz", "M.2": "5x PCIe 4.0/5.0", Rrjeti: "2.5GbE + WiFi 6E", Formati: "ATX" },
  },
  {
    name: "MSI MAG B650 Tomahawk WiFi", slug: "msi-b650-tomahawk", cat: "motherboard",
    brand: "MSI", price: 219, stock: 16,
    description:
      "Zgjedhja më e zgjuar për platformën AM5. Karakteristikat kryesore: VRM solid 14+2, DDR5, PCIe 5.0 M.2 dhe WiFi 6E. " +
      "Avantazhet: bazë e shkëlqyer për Ryzen 7000/9000 me çmim të arsyeshëm. Përdorimet e rekomanduara: gaming dhe produktivitet mid/high-end.",
    specs: { Socket: "AM5", Chipset: "AMD B650", RAM: "4x DDR5 deri 6400MHz+", "M.2": "3x (1x Gen5)", Rrjeti: "2.5GbE + WiFi 6E", Formati: "ATX" },
  },
  {
    name: "Corsair Vengeance RGB 32GB (2x16) DDR5-6000", slug: "corsair-vengeance-32gb-ddr5", cat: "ram",
    brand: "Corsair", price: 129, oldPrice: 149, stock: 30,
    description:
      "Memoria ideale për sistemet moderne DDR5. Karakteristikat kryesore: 6000MHz CL30, profile XMP/EXPO dhe ndriçim RGB dinamik. " +
      "Avantazhet: sweet spot i performancës për Intel dhe AMD. Përdorimet e rekomanduara: gaming dhe workstation.",
    specs: { Kapaciteti: "32GB (2x16GB)", Shpejtësia: "6000 MT/s", Latenca: "CL30", Tensioni: "1.35V", RGB: "Po, iCUE", Garancia: "Lifetime" },
  },
  {
    name: "Kingston Fury Beast 16GB (2x8) DDR4-3200", slug: "kingston-fury-16gb-ddr4", cat: "ram",
    brand: "Kingston", price: 45, stock: 40,
    description:
      "Përmirësimi më i lehtë për sistemet DDR4. Karakteristikat kryesore: Plug-N-Play në 3200MHz dhe heatspreader me profil të ulët. " +
      "Avantazhet: kompatibilitet i gjerë dhe çmim i shkëlqyer. Përdorimet e rekomanduara: build-e buxhetore dhe upgrade zyrash.",
    specs: { Kapaciteti: "16GB (2x8GB)", Shpejtësia: "3200 MT/s", Latenca: "CL16", Tensioni: "1.35V", Garancia: "Lifetime" },
  },
  {
    name: "Samsung 990 Pro 2TB NVMe Gen4", slug: "samsung-990-pro-2tb", cat: "storage",
    brand: "Samsung", price: 169, oldPrice: 199, stock: 25, featured: true,
    description:
      "SSD-ja më e shpejtë Gen4 në treg. Karakteristikat kryesore: 7450 MB/s lexim, kontrollues efikas dhe softuer Samsung Magician. " +
      "Avantazhet: ngarkim i menjëhershëm i lojërave dhe besueshmëri e provuar. Përdorimet e rekomanduara: disk kryesor për OS, lojëra dhe projekte.",
    specs: { Kapaciteti: "2TB", Interfaca: "PCIe 4.0 x4 NVMe", Leximi: "7450 MB/s", Shkrimi: "6900 MB/s", TBW: "1200 TB", Garancia: "5 vjet" },
  },
  {
    name: "Seagate Barracuda 4TB HDD", slug: "seagate-barracuda-4tb", cat: "storage",
    brand: "Seagate", price: 89, stock: 35,
    description:
      "Ruajtje masive me kosto të ulët. Karakteristikat kryesore: 4TB kapacitet, 5400RPM dhe cache 256MB. " +
      "Avantazhet: çmim/GB i pakrahasueshëm. Përdorimet e rekomanduara: arkiva, backup dhe biblioteka mediash.",
    specs: { Kapaciteti: "4TB", Formati: "3.5\"", Shpejtësia: "5400 RPM", Cache: "256MB", Interfaca: "SATA 6Gb/s", Garancia: "2 vjet" },
  },
  {
    name: "LG UltraGear 27\" QHD 180Hz IPS", slug: "lg-ultragear-27-qhd", cat: "monitore",
    brand: "LG", price: 279, oldPrice: 329, stock: 18, featured: true,
    description:
      "Monitor gaming me ekuilibrin perfekt. Karakteristikat kryesore: panel IPS 1ms, 180Hz, HDR10 dhe G-Sync Compatible. " +
      "Avantazhet: ngjyra të sakta dhe lëvizje ultra të lëmuara. Përdorimet e rekomanduara: gaming kompetitiv dhe punë krijuese.",
    specs: { Madhësia: "27\"", Rezolucioni: "2560x1440 (QHD)", Paneli: "IPS", "Refresh Rate": "180Hz", "Koha e përgjigjes": "1ms GtG", HDR: "HDR10", Portat: "2x HDMI 2.0, 1x DP 1.4" },
  },
  {
    name: "Dell UltraSharp U2724D 27\"", slug: "dell-ultrasharp-u2724d", cat: "monitore",
    brand: "Dell", price: 359, stock: 12,
    description:
      "Monitor profesional për punë dhe dizajn. Karakteristikat kryesore: 100% sRGB, USB-C hub me 90W dhe ergonomi e plotë. " +
      "Avantazhet: saktësi ngjyrash e kalibruar nga fabrika dhe kabllo e vetme për laptop. Përdorimet e rekomanduara: zyra, dizajn dhe programim.",
    specs: { Madhësia: "27\"", Rezolucioni: "2560x1440", Paneli: "IPS Black", "Refresh Rate": "120Hz", "USB-C": "90W Power Delivery", Garancia: "3 vjet Premium Panel" },
  },
  {
    name: "Logitech G Pro X TKL Lightspeed", slug: "logitech-g-pro-x-tkl", cat: "tastiera",
    brand: "Logitech", price: 179, stock: 24,
    description:
      "Tastiera e zgjedhur nga profesionistët e esports. Karakteristikat kryesore: wireless Lightspeed, switch-e GX të ndërrueshëm dhe RGB Lightsync. " +
      "Avantazhet: latencë nën 1ms dhe ndërtim premium kompakt. Përdorimet e rekomanduara: gaming kompetitiv dhe setup-e minimaliste.",
    specs: { Formati: "TKL (Tenkeyless)", Lidhja: "Lightspeed Wireless / Bluetooth / USB-C", Switches: "GX Brown Tactile", Bateria: "deri 50 orë me RGB", RGB: "Lightsync per-key" },
  },
  {
    name: "Keychron K8 Pro QMK/VIA", slug: "keychron-k8-pro", cat: "tastiera",
    brand: "Keychron", price: 109, stock: 28,
    description:
      "Tastiera mekanike më e personalizueshme. Karakteristikat kryesore: QMK/VIA për remapping të plotë, hot-swap dhe gasket mount. " +
      "Avantazhet: tingull dhe ndjesi premium me çmim të arritshëm. Përdorimet e rekomanduara: programim, shkrim dhe përdorim i përditshëm.",
    specs: { Formati: "TKL 80%", Lidhja: "Bluetooth 5.1 / USB-C", Switches: "Gateron Pro (hot-swap)", Kompatibiliteti: "Mac & Windows", Firmware: "QMK/VIA" },
  },
  {
    name: "Logitech G Pro X Superlight 2", slug: "logitech-superlight-2", cat: "mause",
    brand: "Logitech", price: 159, stock: 26, featured: true,
    description:
      "Mausi më i lehtë profesional - vetëm 60 gram. Karakteristikat kryesore: sensor Hero 2 me 32K DPI, switch-e hibride optike dhe 95 orë bateri. " +
      "Avantazhet: precision absolut dhe lodhje zero në sesione të gjata. Përdorimet e rekomanduara: FPS kompetitiv dhe aim i nivelit pro.",
    specs: { Pesha: "60g", Sensori: "Hero 2 - 32000 DPI", Lidhja: "Lightspeed Wireless", Bateria: "95 orë", Switches: "Lightforce Hybrid", "Polling Rate": "deri 2000Hz" },
  },
  {
    name: "Razer DeathAdder V3", slug: "razer-deathadder-v3", cat: "mause",
    brand: "Razer", price: 69, stock: 32,
    description:
      "Forma më e dashur ergonomike, e rifreskuar. Karakteristikat kryesore: 59g, sensor Focus Pro 30K dhe switch-e optike Gen-3. " +
      "Avantazhet: rehati e pakrahasueshme për dorën e djathtë. Përdorimet e rekomanduara: gaming dhe punë gjatë gjithë ditës.",
    specs: { Pesha: "59g", Sensori: "Focus Pro 30K", Lidhja: "USB me kabllo Speedflex", Switches: "Optical Gen-3 (90M klikime)", Butonat: "6 të programueshëm" },
  },
  {
    name: "HyperX Cloud III Wireless Headset", slug: "hyperx-cloud-3-wireless", cat: "aksesore",
    brand: "HyperX", price: 149, stock: 20,
    description:
      "Kufje gaming me rehatinë legjendare HyperX. Karakteristikat kryesore: 120 orë bateri, drajvera 53mm dhe mikrofon i çiftueshëm me noise cancelling. " +
      "Avantazhet: ndër bateritë më të gjata në klasë dhe memory foam premium. Përdorimet e rekomanduara: gaming, thirrje dhe muzikë.",
    specs: { Drajverat: "53mm", Bateria: "deri 120 orë", Lidhja: "2.4GHz Wireless / USB-C", Mikrofoni: "I çiftueshëm, NC", Pesha: "330g", Audio: "DTS Headphone:X" },
  },
  {
    name: "Anker 737 Power Bank 24,000mAh 140W", slug: "anker-737-powerbank", cat: "aksesore",
    brand: "Anker", price: 119, stock: 22,
    description:
      "Power bank që karikon edhe laptopë. Karakteristikat kryesore: 140W output USB-C, ekran smart dhe 24,000mAh kapacitet. " +
      "Avantazhet: karikon MacBook Pro me shpejtësi të plotë. Përdorimet e rekomanduara: udhëtime, punë në terren dhe emergjenca.",
    specs: { Kapaciteti: "24,000mAh (86.4Wh)", Output: "140W max (USB-C PD 3.1)", Portat: "2x USB-C, 1x USB-A", Ekrani: "Smart Digital Display", Pesha: "630g" },
  },
];

async function main() {
  console.log("🔵 PC-STYLE seed - duke filluar...");

  // 1) Kategoritë
  const catMap: Record<string, string> = {};
  for (const c of categories) {
    const cat = await prisma.category.upsert({
      where: { slug: c.slug },
      update: { name: c.name, icon: c.icon },
      create: c,
    });
    catMap[c.slug] = cat.id;
  }
  console.log(`✅ ${categories.length} kategori`);

  // 2) Produktet (me 3 foto galeri secili)
  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: p.price,
        oldPrice: p.oldPrice ?? null,
        brand: p.brand,
        stock: p.stock,
        featured: p.featured ?? false,
        categoryId: catMap[p.cat],
        specs: p.specs,
        images: [img(p.name), img(p.brand + " - pamje 2"), img(p.brand + " - pamje 3")],
      },
    });
  }
  console.log(`✅ ${products.length} produkte demo`);

  // 3) Përdoruesit demo
  const adminPass = await bcrypt.hash("Admin123!", 12);
  const userPass = await bcrypt.hash("User123!", 12);

  await prisma.user.upsert({
    where: { email: "admin@pcstyle.com" },
    update: {},
    create: { name: "Kron Qelaj", email: "admin@pcstyle.com", password: adminPass, role: "ADMIN" },
  });
  await prisma.user.upsert({
    where: { email: "demo@pcstyle.com" },
    update: {},
    create: { name: "Klient Demo", email: "demo@pcstyle.com", password: userPass, role: "USER" },
  });
  console.log("✅ Përdoruesit: admin@pcstyle.com / Admin123!  •  demo@pcstyle.com / User123!");
  console.log("🔵 Seed përfundoi me sukses!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
