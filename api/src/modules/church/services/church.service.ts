import { Injectable, NotFoundException } from '@nestjs/common';
import { ChurchRepository } from '../repository/church.repository';
import { ChurchCreateDto } from '../dto/church.dto';

@Injectable()
export class ChurchService {
  constructor(private readonly repo: ChurchRepository) {}

  async create(data: ChurchCreateDto) {
    return this.repo.create(data);
  }

  async findById(id: string) {
    const result = await this.repo.findById(id);
    if (!result) {
      throw new NotFoundException('Igreja não encontrada');
    }
    return result;
  }

  async findAll() {
    return await this.repo.findAll();
  }

  async update(id: string, data: ChurchCreateDto) {
    const church = await this.findById(id);
    if (!church) {
      throw new NotFoundException('Igreja não encontrada');
    }
    return await this.repo.update(id, data);
  }

  async delete(id: string) {
    const church = await this.findById(id);
    if (!church) {
      throw new NotFoundException('Igreja não encontrada');
    }
    return await this.repo.delete(id);
  }
}
