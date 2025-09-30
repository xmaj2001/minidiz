export interface Group {
  id: number;
  nome: string;
  lider_id?: number;
  descricao?: string;
  created_at: string;
  updated_at: string;
  lider?: { id: number; nome: string };
  members?: { id: number; member_id: number; member: { id: number; nome: string } }[];
}

export interface CreateGroupData {
  nome: string;
  lider_id?: number;
  descricao?: string;
}

export interface UpdateGroupData extends CreateGroupData {
  id: number;
}

export interface AddMemberToGroupData {
  group_id: number;
  member_id: number;
}