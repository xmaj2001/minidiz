import { Module } from '@nestjs/common';
import { MemberModule } from '../members/member.module';
import { EmployeeController } from './controllers/employee.controller';
import { EmployeeService } from './services/employee.service';
import EmployeeRepository from './repository/employee.repository';
import { EmployeeImplementation } from './repository/prisma/employee.implementation';
import { PrismaService } from 'nestjs-prisma';

@Module({
  imports: [MemberModule],
  controllers: [EmployeeController],
  providers: [
    EmployeeService,
    PrismaService,
    {
      provide: EmployeeRepository,
      useClass: EmployeeImplementation,
    },
  ],
  exports: [EmployeeService, EmployeeRepository],
})
export class EmployeeModule {}
