export interface Role {
  id?: number;
  name: string; // 'ADMIN' | 'MODERATOR' | 'USER'
}

export interface User {
  id?: number;
  username: string;
  email: string;
  password?: string;
  created_at?: Date;
  roles?: Role[];
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}
