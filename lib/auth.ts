import NextAuth from "next-auth";
import type { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginApi, getMeApi, refreshTokenApi } from "@/lib/api";
import type { UserRole } from "@/lib/types";

// ─── Type Augmentation ───────────────────────────────────────────────
declare module "next-auth" {
  interface Session {
    accessToken: string;
    error?: string;
    user: {
      id: string;
      role: UserRole["name"];
      roles: UserRole[];
      regency: string | null;
      school: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    accessToken: string;
    accessTokenExpires: number;
    role: UserRole["name"];
    roles: UserRole[];
    regency: string | null;
    school: string | null;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    accessToken: string;
    accessTokenExpires: number;
    role: UserRole["name"];
    roles: UserRole[];
    userId: string;
    regency: string | null;
    school: string | null;
    error?: string;
  }
}

// ─── NextAuth Configuration ─────────────────────────────────────────
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email as string;
        const password = credentials.password as string;

        // Step 1: Login to Laravel API
        const loginRes = await loginApi(email, password);

        if (!loginRes.success || !loginRes.data) {
          // Returning null is the standard way to trigger CredentialsSignin in Auth.js
          return null;
        }

        const { access_token, expires_in } = loginRes.data;

        // Step 2: Fetch user profile & roles
        const meRes = await getMeApi(access_token);

        if (!meRes.success || !meRes.data) {
          throw new Error("Gagal mengambil data pengguna.");
        }

        const user = meRes.data;
        const primaryRole = user.roles?.[0]?.name;

        if (!primaryRole) {
          throw new Error("Akun Anda belum memiliki role. Hubungi administrator.");
        }

        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
          accessToken: access_token,
          accessTokenExpires: Date.now() + expires_in * 1000,
          role: primaryRole,
          roles: user.roles,
          regency: user.regency,
          school: user.school,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour — match Laravel JWT expiry
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      // Initial sign-in — populate token from user object
      if (user) {
        token.accessToken = user.accessToken;
        token.accessTokenExpires = user.accessTokenExpires;
        token.role = user.role;
        token.roles = user.roles;
        token.userId = user.id!;
        token.regency = user.regency;
        token.school = user.school;
        return token;
      }

      // Token hasn't expired yet — return as-is
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Token has expired — attempt refresh
      try {
        const refreshRes = await refreshTokenApi(token.accessToken);

        if (refreshRes.success && refreshRes.data) {
          token.accessToken = refreshRes.data.access_token;
          token.accessTokenExpires = Date.now() + refreshRes.data.expires_in * 1000;
          token.error = undefined;
          return token;
        }
      } catch {
        // Refresh failed
      }

      // Refresh failed — mark token with error
      token.error = "RefreshTokenError";
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.id = token.userId;
      session.user.role = token.role;
      session.user.roles = token.roles;
      session.user.regency = token.regency;
      session.user.school = token.school;

      if (token.error) {
        session.error = token.error;
      }

      return session;
    },
  },
});
