import { PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class MemberCreateDto {
  @IsString()
  parishId: string;

  @IsString()
  name: string;
  //   @Type(number, null)

  @IsOptional()
  @IsString()
  gender?: string | undefined | null;

  @IsOptional()
  @IsString()
  email?: string | undefined | null;

  @IsOptional()
  @IsString()
  phone?: string | undefined | null;

  @IsOptional()
  @IsString()
  maritalStatus?: string | undefined | null;

  @IsOptional()
  @IsString()
  occupation?: string | undefined | null;

  @IsDateString()
  @IsString()
  birth: string;

  @IsOptional()
  @IsBoolean()
  isBaptized: boolean = false;

  @IsOptional()
  @IsBoolean()
  isConfirmed: boolean = false;
}

export class MemberUpdateDto extends PartialType(MemberCreateDto) {
  @IsString()
  parishId: string;
}
