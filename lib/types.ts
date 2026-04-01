// Types for API responses and user data

export interface ApiResponse<T> {
  success: boolean;
  status_code: number;
  message: string;
  data: T | null;
  errors?: Record<string, string[]>; // Laravel 422 validation errors
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface UserRole {
  id: number;
  name: "admin-dinas" | "admin-dinas-kab" | "admin-sekolah" | "siswa";
}

export interface UserData {
  id: number;
  name: string;
  email: string;
  is_active: number;
  roles: UserRole[];
  regency: string | null;
  school: string | null;
}
