import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import MemberRespository from '../repository/member.repository';
import ParishRepository from 'src/modules/parish/repository/parish.repository';
import { MemberCreateDto, MemberUpdateDto } from '../dto/memer.dto';

//TODO:Tenho que logar todo que esta acontecer aqui com o logger
@Injectable()
export class MemberService {
  private logger: Logger;
  constructor(
    private readonly repo: MemberRespository,
    private readonly repoParish: ParishRepository,
  ) {
    this.logger = new Logger();
  }

  async create(data: MemberCreateDto) {
    data.birth = new Date(data.birth).toISOString();
    const entity = await this.repoParish.findById(data.parishId);
    if (!entity) {
      const ms = `Paróquia com o id:${data.parishId} não encontrada`;
      this.logger.error(ms);
      throw new NotFoundException(ms);
    }
    return await this.repo.create(data);
  }

  async findById(id: string) {
    const result = await this.repo.findById(id);
    if (!result) {
      const ms = `Membro com o id:${id} não encontrada`;
      this.logger.error(ms);
      throw new NotFoundException(ms);
    }
    return result;
  }

  async findByEmail(email: string) {
    const result = await this.repo.findByEmail(email);
    if (!result) {
      const ms = `Membro com o email:${email} não encontrada`;
      this.logger.error(ms);
      throw new NotFoundException(ms);
    }
    return result;
  }

  async findByPhone(phone: string) {
    const result = await this.repo.findByPhone(phone);
    if (!result) {
      const ms = `Membro com o phone:${phone} não encontrada`;
      this.logger.error(ms);
      throw new NotFoundException(ms);
    }
    return result;
  }

  async findAll() {
    return this.repo.findAll();
  }

  async update(id: string, data: MemberUpdateDto) {
    const entity = await this.repoParish.findById(data.parishId);
    if (!entity) {
      const ms = `Paróquia com o id:${data.parishId} não encontrada`;
      this.logger.error(ms);
      throw new NotFoundException(ms);
    }
    const entityMember = await this.findById(id);
    return await this.repo.update(entityMember.id, data);
  }

  async delete(id: string) {
    const entity = await this.findById(id);
    const res = await this.repo.delete(entity.id);
    let ms = '';
    if (res) {
      ms = `Membro com o id:${entity.id} foi deletado`;
    } else {
      ms = `Não foi possivel deletar membro com o id:${entity.id}`;
    }
    this.logger.warn(ms);
    return res;
  }
}
