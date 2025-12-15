import { PrismaService } from 'nestjs-prisma';
import { Injectable } from '@nestjs/common';
import ParishRepository from '../parish.repository';
import { ParishEntity } from '../../entities/parish.entity';
import { ParishCreateDto, ParishUpdateDto } from '../../dto/parish.dto';

@Injectable()
export default class PrismaParishRepository implements ParishRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: ParishCreateDto): Promise<ParishEntity> {
    const entity = await this.prisma.parish.create({ data });
    return new ParishEntity(entity);
  }
  async findAll(): Promise<ParishEntity[]> {
    const entities = await this.prisma.parish.findMany();
    return entities.map((entity) => new ParishEntity(entity));
  }
  async findById(id: string): Promise<ParishEntity | null> {
    const entity = await this.prisma.parish.findUnique({ where: { id } });
    if (!entity) {
      return null;
    }
    return new ParishEntity(entity);
  }
  async update(id: string, data: ParishUpdateDto): Promise<ParishEntity> {
    const entity = await this.prisma.parish.update({
      where: { id },
      data,
    });
    return new ParishEntity(entity);
  }
  async delete(id: string): Promise<void> {
    await this.prisma.parish.delete({ where: { id } });
  }
}
