// src/contribution/contribution.service.ts

import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import ContributionRepository from '../repository/contribution.repository';
import {
  CreateContributionDto,
  UpdateContributionDto,
} from '../dto/contribution.dto';
import {
  Contribution,
  DomainContributionType,
} from '../entities/contribution.entity';
import { MemberService } from '../../members/services/member.service';
import { EventService } from '../../events/services/event.service';

@Injectable()
export class ContributionService {
  constructor(
    private readonly contributionRepository: ContributionRepository,
    private readonly memberService: MemberService, // Para validar o membro
    private readonly eventService: EventService, // Para validar o evento
  ) {}

  async create(data: CreateContributionDto): Promise<Contribution> {
    // Lógica de Negócios 1: Validação de dependências (Membro)
    await this.memberService.findById(data.member_id).catch(() => {
      throw new NotFoundException(
        `Membro com ID ${data.member_id} não encontrado.`,
      );
    });

    // Lógica de Negócios 2: Validação de dependências (Evento, se fornecido)
    if (data.evento_id) {
      await this.eventService.findById(data.evento_id).catch(() => {
        throw new NotFoundException(
          `Evento com ID ${data.evento_id} não encontrado.`,
        );
      });
      // Por enquanto, apenas checa o ID, mas o service de Evento faria a validação.
      if (data.evento_id < 1)
        throw new BadRequestException('ID de Evento inválido.');
    }

    return this.contributionRepository.create(data);
  }

  async findAll(type?: DomainContributionType): Promise<Contribution[]> {
    return this.contributionRepository.findAll(type);
  }

  async findById(id: number): Promise<Contribution> {
    return this.contributionRepository.findById(id);
  }

  async update(id: number, data: UpdateContributionDto): Promise<Contribution> {
    if (data.member_id) {
      await this.memberService.findById(data.member_id).catch(() => {
        throw new NotFoundException(
          `Membro com ID ${data.member_id} não encontrado.`,
        );
      });
    }

    // Validação de dependências (Evento, se alterado)
    if (data.evento_id) {
      if (data.evento_id < 1)
        throw new BadRequestException('ID de Evento inválido.');
    }

    return this.contributionRepository.update(id, data);
  }

  async remove(id: number): Promise<void> {
    return this.contributionRepository.remove(id);
  }
}
