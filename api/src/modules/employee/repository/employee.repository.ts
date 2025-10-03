import { CreateEmployeeDto, UpdateEmployeeDto } from '../dto/employee.dto';
import { Employee } from '../entities/employee.entity';

export default abstract class EmployeeRepository {
  abstract create(data: CreateEmployeeDto): Promise<Employee>;
  abstract findAll(): Promise<Employee[]>;
  abstract findById(id: number): Promise<Employee>;
  abstract findByMemberId(memberId: number): Promise<Employee | null>;
  abstract update(id: number, data: UpdateEmployeeDto): Promise<Employee>;
  abstract remove(id: number): Promise<void>;
}
