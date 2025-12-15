import { PrismaService } from 'nestjs-prisma';
import { Injectable } from '@nestjs/common';
import MemberRespository from '../member.repository';
import { MemberEntity } from '../../entities/member.entity';
import { MemberCreateDto, MemberUpdateDto } from '../../dto/memer.dto';

@Injectable()
export default class PrismaMemberRepository implements MemberRespository {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: MemberCreateDto): Promise<MemberEntity> {
    const entity = await this.prisma.member.create({
      data: data,
      include: {
        parish: true,
      },
    });
    return new MemberEntity(entity);
  }

  async findAll(): Promise<MemberEntity[]> {
    const entities = await this.prisma.member.findMany({
      include: {
        parish: true,
      },
    });
    return entities.map((entity) => new MemberEntity(entity));
  }

  async findById(id: string): Promise<MemberEntity | null> {
    const entity = await this.prisma.member.findUnique({
      where: { id },
      include: {
        parish: true,
      },
    });
    if (!entity) {
      return null;
    }
    return new MemberEntity(entity);
  }

  async findByEmail(email: string): Promise<MemberEntity | null> {
    const entity = await this.prisma.member.findUnique({
      where: { email },
      include: {
        parish: true,
      },
    });
    if (!entity) {
      return null;
    }
    return new MemberEntity(entity);
  }

  async findByPhone(phone: string): Promise<MemberEntity | null> {
    const entity = await this.prisma.member.findUnique({
      where: { phone },
      include: {
        parish: true,
      },
    });
    if (!entity) {
      return null;
    }
    return new MemberEntity(entity);
  }

  async update(id: string, data: MemberUpdateDto): Promise<MemberEntity> {
    const entity = await this.prisma.member.update({
      where: { id },
      data,
    });
    return new MemberEntity(entity);
  }

  async delete(id: string): Promise<boolean> {
    const entity = await this.prisma.member.delete({ where: { id } });
    return entity ? true : false;
  }
}
