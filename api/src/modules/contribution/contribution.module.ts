import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { ContributionService } from './services/contribution.service';
import { ContributionController } from './controllers/contribution.controller';
import ContributionRepository from './repository/contribution.repository';
import { ContributionImplementation } from './repository/prisma/contribution.implementation';
import { EventModule } from '../events/event.module';
import { MemberModule } from '../members/member.module';
import { UserModule } from '../users/user.module';

@Module({
  controllers: [ContributionController],
  imports: [MemberModule, EventModule, UserModule],
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
