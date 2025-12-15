import { Module } from '@nestjs/common';
import { ChurchController } from './controllers/church.controller';
import { ChurchService } from './services/church.service';
import { PrismaService } from 'nestjs-prisma';
import { ChurchRepository } from './repository/church.repository';
import PrismaChurchRepository from './repository/prisma/church.prisma';

@Module({
  controllers: [ChurchController],
  providers: [
    PrismaService,
    ChurchService,
    {
      provide: ChurchRepository,
      useClass: PrismaChurchRepository,
    },
  ],
  exports: [ChurchService, ChurchRepository],
})
export class ChurchModule {}
