export interface IMember {
  id: string;
  parishId: string;
  name: string;
  email?: string;
  phone?: string;
  age?: number | undefined | null;
  gender?: string | undefined | null;
  maritalStatus?: string | undefined | null;
  occupation?: string | undefined | null;
  isBaptized: boolean;
  isConfirmed: boolean;
  createdAt: Date;
  parish: {
    id: string;
    churchId: string;
    name: string;
    createdAt: Date;
  };
  groups: [];
  migrations: [];
  contributions: [];
}
