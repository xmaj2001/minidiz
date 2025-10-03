// src/group/repository/group.implementation.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import GroupRepository from '../group.repository';
import { CreateGroupDto, UpdateGroupDto } from '../../dto/group.dto';
import { Group } from '../../entities/group.entity';
import {
  Group as PrismaGroup,
  // GroupType as PrismaGroupType,
  // GroupStatus as PrismaGroupStatus,
} from '@prisma/client';

@Injectable()
export class GroupImplementation implements GroupRepository {
  constructor(private readonly prisma: PrismaService) {}

  // --- Mapeamento de Domínio para Prisma ---

  // private mapDomainTypeToPrisma(domainType: DomainGroupType): PrismaGroupType {
  //   return domainType as PrismaGroupType;
  // }
  // private mapDomainStatusToPrisma(
  //   domainStatus: DomainGroupStatus,
  // ): PrismaGroupStatus {
  //   return domainStatus as PrismaGroupStatus;
  // }

  private mapPrismaToDomain(prismaGroup: PrismaGroup): Group {
    return prismaGroup as Group;
  }

  // --- CRUD Básico ---

  async create(data: CreateGroupDto): Promise<Group> {
    const group = await this.prisma.group.create({
      data: {
        ...data,
        // data_formacao: new Date(data.data_formacao),
        // tipo: this.mapDomainTypeToPrisma(data.tipo),
        // status: this.mapDomainStatusToPrisma(data.status),
        descricao: data.descricao || null,
        created_by: data.created_by || null,
      },
    });
    return this.mapPrismaToDomain(group);
  }

  async findAll(): Promise<Group[]> {
    const groups = await this.prisma.group.findMany();
    return groups as Group[];
  }

  async findById(id: number): Promise<Group> {
    const group = await this.prisma.group.findUnique({ where: { id } });
    if (!group) throw new NotFoundException('Grupo não encontrado');
    return this.mapPrismaToDomain(group);
  }

  async update(id: number, updateDto: UpdateGroupDto): Promise<Group> {
    await this.findById(id);

    // const updateData: any = {};
    // if (updateDto.nome) updateData.nome = updateDto.nome;
    // if (updateDto.descricao !== undefined)
    //   updateData.descricao = updateDto.descricao;
    // if (updateDto.lider_id !== undefined)
    //   updateData.lider_id = updateDto.lider_id;

    const group = await this.prisma.group.update({
      where: { id },
      data: updateDto,
    });
    return this.mapPrismaToDomain(group);
  }

  async remove(id: number): Promise<void> {
    await this.findById(id);
    // Nota: O Prisma lidará com a exclusão em cascata (ou definirá como NULL/rejeitará)
    // nas relações GroupMember, dependendo da configuração do schema.
    await this.prisma.group.delete({ where: { id } });
  }

  // --- Métodos de Relação M:N ---

  async addMembers(groupId: number, memberIds: number[]): Promise<Group> {
    const group = await this.prisma.group.update({
      where: { id: groupId },
      data: {
        members: {
          // Usa a sintaxe de 'connect' para criar as entradas na tabela intermediária
          connect: memberIds.map((memberId) => ({ id: memberId })),
        },
      },
      include: {
        members: true, // Opcional: retorna a lista atualizada
      },
    });
    return this.mapPrismaToDomain(group);
  }

  async removeMembers(groupId: number, memberIds: number[]): Promise<Group> {
    const group = await this.prisma.group.update({
      where: { id: groupId },
      data: {
        members: {
          // Usa a sintaxe de 'disconnect' para remover as entradas na tabela intermediária
          disconnect: memberIds.map((memberId) => ({ id: memberId })),
        },
      },
      include: {
        members: true, // Opcional: retorna a lista atualizada
      },
    });
    return this.mapPrismaToDomain(group);
  }

  async findMembers(groupId: number): Promise<any[]> {
    const group = await this.prisma.group.findUnique({
      where: { id: groupId },
      // Inclui a tabela de membros associada
      include: { members: true },
    });

    if (!group) throw new NotFoundException('Grupo não encontrado');

    // Retorna apenas a lista de membros
    return group.members;
  }
}
