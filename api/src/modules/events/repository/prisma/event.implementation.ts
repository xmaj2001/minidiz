import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import EventRepository from '../event.repository';
import { CreateEventDto, UpdateEventDto } from '../../dto/event.dto';
import {
  DomainEventStatus,
  DomainEventType,
  Event,
} from '../../entities/event.entity';
import {
  Event as PrismaEvent,
  EventType as PrismaEventType,
  EventStatus as PrismaEventStatus,
} from '@prisma/client';

@Injectable()
export class EventImplementation implements EventRepository {
  constructor(private readonly prisma: PrismaService) {}

  // --- Mapeamento de Domínio para Prisma ---

  private mapDomainTypeToPrisma(domainType: DomainEventType): PrismaEventType {
    return domainType as PrismaEventType;
  }
  private mapDomainStatusToPrisma(
    domainStatus: DomainEventStatus,
  ): PrismaEventStatus {
    return domainStatus as PrismaEventStatus;
  }

  // Converte o objeto do Prisma para a Entidade de Domínio
  private mapPrismaToDomain(prismaEvent: PrismaEvent): Event {
    return prismaEvent as Event;
  }

  async create(data: CreateEventDto): Promise<Event> {
    const event = await this.prisma.event.create({
      data: {
        // Conversão de Tipos
        data_inicio: new Date(data.data_inicio),
        data_fim: new Date(data.data_fim),

        // Mapeamento dos Enums
        tipo: this.mapDomainTypeToPrisma(data.tipo),
        status: this.mapDomainStatusToPrisma(data.status),
        // Outros campos
        nome: data.nome,
        descricao: data.descricao || null,
        local: data.local || null,
        // responsavel_member_id: data.responsavel_member_id || null,
        created_by: data.created_by || null,
      },
    });
    return this.mapPrismaToDomain(event);
  }

  async findAll(): Promise<Event[]> {
    const events = await this.prisma.event.findMany();
    return events as Event[];
  }

  async findById(id: number): Promise<Event> {
    const event = await this.prisma.event.findUnique({ where: { id } });
    if (!event) throw new NotFoundException('Evento não encontrado');
    return this.mapPrismaToDomain(event);
  }

  async update(id: number, updateDto: UpdateEventDto): Promise<Event> {
    // Garante que o evento existe antes de tentar atualizar
    await this.findById(id);

    const updateData: any = {};

    // Mapeamento condicional
    if (updateDto.tipo)
      updateData.tipo = this.mapDomainTypeToPrisma(updateDto.tipo);
    if (updateDto.status)
      updateData.status = this.mapDomainStatusToPrisma(updateDto.status);
    if (updateDto.data_inicio)
      updateData.data_inicio = new Date(updateDto.data_inicio);
    if (updateDto.data_fim) updateData.data_fim = new Date(updateDto.data_fim);

    // Campos diretos
    if (updateDto.titulo) updateData.titulo = updateDto.titulo;
    if (updateDto.descricao !== undefined)
      updateData.descricao = updateDto.descricao;
    if (updateDto.local !== undefined) updateData.local = updateDto.local;
    if (updateDto.responsavel_member_id !== undefined)
      updateData.responsavel_member_id = updateDto.responsavel_member_id;

    const event = await this.prisma.event.update({
      where: { id },
      data: updateData as PrismaEvent,
    });
    return this.mapPrismaToDomain(event);
  }

  async remove(id: number): Promise<void> {
    await this.findById(id);
    await this.prisma.event.delete({ where: { id } });
  }
}
