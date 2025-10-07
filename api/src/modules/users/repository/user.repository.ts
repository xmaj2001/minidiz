import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, BlockUserDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export default abstract class UserRespository {
  abstract create(data: CreateUserDto): Promise<User>;

  abstract findAll(): Promise<User[]>;

  abstract findById(id: number): Promise<User>;

  abstract findByEmail(email: string): Promise<User>;

  abstract update(id: number, data: UpdateUserDto): Promise<User>;

  abstract block(data: BlockUserDto): Promise<User>;

  abstract remove(id: number): Promise<User>;
}
