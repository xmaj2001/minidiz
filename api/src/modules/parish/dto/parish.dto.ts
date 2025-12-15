import { IsString, IsEmpty } from 'class-validator';

export class ParishCreateDto {
  //
  @IsString({ message: 'O nome da Paroquia deve ser uma string' })
  name: string;
  @IsString({ message: 'O churchId da Igreja deve ser uma string' })
  churchId: string;
}

export class ParishUpdateDto {
  @IsString({ message: 'O nome da Paroquia deve ser uma string' })
  name: string;
  @IsString({ message: 'O churchId da Igreja deve ser uma string' })
  churchId: string;
}
