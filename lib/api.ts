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
