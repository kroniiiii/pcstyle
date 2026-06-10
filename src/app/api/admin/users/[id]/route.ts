// PATCH /api/admin/users/[id] - Blloko/aktivizo ose ndrysho rolin
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") return NextResponse.json({ error: "Akses i ndaluar" }, { status: 403 });

  const { id } = await params;
  if (id === session.user.id) {
    return NextResponse.json({ error: "Nuk mund të modifikoni llogarinë tuaj" }, { status: 400 });
  }

  const body = await req.json();
  const data: { isActive?: boolean; role?: "USER" | "ADMIN" } = {};
  if (typeof body.isActive === "boolean") data.isActive = body.isActive;
  if (body.role === "USER" || body.role === "ADMIN") data.role = body.role;

  const user = await prisma.user.update({ where: { id }, data });
  return NextResponse.json({ id: user.id, isActive: user.isActive, role: user.role });
}
