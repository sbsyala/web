import crypto from "crypto";
import { cookies, headers } from "next/headers";
import { DEFAULT_ADMIN_PASS, DEFAULT_ADMIN_USER } from "./auth-constants";

export { DEFAULT_ADMIN_PASS, DEFAULT_ADMIN_USER };

const ADMIN_SECRET = process.env.ADMIN_SECRET || "shakya-bajracharya-samaj-yala-secret-key-2075";
const MEMBER_SECRET = process.env.MEMBER_SECRET || "shakya-bajracharya-samaj-member-portal-secret-2075";

export function hashPassword(password: string): string {
  return crypto.pbkdf2Sync(password, ADMIN_SECRET, 1000, 32, "sha256").toString("hex");
}

export function verifyPassword(password: string, hash: string): boolean {
  try {
    if (!password || !hash) return false;
    const computed = hashPassword(password);
    const bufComputed = Buffer.from(computed, "hex");
    const bufHash = Buffer.from(hash, "hex");
    if (bufComputed.length !== bufHash.length) return false;
    return crypto.timingSafeEqual(bufComputed, bufHash);
  } catch {
    return false;
  }
}

export function createToken(payload: { username: string; name: string }): string {
  const data = JSON.stringify({ ...payload, exp: Date.now() + 1000 * 60 * 60 * 24 * 30 }); // 30 days
  const base64Data = Buffer.from(data).toString("base64url");
  const signature = crypto.createHmac("sha256", ADMIN_SECRET).update(base64Data).digest("base64url");
  return `${base64Data}.${signature}`;
}

export function verifyToken(token: string): { username: string; name: string } | null {
  try {
    if (!token || typeof token !== "string") return null;
    const cleanToken = token.trim();
    const parts = cleanToken.split(".");
    if (parts.length !== 2) return null;
    const [base64Data, signature] = parts;
    if (!base64Data || !signature) return null;

    const expectedSignature = crypto.createHmac("sha256", ADMIN_SECRET).update(base64Data).digest("base64url");
    if (signature !== expectedSignature) return null;

    const json = Buffer.from(base64Data, "base64url").toString("utf-8");
    const payload = JSON.parse(json);
    if (payload.exp && payload.exp < Date.now()) return null;

    return { username: payload.username, name: payload.name };
  } catch {
    return null;
  }
}

export async function getSessionAdmin(req?: Request): Promise<{ username: string; name: string } | null> {
  // 1. Check req Authorization header & URL search params if req is passed
  if (req) {
    const authHeader = req.headers.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.substring(7).trim();
      const verified = verifyToken(token);
      if (verified) return verified;
    }

    const cookieHeader = req.headers.get("cookie");
    if (cookieHeader) {
      const match = cookieHeader.match(/sb_admin_token=([^;]+)/);
      if (match && match[1]) {
        const verified = verifyToken(decodeURIComponent(match[1]));
        if (verified) return verified;
      }
    }

    try {
      const url = new URL(req.url);
      const queryToken = url.searchParams.get("token");
      if (queryToken) {
        const verified = verifyToken(queryToken);
        if (verified) return verified;
      }
    } catch {
      // ignore
    }
  }

  // 2. Check next/headers for Authorization header
  try {
    const reqHeaders = await headers();
    const authHeader = reqHeaders.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.substring(7).trim();
      const verified = verifyToken(token);
      if (verified) return verified;
    }
    const cookieHeader = reqHeaders.get("cookie");
    if (cookieHeader) {
      const match = cookieHeader.match(/sb_admin_token=([^;]+)/);
      if (match && match[1]) {
        const verified = verifyToken(decodeURIComponent(match[1]));
        if (verified) return verified;
      }
    }
  } catch {
    // ignore
  }

  // 3. Check next/headers cookies store
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("sb_admin_token")?.value;
    if (token) {
      const verified = verifyToken(token);
      if (verified) return verified;
    }
  } catch {
    // ignore
  }

  return null;
}

// MEMBER AUTHENTICATION
export interface MemberSession {
  id: number;
  membershipNo: string;
  email: string;
  name: string;
  membershipType: string;
}

export function createMemberToken(payload: MemberSession): string {
  const data = JSON.stringify({ ...payload, exp: Date.now() + 1000 * 60 * 60 * 24 * 30 }); // 30 days
  const base64Data = Buffer.from(data).toString("base64url");
  const signature = crypto.createHmac("sha256", MEMBER_SECRET).update(base64Data).digest("base64url");
  return `${base64Data}.${signature}`;
}

export function verifyMemberToken(token: string): MemberSession | null {
  try {
    if (!token || typeof token !== "string") return null;
    const cleanToken = token.trim();
    const parts = cleanToken.split(".");
    if (parts.length !== 2) return null;
    const [base64Data, signature] = parts;
    if (!base64Data || !signature) return null;

    const expectedSignature = crypto.createHmac("sha256", MEMBER_SECRET).update(base64Data).digest("base64url");
    if (signature !== expectedSignature) return null;

    const json = Buffer.from(base64Data, "base64url").toString("utf-8");
    const payload = JSON.parse(json);
    if (payload.exp && payload.exp < Date.now()) return null;

    return {
      id: payload.id,
      membershipNo: payload.membershipNo,
      email: payload.email,
      name: payload.name,
      membershipType: payload.membershipType,
    };
  } catch {
    return null;
  }
}

export async function getSessionMember(req?: Request): Promise<MemberSession | null> {
  // 1. Check req Authorization header & URL search params if req is passed
  if (req) {
    const authHeader = req.headers.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.substring(7).trim();
      const verified = verifyMemberToken(token);
      if (verified) return verified;
    }

    const cookieHeader = req.headers.get("cookie");
    if (cookieHeader) {
      const match = cookieHeader.match(/sb_member_token=([^;]+)/);
      if (match && match[1]) {
        const verified = verifyMemberToken(decodeURIComponent(match[1]));
        if (verified) return verified;
      }
    }

    try {
      const url = new URL(req.url);
      const queryToken = url.searchParams.get("token");
      if (queryToken) {
        const verified = verifyMemberToken(queryToken);
        if (verified) return verified;
      }
    } catch {
      // ignore
    }
  }

  // 2. Check next/headers Authorization
  try {
    const reqHeaders = await headers();
    const authHeader = reqHeaders.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.substring(7).trim();
      const verified = verifyMemberToken(token);
      if (verified) return verified;
    }
    const cookieHeader = reqHeaders.get("cookie");
    if (cookieHeader) {
      const match = cookieHeader.match(/sb_member_token=([^;]+)/);
      if (match && match[1]) {
        const verified = verifyMemberToken(decodeURIComponent(match[1]));
        if (verified) return verified;
      }
    }
  } catch {
    // ignore
  }

  // 3. Check next/headers cookies store
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("sb_member_token")?.value;
    if (token) {
      const verified = verifyMemberToken(token);
      if (verified) return verified;
    }
  } catch {
    // ignore
  }

  return null;
}
