export class ChurchEntity {
  id: string;
  name: string;
  createdAt: Date;

  constructor(partial: Partial<ChurchEntity>) {
    Object.assign(this, partial);
  }
}
