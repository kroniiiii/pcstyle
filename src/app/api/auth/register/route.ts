// POST /api/auth/register - Regjistrimi i përdoruesit të ri
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }
    const { name, email, password } = parsed.data;

    const exists = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (exists) {
      return NextResponse.json({ error: "Ky email është i regjistruar tashmë" }, { status: 409 });
    }

    // Hash i fjalëkalimit - asnjëherë nuk ruhet plaintext
    const hashed = await bcrypt.hash(password, 12);
    await prisma.user.create({
      data: { name, email: email.toLowerCase(), password: hashed },
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Gabim në server" }, { status: 500 });
  }
}
