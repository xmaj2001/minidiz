import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import ContributionRepository from '../contribution.repository';
import {
  CreateContributionDto,
  UpdateContributionDto,
} from '../../dto/contribution.dto';
import {
  Contribution,
  DomainContributionStatus,
  DomainContributionType,
  DomainPaymentMethod,
} from '../../entities/contribution.entity';
import {
  Contribution as PrismaContribution,
  ContributionType as PrismaContributionType,
  PaymentMethod as PrismaPaymentMethod,
  ContributionStatus as PrismaContributionStatus,
} from '@prisma/client';

@Injectable()
export class ContributionImplementation implements ContributionRepository {
  constructor(private readonly prisma: PrismaService) {}

  private mapDomainTypeToPrisma(
    domainType: DomainContributionType,
  ): PrismaContributionType {
    return domainType as PrismaContributionType;
  }
  private mapDomainMethodToPrisma(
    domainMethod: DomainPaymentMethod,
  ): PrismaPaymentMethod {
    return domainMethod as PrismaPaymentMethod;
  }
  private mapDomainStatusToPrisma(
    domainStatus: DomainContributionStatus,
  ): PrismaContributionStatus {
    return domainStatus as PrismaContributionStatus;
  }

  // Converte o objeto do Prisma para a Entidade de Domínio
  private mapPrismaToDomain(
    prismaContribution: PrismaContribution,
  ): Contribution {
    // O Prisma retorna 'valor' como Decimal/Object, mas convertemos para string no domínio
    // ou garantimos que a coerção funcione se for usado o tipo string
    return prismaContribution as unknown as Contribution;
  }

  async create(data: CreateContributionDto): Promise<Contribution> {
    const contribution = await this.prisma.contribution.create({
      data: {
        // IDs:
        evento_id: data.evento_id || null,
        member_id: data.member_id,
        created_by: data.created_by || null,

        // Mapeamento dos Enums
        tipo: this.mapDomainTypeToPrisma(data.tipo),
        metodo: this.mapDomainMethodToPrisma(data.metodo),
        status: this.mapDomainStatusToPrisma(
          data.status || DomainContributionStatus.PENDENTE,
        ),

        valor: data.valor,
        data: new Date(data.data),
        finalidade: data.finalidade || null,
        observacao: data.observacao || null,
        descricao: data.descricao || null,
        imagens: data.imagens || [], // Array de strings
        tipoObjeto: data.tipoObjeto || null,
      },
    });
    return this.mapPrismaToDomain(contribution);
  }

  async findAll(): Promise<Contribution[]> {
    const contributions = await this.prisma.contribution.findMany();
    return contributions as unknown as Contribution[];
  }

  async findById(id: number): Promise<Contribution> {
    const contribution = await this.prisma.contribution.findUnique({
      where: { id },
    });
    if (!contribution)
      throw new NotFoundException('Contribuição não encontrada');
    return this.mapPrismaToDomain(contribution);
  }

  async update(
    id: number,
    updateDto: UpdateContributionDto,
  ): Promise<Contribution> {
    await this.findById(id);

    const updateData: any = {};

    // Mapeamento condicional
    if (updateDto.tipo)
      updateData.tipo = this.mapDomainTypeToPrisma(updateDto.tipo);
    if (updateDto.metodo)
      updateData.metodo = this.mapDomainMethodToPrisma(updateDto.metodo);
    if (updateDto.status)
      updateData.status = this.mapDomainStatusToPrisma(updateDto.status);
    if (updateDto.data) updateData.data = new Date(updateDto.data);

    // Campos diretos
    if (updateDto.evento_id !== undefined)
      updateData.evento_id = updateDto.evento_id;
    if (updateDto.member_id) updateData.member_id = updateDto.member_id;
    if (updateDto.valor !== undefined) updateData.valor = updateDto.valor;
    if (updateDto.finalidade !== undefined)
      updateData.finalidade = updateDto.finalidade;
    if (updateDto.observacao !== undefined)
      updateData.observacao = updateDto.observacao;
    if (updateDto.descricao !== undefined)
      updateData.descricao = updateDto.descricao;
    if (updateDto.imagens !== undefined) updateData.imagens = updateDto.imagens;
    if (updateDto.tipoObjeto !== undefined)
      updateData.tipoObjeto = updateDto.tipoObjeto;

    const contribution = await this.prisma.contribution.update({
      where: { id },
      data: updateData as PrismaContribution,
    });
    return this.mapPrismaToDomain(contribution);
  }

  async remove(id: number): Promise<void> {
    await this.findById(id);
    await this.prisma.contribution.delete({ where: { id } });
  }
}
