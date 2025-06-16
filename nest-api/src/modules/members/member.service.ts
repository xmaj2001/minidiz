import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { CreateMemberDto, UpdateMemberDto } from "./member.dto";

@Injectable()
export class MemberServices {

    constructor (private readonly prisma: DatabaseService) {}

    async getAll (){
        return this.prisma.member.findMany({
            orderBy: {createdAt:'desc'}
        })
    } 
    
    async getById (id:number){
        const member = await this.prisma.member.findFirst({where:{id: id}})
        if(!member)
            throw new NotFoundException("O membro não foi encontrado")
        return member
    }

    async create (data: CreateMemberDto) {
        const member = await this.prisma.member.findFirst({where:{email: data.email}})
        if(member)
            throw new BadRequestException(`O email ${data.email} já pertence a um Membro registado no sistema`)
        return this.prisma.member.create({data:{
            ...data,
            birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
        }})
    }

      async update(id: number, dto: UpdateMemberDto) {
    const member = await this.prisma.member.findUnique({ where: { id } });
    if (!member) {
      throw new NotFoundException('Membro não encontrado');
    }
    return this.prisma.member.update({
      where: { id },
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        birthDate: dto.birthDate ? new Date(dto.birthDate) : undefined,
        status: dto.status,
      },
    });
  }

  async delete(id: number) {
    const member = await this.prisma.member.findUnique({ where: { id } });
    if (!member) {
      throw new NotFoundException('Membro não encontrado');
    }
    await this.prisma.member.delete({ where: { id } });
    return true;
  }
}