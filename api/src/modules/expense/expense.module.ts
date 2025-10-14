import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { ExpenseService } from './services/expense.service';
import { ExpenseController } from './controllers/expense.controller';
import ExpenseRepository from './repository/expense.repository';
import { ExpenseImplementation } from './repository/prisma/expense.implementation';
import { EventModule } from '../events/event.module';
import { EmployeeModule } from '../employee/employee.module';
import { UserModule } from '../users/user.module';

@Module({
  controllers: [ExpenseController],
  exports: [ExpenseRepository, ExpenseService],
  imports: [EventModule, EmployeeModule, UserModule],
  providers: [
    ExpenseService,
    PrismaService,
    {
      provide: ExpenseRepository,
      useClass: ExpenseImplementation,
    },
  ],
})
export class ExpenseModule {}
