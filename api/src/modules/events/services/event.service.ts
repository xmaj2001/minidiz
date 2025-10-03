import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import EventRepository from '../repository/event.repository';
import { CreateEventDto, UpdateEventDto } from '../dto/event.dto';
import { Event } from '../entities/event.entity';
import { MemberService } from '../../members/services/member.service';

@Injectable()
export class EventService {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly memberService: MemberService, // Injeta o MemberService
  ) {}

  // **Regra de Negócio:** data_fim deve ser >= data_inicio
  private validateDates(dataInicio: string | Date, dataFim: string | Date) {
    const start = new Date(dataInicio).getTime();
    const end = new Date(dataFim).getTime();
    if (end < start) {
      throw new BadRequestException(
        'A data de término deve ser igual ou posterior à data de início do evento.',
      );
    }
  }

  // **Regra de Negócio:** O Membro responsável deve existir
  private async validateResponsibleMember(memberId: number) {
    if (memberId) {
      await this.memberService.findById(memberId).catch(() => {
        throw new NotFoundException(
          `Membro responsável com ID ${memberId} não encontrado.`,
        );
      });
    }
  }

  async create(data: CreateEventDto): Promise<Event> {
    this.validateDates(data.data_inicio, data.data_fim);
    // await this.validateResponsibleMember(data.responsavel_member_id);

    return this.eventRepository.create(data);
  }

  async findAll(): Promise<Event[]> {
    return this.eventRepository.findAll();
  }

  async findById(id: number): Promise<Event> {
    return this.eventRepository.findById(id);
  }

  async update(id: number, data: UpdateEventDto): Promise<Event> {
    // 1. Buscar evento atual para obter datas não alteradas
    const existingEvent = await this.eventRepository.findById(id);

    // 2. Aplicar a validação de datas, usando os valores existentes se não forem alterados
    const newStart =
      data.data_inicio || existingEvent.data_inicio.toISOString();
    const newEnd = data.data_fim || existingEvent.data_fim.toISOString();
    this.validateDates(newStart, newEnd);

    // 3. Validar o novo responsável, se alterado
    // if (data.responsavel_member_id) {
    //   await this.validateResponsibleMember(data.responsavel_member_id);
    // }

    return this.eventRepository.update(id, data);
  }

  async remove(id: number): Promise<void> {
    return this.eventRepository.remove(id);
  }
}
