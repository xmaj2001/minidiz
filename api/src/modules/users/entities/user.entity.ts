// src/user/entities/user.entity.ts
// src/user/user.enums.ts

/**
 * Nível de acesso do usuário.
 * Usado na Entidade e DTOs para evitar dependência do Prisma.
 */
export enum DomainUserPermission {
  ADMIN = 'ADMIN',
  TESOUREIRO = 'TESOUREIRO',
  VISUALIZADOR = 'VISUALIZADOR',
}

/**
 * Status operacional do usuário.
 * Usado na Entidade e DTOs para evitar dependência do Prisma.
 */
export enum DomainUserStatus {
  ATIVO = 'ATIVO',
  BLOQUEADO = 'BLOQUEADO',
}

export class User {
  id: number;
  nome: string;
  email: string;
  senha?: string;
  permissao: DomainUserPermission;
  status: DomainUserStatus;
  created_at: Date;
  updated_at: Date;
}
