export class ParishEntity {
  id: string;
  churchId: string;
  name: string;
  createdAt: Date;

  constructor(partial: Partial<ParishEntity>) {
    Object.assign(this, partial);
  }
}
