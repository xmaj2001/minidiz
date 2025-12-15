import { Module } from '@nestjs/common';
import { ParishService } from './services/parish.service';
import { ParishController } from './controllers/parish.controller';
import { ChurchModule } from '../church/church.module';
import { PrismaService } from 'nestjs-prisma';
import ParishRepository from './repository/parish.repository';
import PrismaParishRepository from './repository/prisma/parish.prisma';

@Module({
  controllers: [ParishController],
  providers: [
    ParishService,
    PrismaService,
    {
      provide: ParishRepository,
      useClass: PrismaParishRepository,
    },
  ],
  imports: [ChurchModule],
  exports: [ParishService, ParishRepository],
})
export class ParishModule {}
