import { Body, Controller, Delete, Get, HttpCode, Param, Post } from "@nestjs/common";
import { MemberServices } from "./member.service";
import { ZodValidationPipe } from "src/common/decorators/validate.dto";
import { CreateMemberDto, CreateMemberSchema, UpdateMemberDto, UpdateMemberSchema } from "./member.dto";


@Controller("members")
export class MemberController {
    constructor(private readonly service: MemberServices) { }

    @Get()
    @HttpCode(200)
    async getAll() {
        const members = await this.service.getAll();
        return { data: members, message: 'Membros listados com sucesso' };
    }
    @Get(':id')
    @HttpCode(200)
    async getByID(@Param('id') id: string) {
        const member = await this.service.getById(+id)
        return { data: member, message: 'Membro encontrado' };
    }
    @Post()
    @HttpCode(201)
    async create(@Body(new ZodValidationPipe(CreateMemberSchema)) data: CreateMemberDto) {
        const member = await this.service.create(data)
        return { data: member, message: 'Membro criado com sucesso' };
    }

    @HttpCode(200)
    async update(@Param('id') id: string, @Body(new ZodValidationPipe(UpdateMemberSchema)) dto: UpdateMemberDto) {
        const member = await this.service.update(+id, dto);
        return { data: member, message: 'Membro atualizado com sucesso' };
    }

    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id') id: string) {
        await this.service.delete(+id);
        return; // Status 204 não retorna corpo
    }
}