import { PrismaService } from 'nestjs-prisma';
import { ChurchCreateDto, ChurchUpdateDto } from '../../dto/church.dto';
import { ChurchEntity } from '../../entities/church.entity';
import { ChurchRepository } from '../church.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class PrismaChurchRepository implements ChurchRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: ChurchCreateDto): Promise<ChurchEntity> {
    const church = await this.prisma.church.create({ data });
    return new ChurchEntity(church);
  }
  async findAll(): Promise<ChurchEntity[]> {
    const churches = await this.prisma.church.findMany();
    return churches.map((church) => new ChurchEntity(church));
  }
  async findById(id: string): Promise<ChurchEntity | null> {
    const church = await this.prisma.church.findUnique({ where: { id } });
    if (!church) {
      return null;
    }
    return new ChurchEntity(church);
  }
  async update(id: string, data: ChurchUpdateDto): Promise<ChurchEntity> {
    const church = await this.prisma.church.update({
      where: { id },
      data,
    });
    return new ChurchEntity(church);
  }
  async delete(id: string): Promise<void> {
    await this.prisma.church.delete({ where: { id } });
  }
}
