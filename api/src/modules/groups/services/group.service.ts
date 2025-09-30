import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import GroupRepository from '../repository/group.repository';
import {
  CreateGroupDto,
  UpdateGroupDto,
  GroupMemberDto,
} from '../dto/group.dto';
import { Group } from '../entities/group.entity';
import { MemberService } from '../../members/services/member.service';

@Injectable()
export class GroupService {
  constructor(
    private readonly groupRepository: GroupRepository,
    private readonly memberService: MemberService, // Para validar membros e líderes
  ) {}

  // Helper para validar a existência do líder
  private async validateLeader(leaderId: number) {
    if (leaderId) {
      await this.memberService.findById(leaderId).catch(() => {
        throw new NotFoundException(
          `Membro líder com ID ${leaderId} não encontrado.`,
        );
      });
    } else {
      throw new BadRequestException('O ID do líder é obrigatório.');
    }
  }

  // --- CRUD Básico ---

  async create(data: CreateGroupDto): Promise<Group> {
    await this.validateLeader(data.lider_id);
    return this.groupRepository.create(data);
  }

  async findAll(): Promise<Group[]> {
    return this.groupRepository.findAll();
  }

  async findById(id: number): Promise<Group> {
    return this.groupRepository.findById(id);
  }

  async update(id: number, data: UpdateGroupDto): Promise<Group> {
    if (data.lider_id) {
      await this.validateLeader(data.lider_id);
    }
    return this.groupRepository.update(id, data);
  }

  async remove(id: number): Promise<void> {
    // Lógica de Negócios:
    // **Antes de deletar:** É fundamental garantir que a tabela M:N GroupMember não tenha entradas.
    // O Prisma deve fazer isso automaticamente se configurado com DELETE CASCADE,
    // mas o service pode fazer uma checagem preventiva ou limpar a lista primeiro.

    // O repository já lida com a exclusão do grupo.
    return this.groupRepository.remove(id);
  }

  // --- Métodos de Relação M:N ---

  async addMembers(dto: GroupMemberDto): Promise<Group> {
    await this.groupRepository.findById(dto.group_id); // Garante que o grupo existe

    // Lógica de Negócios: Validar a existência de TODOS os membros
    for (const memberId of dto.memberIds) {
      await this.memberService.findById(memberId).catch(() => {
        throw new NotFoundException(
          `Membro com ID ${memberId} não encontrado.`,
        );
      });
    }

    // O Repository lida com a inserção na tabela M:N
    return this.groupRepository.addMembers(dto.group_id, dto.memberIds);
  }

  async removeMembers(dto: GroupMemberDto): Promise<Group> {
    await this.groupRepository.findById(dto.group_id); // Garante que o grupo existe
    // A remoção não precisa verificar a existência dos membros, pois o Prisma apenas
    // desconecta o que estiver conectado.

    return this.groupRepository.removeMembers(dto.group_id, dto.memberIds);
  }

  async findMembers(groupId: number): Promise<any[]> {
    // O Repository já garante que o grupo existe.
    return this.groupRepository.findMembers(groupId);
  }
}
