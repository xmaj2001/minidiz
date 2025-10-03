import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { MemberService } from './services/member.service';
import { MemberController } from './controllers/member.controller';
import MemberRepository from './repository/member.repository';
import { MemberImplementation } from './repository/prisma/member.implementation';

@Module({
  controllers: [MemberController],
  exports: [MemberRepository, MemberService],
  providers: [
    MemberService,
    PrismaService,
    {
      provide: MemberRepository,
      useClass: MemberImplementation,
    },
  ],
})
export class MemberModule {}
