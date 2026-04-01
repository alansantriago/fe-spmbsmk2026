import { ApiResponse, LoginResponse, UserData } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

/**
 * POST /auth/login
 */
export async function loginApi(
  email: string,
  password: string
): Promise<ApiResponse<LoginResponse>> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

/**
 * POST /auth/me — get current user info
 */
export async function getMeApi(token: string): Promise<ApiResponse<UserData>> {
  const res = await fetch(`${API_URL}/auth/me`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

/**
 * POST /auth/refresh — refresh the JWT token
 */
export async function refreshTokenApi(
  token: string
): Promise<ApiResponse<LoginResponse>> {
  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

/**
 * POST /auth/logout — invalidate token on server
 */
export async function logoutApi(token: string): Promise<void> {
  try {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch {
    // Silently fail — token will expire anyway
  }
}

// ─── Registration & Wilayah ──────────────────────────────────────────

export interface WilayahItem {
  id: number;
  name: string;
}

/**
 * GET /public/data-wilayah/children?parent_id=...
 * parent_id=0 → provinces, province_id → regencies/kabupaten
 */
export async function getWilayahChildren(
  parentId: number
): Promise<ApiResponse<WilayahItem[]>> {
  const res = await fetch(
    `${API_URL}/public/data-wilayah/children?parent_id=${parentId}`,
    {
      method: "GET",
      headers: { Accept: "application/json" },
    }
  );
  return res.json();
}

/**
 * POST /auth/register
 */
export async function registerApi(body: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  regency_id: number;
}): Promise<ApiResponse<any>> {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
}

/**
 * POST /auth/email/resend — resend verification email
 */
export async function resendVerificationEmail(
  email: string
): Promise<ApiResponse<null>> {
  const res = await fetch(`${API_URL}/auth/email/resend`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email }),
  });
  return res.json();
}

/**
 * POST /auth/verify-email/{token} — verify email with token from email link
 */
export async function verifyEmailApi(
  verifyToken: string,
  email?: string | null
): Promise<ApiResponse<null>> {
  let url: string;

  if (verifyToken.startsWith("http")) {
    // Use the absolute URL directly to preserve signed URL signatures
    url = verifyToken;
  } else {
    // Construct from base URL and token
    const cleanToken = verifyToken.startsWith("/") ? verifyToken.substring(1) : verifyToken;
    url = `${API_URL}/auth/verify-email/${cleanToken}`;
  }

  const res = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  });
  return res.json();
}
