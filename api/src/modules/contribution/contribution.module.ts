import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { ContributionService } from './services/contribution.service';
import { ContributionController } from './controllers/contribution.controller';
import ContributionRepository from './repository/contribution.repository';
import { ContributionImplementation } from './repository/prisma/contribution.implementation';
import { MemberModule } from '../members/member.module';
import { EventModule } from '../events/event.module';

@Module({
  controllers: [ContributionController],
  imports: [MemberModule, EventModule],
  exports: [ContributionRepository, ContributionService],
  providers: [
    ContributionService,
    PrismaService,
    {
      provide: ContributionRepository,
      useClass: ContributionImplementation,
    },
  ],
})
export class ContributionModule {}
