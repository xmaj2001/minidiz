import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import EmployeeRepository from '../repository/employee.repository';
import { CreateEmployeeDto, UpdateEmployeeDto } from '../dto/employee.dto';
import { Employee } from '../entities/employee.entity';
import { MemberService } from '../../members/services/member.service'; // Para validar a existência do membro

@Injectable()
export class EmployeeService {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly memberService: MemberService,
  ) {}

  async create(data: CreateEmployeeDto): Promise<Employee> {
    // Lógica de Negócios 1: O Membro deve existir
    await this.memberService.findById(data.member_id).catch(() => {
      throw new NotFoundException(
        `Membro com ID ${data.member_id} não encontrado.`,
      );
    });

    // Lógica de Negócios 2: Relação 1:1 - O membro não pode ser um funcionário ativo.
    const existingEmployee = await this.employeeRepository.findByMemberId(
      data.member_id,
    );
    if (existingEmployee) {
      throw new ConflictException(
        `O Membro com ID ${data.member_id} já está cadastrado como funcionário (ID do Funcionário: ${existingEmployee.id}).`,
      );
    }

    return this.employeeRepository.create(data);
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.findAll();
  }

  async findById(id: number): Promise<Employee> {
    return this.employeeRepository.findById(id);
  }

  // Método extra para ser usado por outros services (ex: ExpenseService)
  async findByMemberId(memberId: number): Promise<Employee> {
    const employee = await this.employeeRepository.findByMemberId(memberId);
    if (!employee) {
      throw new NotFoundException(
        `Nenhum funcionário encontrado para o Membro ID ${memberId}.`,
      );
    }
    return employee;
  }

  async update(id: number, data: UpdateEmployeeDto): Promise<Employee> {
    // Lógica de Negócios 3: Se o member_id for alterado, deve ser checado
    if (data.member_id) {
      // Verifica se o novo member_id existe
      await this.memberService.findById(data.member_id).catch(() => {
        throw new NotFoundException(
          `Membro com ID ${data.member_id} não encontrado.`,
        );
      });

      // Verifica a unicidade (1:1) do novo member_id
      const existingEmployee = await this.employeeRepository.findByMemberId(
        data.member_id,
      );
      if (existingEmployee && existingEmployee.id !== id) {
        throw new ConflictException(
          `O Membro com ID ${data.member_id} já está cadastrado como outro funcionário.`,
        );
      }
    }

    return this.employeeRepository.update(id, data);
  }

  async remove(id: number): Promise<void> {
    // Lógica de Negócios 4: Prevenção de Exclusão
    // Antes de deletar, idealmente você verificaria se:
    // - Este funcionário está ligado a Despesas recentes (Expense).
    // - Este funcionário tem registros de RH importantes.

    return this.employeeRepository.remove(id);
  }
}
