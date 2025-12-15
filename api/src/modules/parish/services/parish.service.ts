import { Injectable, NotFoundException } from '@nestjs/common';
import ParishRepository from '../repository/parish.repository';
import { ParishCreateDto, ParishUpdateDto } from '../dto/parish.dto';
import { ChurchRepository } from 'src/modules/church/repository/church.repository';

@Injectable()
export class ParishService {
  constructor(
    private readonly repo: ParishRepository,
    private readonly repoChurch: ChurchRepository,
  ) {}

  async create(data: ParishCreateDto) {
    const church = await this.repoChurch.findById(data.churchId);
    if (!church) throw new NotFoundException('Igreja não encontrada');
    return await this.repo.create(data);
  }

  async findById(id: string) {
    const result = await this.repo.findById(id);
    if (!result) {
      throw new NotFoundException('Paróquia não encontrada');
    }
    return result;
  }

  async findAll() {
    return this.repo.findAll();
  }

  async update(id: string, data: ParishUpdateDto) {
    const entity = await this.findById(id);
    if (!entity) {
      throw new NotFoundException('Paróquia não encontrada');
    }
    return await this.repo.update(entity.id, data);
  }

  async delete(id: string) {
    const entity = await this.findById(id);
    if (!entity) {
      throw new NotFoundException('Paróquia não encontrada');
    }
    return await this.repo.delete(entity.id);
  }
}
