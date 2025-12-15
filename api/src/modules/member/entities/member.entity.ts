import { ParishEntity } from 'src/modules/parish/entities/parish.entity';

export class MemberEntity {
  id: string;
  parishId: string;
  name: string;
  gender?: string | undefined | null;
  maritalStatus?: string | undefined | null;
  occupation?: string | undefined | null;
  birth: Date;
  isBaptized: boolean = false;
  isConfirmed: boolean = false;
  createdAt: Date;
  parish: ParishEntity;
  groups: [];
  migrations: [];
  contributions: [];

  constructor(partial: Partial<MemberEntity>) {
    Object.assign(this, partial);
  }
}
