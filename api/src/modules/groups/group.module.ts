import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { GroupService } from './services/group.service';
import { GroupController } from './controllers/group.controller';
import GroupRepository from './repository/group.repository';
import { GroupImplementation } from './repository/prisma/group.implementation';
import { MemberModule } from '../members/member.module';

@Module({
  controllers: [GroupController],
  imports: [MemberModule],
  providers: [
    GroupService,
    PrismaService,
    {
      provide: GroupRepository,
      useClass: GroupImplementation,
    },
  ],
})
export class GroupModule {}
