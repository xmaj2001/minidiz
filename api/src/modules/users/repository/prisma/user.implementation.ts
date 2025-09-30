import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import UserRepository from '../user.repository';
import { CreateUserDto, UpdateUserDto, BlockUserDto } from '../../dto/user.dto';
import * as bcrypt from 'bcrypt';
import {
  DomainUserPermission,
  DomainUserStatus,
  User,
} from '../../entities/user.entity';
import {
  User as PrismaUser,
  UserPermission as PrismaUserPermission,
  UserStatus as PrismaUserStatus,
} from '@prisma/client';

@Injectable()
export class UserImplementation implements UserRepository {
  private readonly saltRounds = 10;

  constructor(private readonly prisma: PrismaService) {}

  private mapDomainPermissionToPrisma(
    domainPermission: DomainUserPermission,
  ): PrismaUserPermission {
    return domainPermission as PrismaUserPermission;
  }

  private mapDomainStatusToPrisma(
    domainStatus: DomainUserStatus,
  ): PrismaUserStatus {
    return domainStatus as PrismaUserStatus;
  }

  // --- Helpers ---
  private excludePassword(user: PrismaUser): User {
    delete (user as { senha?: string }).senha;
    return user as User;
  }

  async create(data: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.senha, this.saltRounds);

    const user = await this.prisma.user.create({
      data: {
        nome: data.nome,
        email: data.email,
        senha: hashedPassword,
        permissao: this.mapDomainPermissionToPrisma(data.permissao),
        status: this.mapDomainStatusToPrisma(DomainUserStatus.ATIVO),
      },
    });
    return this.excludePassword(user);
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        permissao: true,
        status: true,
        created_at: true,
        updated_at: true,
      },
    });
    return users as User[];
  }

  async findById(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user as User; // A camada de service irá tratar a remoção da senha para o cliente.
  }

  // Refatorando findByEmail para retornar o objeto de domínio (sem senha)
  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return this.excludePassword(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.findById(id);

    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    return this.excludePassword(user);
  }

  async block(dto: BlockUserDto): Promise<User> {
    const currentuser = await this.findById(dto.currentUserId);
    if (
      currentuser.permissao !==
      this.mapDomainPermissionToPrisma(DomainUserPermission.ADMIN)
    ) {
      throw new UnauthorizedException(
        'Apenas administradores podem bloquear usuários.',
      );
    }

    if (dto.id === dto.currentUserId) {
      throw new UnauthorizedException(
        'Você não pode bloquear sua própria conta.',
      );
    }

    await this.findById(dto.id);
    const user = await this.prisma.user.update({
      where: { id: dto.id },
      data: {
        status: this.mapDomainStatusToPrisma(DomainUserStatus.BLOQUEADO),
      },
    });

    return this.excludePassword(user);
  }

  async remove(id: number): Promise<User> {
    await this.findById(id); // Verifica se o usuário existe
    const user = await this.prisma.user.delete({ where: { id } });

    return this.excludePassword(user);
  }
}
