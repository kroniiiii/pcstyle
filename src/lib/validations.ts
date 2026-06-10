// Validimi i formave me Zod - mbrojtje nga input i pavlefshëm (XSS / injection)
import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Emri duhet të ketë së paku 2 shkronja").max(60),
  email: z.string().email("Email i pavlefshëm"),
  password: z.string().min(8, "Fjalëkalimi duhet të ketë së paku 8 karaktere")
    .regex(/[A-Z]/, "Duhet së paku një shkronjë e madhe")
    .regex(/[0-9]/, "Duhet së paku një numër"),
});

export const loginSchema = z.object({
  email: z.string().email("Email i pavlefshëm"),
  password: z.string().min(1, "Fjalëkalimi është i detyrueshëm"),
});

export const productSchema = z.object({
  name: z.string().min(3).max(160),
  description: z.string().min(20, "Përshkrimi duhet të ketë së paku 20 karaktere"),
  price: z.coerce.number().positive("Çmimi duhet të jetë pozitiv"),
  oldPrice: z.coerce.number().positive().optional().nullable(),
  brand: z.string().min(1, "Marka është e detyrueshme"),
  stock: z.coerce.number().int().min(0),
  categoryId: z.string().min(1, "Zgjidh kategorinë"),
  images: z.array(z.string().url("URL e pavlefshme")).min(1, "Së paku një foto"),
  specs: z.record(z.string(), z.string()).default({}),
  featured: z.boolean().default(false),
});

export const checkoutSchema = z.object({
  fullName: z.string().min(3, "Emri i plotë është i detyrueshëm"),
  email: z.string().email("Email i pavlefshëm"),
  phone: z.string().min(6, "Numri i telefonit është i detyrueshëm"),
  address: z.string().min(5, "Adresa është e detyrueshme"),
  city: z.string().min(2, "Qyteti është i detyrueshëm"),
  zip: z.string().min(3, "Kodi postar është i detyrueshëm"),
  note: z.string().max(500).optional(),
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().int().positive(),
  })).min(1, "Shporta është bosh"),
});

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(10).max(2000),
});
