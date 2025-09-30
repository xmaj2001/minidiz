// src/member/repository/member.implementation.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import MemberRepository from '../member.repository';
import { CreateMemberDto, UpdateMemberDto } from '../../dto/member.dto';
import {
  DomainGender,
  DomainMemberStatus,
  Member,
} from '../../entities/member.entity';
// Importa os tipos e enums do Prisma para uso interno
import {
  Member as PrismaMember,
  MemberStatus as PrismaMemberStatus,
  Gender as PrismaGender,
} from '@prisma/client';

@Injectable()
export class MemberImplementation implements MemberRepository {
  constructor(private readonly prisma: PrismaService) {}

  // --- Mapeamento de Domínio para Prisma ---

  private mapDomainStatusToPrisma(
    domainStatus: DomainMemberStatus,
  ): PrismaMemberStatus {
    return domainStatus as PrismaMemberStatus;
  }

  private mapDomainGenderToPrisma(domainGender: DomainGender): PrismaGender {
    return domainGender as PrismaGender;
  }

  // Converte o objeto do Prisma para a Entidade de Domínio
  private mapPrismaToDomain(prismaMember: PrismaMember): Member {
    return prismaMember as Member;
  }

  async create(data: CreateMemberDto): Promise<Member> {
    const member = await this.prisma.member.create({
      data: {
        ...data,
        email: data.email || null,
        telefone: data.telefone || null,
        endereco: data.endereco || null,
        data_nascimento: data.data_nascimento
          ? new Date(data.data_nascimento)
          : null,
        status: this.mapDomainStatusToPrisma(data.status),
        genero: this.mapDomainGenderToPrisma(data.genero),
      },
    });
    return this.mapPrismaToDomain(member);
  }

  async findAll(): Promise<Member[]> {
    const members = await this.prisma.member.findMany();
    return members as Member[];
  }

  async findById(id: number): Promise<Member> {
    const member = await this.prisma.member.findUnique({ where: { id } });
    if (!member) throw new NotFoundException('Membro não encontrado');
    return this.mapPrismaToDomain(member);
  }

  async findByEmail(email: string): Promise<Member | null> {
    const member = await this.prisma.member.findUnique({ where: { email } });
    if (!member) return null;
    return this.mapPrismaToDomain(member);
  }

  async update(id: number, updateMemberDto: UpdateMemberDto): Promise<Member> {
    await this.findById(id);

    // const updateData: Member = {};

    // // Mapeamento condicional
    // if (updateMemberDto.status)
    //   updateData.status = this.mapDomainStatusToPrisma(updateMemberDto.status);
    // if (updateMemberDto.genero)
    //   updateData.genero = this.mapDomainGenderToPrisma(updateMemberDto.genero);
    // if (updateMemberDto.data_nascimento)
    //   updateData.data_nascimento = new Date(updateMemberDto.data_nascimento);

    // // Campos diretos e opcionais
    // if (updateMemberDto.nome) updateData.nome = updateMemberDto.nome;
    // if (updateMemberDto.sobreNome)
    //   updateData.sobreNome = updateMemberDto.sobreNome;
    // if (updateMemberDto.email !== undefined)
    //   updateData.email = updateMemberDto.email;
    // if (updateMemberDto.telefone !== undefined)
    //   updateData.telefone = updateMemberDto.telefone;
    // if (updateMemberDto.endereco !== undefined)
    //   updateData.endereco = updateMemberDto.endereco;

    const member = await this.prisma.member.update({
      where: { id },
      data: updateMemberDto,
    });
    return this.mapPrismaToDomain(member);
  }

  async remove(id: number): Promise<void> {
    await this.findById(id);
    await this.prisma.member.delete({ where: { id } });
  }
}
