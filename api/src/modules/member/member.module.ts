import { Module } from '@nestjs/common';
import { MemberController } from './controllers/member.controller';
import { MemberService } from './services/member.service';
import { PrismaService } from 'nestjs-prisma';
import { ParishModule } from '../parish/parish.module';
import MemberRespository from './repository/member.repository';
import PrismaMemberRepository from './repository/prisma/member.prisma';

@Module({
  controllers: [MemberController],
  providers: [
    MemberService,
    PrismaService,
    {
      provide: MemberRespository,
      useClass: PrismaMemberRepository,
    },
  ],
  imports: [ParishModule],
})
export class MemberModule {}
