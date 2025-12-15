import { IsString } from 'class-validator';

export class ChurchCreateDto {
  @IsString({ message: 'O nome da igreja deve ser uma string' })
  name: string;
}

export class ChurchUpdateDto {
  @IsString({ message: 'O nome da igreja deve ser uma string' })
  name: string;
}
