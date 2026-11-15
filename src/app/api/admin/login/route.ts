import { NextResponse } from "next/server";
import { db } from "@/db";
import { adminUsers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createToken, DEFAULT_ADMIN_PASS, DEFAULT_ADMIN_USER, verifyPassword, hashPassword } from "@/lib/auth";
import { ensureSeeded } from "@/lib/seed";
import { cookies } from "next/headers";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    await ensureSeeded();
    const body = await req.json();
    const username = String(body?.username ?? "").trim();
    const password = String(body?.password ?? "").trim();

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password required" }, { status: 400 });
    }

    let [user] = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.username, username));

    if (!user) {
      // If default admin username and password matches, auto-create
      if (username === DEFAULT_ADMIN_USER && password === DEFAULT_ADMIN_PASS) {
        [user] = await db
          .insert(adminUsers)
          .values({
            username: DEFAULT_ADMIN_USER,
            name: "प्रशासक (Administrator)",
            passwordHash: hashPassword(DEFAULT_ADMIN_PASS),
          })
          .returning();
      } else {
        return NextResponse.json({ error: "प्रयोगकर्ता नाम वा पासवर्ड गलत छ ।" }, { status: 401 });
      }
    }

    const valid = verifyPassword(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "प्रयोगकर्ता नाम वा पासवर्ड गलत छ ।" }, { status: 401 });
    }

    const token = createToken({ username: user.username, name: user.name });

    // Set cookie on cookieStore as well
    try {
      const cookieStore = await cookies();
      cookieStore.set("sb_admin_token", token, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 14,
      });
    } catch {
      // ignore
    }

    const res = NextResponse.json({
      ok: true,
      token,
      user: { username: user.username, name: user.name },
    });

    res.cookies.set("sb_admin_token", token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 14,
    });

    return res;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "लगइन गर्न समस्या भयो।" }, { status: 500 });
  }
}
