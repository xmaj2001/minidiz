// src/member/member.service.ts

import { Injectable, ConflictException } from '@nestjs/common';
import MemberRepository from '../repository/member.repository';
import { CreateMemberDto, UpdateMemberDto } from '../dto/member.dto';
import { Member } from '../entities/member.entity';

@Injectable()
export class MemberService {
  constructor(private readonly memberRepository: MemberRepository) {}

  async create(data: CreateMemberDto): Promise<Member> {
    if (data.email) {
      const existingMember = await this.memberRepository.findByEmail(
        data.email,
      );
      if (existingMember) {
        throw new ConflictException(
          `O e-mail ${data.email} já está cadastrado para outro membro.`,
        );
      }
    }

    return this.memberRepository.create(data);
  }

  async findAll(): Promise<Member[]> {
    return this.memberRepository.findAll();
  }

  async search(query: string): Promise<Member[]> {
    return this.memberRepository.search(query);
  }

  async findById(id: number): Promise<Member> {
    return this.memberRepository.findById(id);
  }

  async update(id: number, data: UpdateMemberDto): Promise<Member> {
    if (data.email) {
      const existingMember = await this.memberRepository.findByEmail(
        data.email,
      );
      if (existingMember && existingMember.id !== id) {
        throw new ConflictException(
          `O e-mail ${data.email} já está em uso por outro membro.`,
        );
      }
    }

    return this.memberRepository.update(id, data);
  }

  async remove(id: number): Promise<void> {
    await this.memberRepository.remove(id);
  }
}
