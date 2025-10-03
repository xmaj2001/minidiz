import { Injectable, ConflictException } from '@nestjs/common';
import UserRepository from '../repository/user.repository';
import { CreateUserDto, UpdateUserDto, BlockUserDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly rep: UserRepository) {}

  /**
   * Cria um novo usuário após verificar a duplicidade de e-mail.
   */
  async create(data: CreateUserDto): Promise<User> {
    const existingUser = await this.rep
      .findByEmail(data.email)
      .catch(() => null);

    if (existingUser) {
      throw new ConflictException(`O e-mail ${data.email} já está cadastrado.`);
    }
    return this.rep.create(data);
  }

  /**
   * Retorna todos os usuários.
   */
  async findAll(): Promise<User[]> {
    return this.rep.findAll();
  }

  /**
   * Retorna um usuário pelo ID.
   */
  async findById(id: number): Promise<User> {
    const user = await this.rep.findById(id);
    delete user.senha;
    return user;
  }

  /**
   * Retorna um usuário pelo e-mail (útil para autenticação).
   * Opcional: Se este método for apenas para uso interno (ex: AuthService),
   * podemos criar um método privado ou retornar o objeto completo.
   */
  async findByEmail(email: string): Promise<User> {
    const user = await this.rep.findByEmail(email);
    delete user.senha;
    return user;
  }

  /**
   * Atualiza as informações de um usuário.
   */
  async update(id: number, data: UpdateUserDto): Promise<User> {
    if (data.email) {
      const existingUser = await this.rep
        .findByEmail(data.email)
        .catch(() => null);
      if (existingUser && existingUser.id !== id) {
        throw new ConflictException(
          `O e-mail ${data.email} já está em uso por outro usuário.`,
        );
      }
    }

    return this.rep.update(id, data);
  }

  /**
   * Bloqueia um usuário. A lógica de permissão do ADMIN está no Repository.
   */
  async block(dto: BlockUserDto): Promise<User> {
    return this.rep.block(dto);
  }

  /**
   * Remove (deleta) um usuário.
   */
  async remove(id: number): Promise<User> {
    return this.rep.remove(id);
  }
}
