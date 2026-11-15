// Client-side API fetch helpers with robust multi-source token resolution.
// Tokens are stored in localStorage, a non-httpOnly cookie, and are ALSO
// passed via URL query param as a final fallback so authentication works
// even in sandboxed iframes where localStorage and cookies are blocked.

function safeLocalStorageGet(key: string): string | null {
  try {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeLocalStorageSet(key: string, value: string): void {
  try {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, value);
  } catch {
    // ignore (storage may be restricted in some contexts)
  }
}

function safeLocalStorageRemove(key: string): void {
  try {
    if (typeof window === "undefined") return;
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

function safeCookieGet(name: string): string | null {
  try {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]+)"));
    if (match && match[1]) return decodeURIComponent(match[1]);
    return null;
  } catch {
    return null;
  }
}

function safeCookieSet(name: string, value: string): void {
  try {
    if (typeof document === "undefined") return;
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=2592000; SameSite=Lax`;
  } catch {
    // ignore
  }
}

function safeCookieRemove(name: string): void {
  try {
    if (typeof document === "undefined") return;
    document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
  } catch {
    // ignore
  }
}

// Read the token from the ?token= URL query parameter (final fallback)
function getUrlToken(): string | null {
  try {
    if (typeof window === "undefined") return null;
    const params = new URLSearchParams(window.location.search);
    return params.get("token");
  } catch {
    return null;
  }
}

// Strip the token from the URL after it has been captured (security hygiene)
export function stripTokenFromUrl(): void {
  try {
    if (typeof window === "undefined") return;
    if (window.location.search.includes("token=")) {
      const url = new URL(window.location.href);
      url.searchParams.delete("token");
      window.history.replaceState({}, "", url.pathname + url.search);
    }
  } catch {
    // ignore
  }
}

// Token storage keys (client-side readable)
const ADMIN_LOCAL = "sb_admin_token";
const ADMIN_COOKIE = "sb_admin_token_js";
const MEMBER_LOCAL = "sb_member_token";
const MEMBER_COOKIE = "sb_member_token_js";

export function getClientAdminToken(): string | null {
  const stored = safeLocalStorageGet(ADMIN_LOCAL) || safeCookieGet(ADMIN_COOKIE);
  if (stored) return stored;

  // Final fallback: URL query param. Persist it so it survives URL cleanup.
  const urlToken = getUrlToken();
  if (urlToken) {
    safeLocalStorageSet(ADMIN_LOCAL, urlToken);
    safeCookieSet(ADMIN_COOKIE, urlToken);
    return urlToken;
  }
  return null;
}

export function setClientAdminToken(token: string): void {
  safeLocalStorageSet(ADMIN_LOCAL, token);
  safeCookieSet(ADMIN_COOKIE, token);
}

export function clearClientAdminToken(): void {
  safeLocalStorageRemove(ADMIN_LOCAL);
  safeCookieRemove(ADMIN_COOKIE);
}

export function getClientMemberToken(): string | null {
  const stored = safeLocalStorageGet(MEMBER_LOCAL) || safeCookieGet(MEMBER_COOKIE);
  if (stored) return stored;

  // Final fallback: URL query param. Persist it so it survives URL cleanup.
  const urlToken = getUrlToken();
  if (urlToken) {
    safeLocalStorageSet(MEMBER_LOCAL, urlToken);
    safeCookieSet(MEMBER_COOKIE, urlToken);
    return urlToken;
  }
  return null;
}

export function setClientMemberToken(token: string): void {
  safeLocalStorageSet(MEMBER_LOCAL, token);
  safeCookieSet(MEMBER_COOKIE, token);
}

export function clearClientMemberToken(): void {
  safeLocalStorageRemove(MEMBER_LOCAL);
  safeCookieRemove(MEMBER_COOKIE);
}

function buildAuthHeaders(init: RequestInit | undefined, token: string | null): Headers {
  const headers = new Headers(init?.headers);
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return headers;
}

export async function adminFetch(
  input: string | URL | Request,
  init?: RequestInit
): Promise<Response> {
  const token = getClientAdminToken();
  const headers = buildAuthHeaders(init, token);

  return fetch(input, {
    ...init,
    headers,
    credentials: "include",
  });
}

export async function memberFetch(
  input: string | URL | Request,
  init?: RequestInit
): Promise<Response> {
  const token = getClientMemberToken();
  const headers = buildAuthHeaders(init, token);

  return fetch(input, {
    ...init,
    headers,
    credentials: "include",
  });
}
