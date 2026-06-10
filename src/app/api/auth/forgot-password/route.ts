// POST /api/auth/forgot-password - Gjeneron token rivendosjeje
// Në produksion: dërgoje token-in me email (Resend, SendGrid, etj.)
// Në dev: token-i shfaqet në konsolën e serverit.
import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: "Email i detyrueshëm" }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });

  // Përgjigje identike pavarësisht nëse emaili ekziston (mbrojtje nga enumerimi)
  if (user) {
    const token = crypto.randomBytes(32).toString("hex");
    await prisma.user.update({
      where: { id: user.id },
      data: { resetToken: token, resetTokenExpiry: new Date(Date.now() + 60 * 60 * 1000) },
    });
    const link = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;
    console.log(`🔑 [PC-STYLE] Link rivendosjeje për ${email}: ${link}`);
    // TODO: dërgo email-in këtu me shërbimin tuaj të preferuar
  }

  return NextResponse.json({ ok: true, message: "Nëse emaili ekziston, do të merrni një link rivendosjeje." });
}
