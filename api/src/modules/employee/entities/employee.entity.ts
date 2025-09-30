export enum DomainEmployeeRole {
  PASTOR = 'PASTOR',
  SECRETARIO = 'SECRETARIO',
  DIACONO = 'DIACONO',
  MUSICO = 'MUSICO',
  ZELADOR = 'ZELADOR',
  OUTRO = 'OUTRO',
}

export class Employee {
  id: number;
  member_id: number;
  cargo: DomainEmployeeRole;
  data_contratacao: Date | null;
  observacao: string | null;

  created_at: Date;
  updated_at: Date;
}
