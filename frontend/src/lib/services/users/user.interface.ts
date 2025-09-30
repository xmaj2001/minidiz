export interface User {
  id: number;
  nome: string;
  email: string;
  permissao: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CreateUserData {
  nome: string;
  email: string;
  senha: string;
  permissao: string;
}

export interface UpdateUserData {
  nome?: string;
  email?: string;
  permissao?: string;
}

export interface BlockUserData {
  id: number;
}
