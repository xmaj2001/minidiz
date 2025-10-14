import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import EventRepository from '../event.repository';
import { CreateEventDto, UpdateEventDto } from '../../dto/event.dto';
import { Event } from '../../entities/event.entity';
import UserRespository from '../../../users/repository/user.repository';

@Injectable()
export class EventImplementation implements EventRepository {
  constructor(
    private readonly prisma: PrismaService,
    @Inject() private readonly user: UserRespository,
  ) {}

  async create(data: CreateEventDto): Promise<Event> {
    const userExists = await this.user.findById(data.created_by);
    if (!userExists) {
      throw new NotFoundException('Usuário que registrou não encontrado');
    }
    const event = await this.prisma.event.create({
      data: {
        data: new Date(data.data),
        tipo: data.tipo,
        status: data.status,
        nome: data.nome,
        descricao: data.descricao,
        local: data.local || null,
        orcamento: data.orcamento || 0,
        observacoes: data.observacoes || null,
        horaio: data.horaio,
        created_by: data.created_by || null,
      },
    });
    return event as unknown as Event;
  }

  async findAll(): Promise<Event[]> {
    const events = await this.prisma.event.findMany();
    return events as unknown as Event[];
  }

  async findById(id: number): Promise<Event> {
    const event = await this.prisma.event.findUnique({ where: { id } });
    if (!event) throw new NotFoundException('Evento não encontrado');
    return event as unknown as Event;
  }

  async update(id: number, updateDto: UpdateEventDto): Promise<Event> {
    await this.findById(id);

    const event = await this.prisma.event.update({
      where: { id },
      data: updateDto,
    });
    return event as unknown as Event;
  }

  async remove(id: number): Promise<void> {
    await this.findById(id);
    await this.prisma.event.delete({ where: { id } });
  }
}
