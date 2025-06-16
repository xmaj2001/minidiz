import { Module } from '@nestjs/common';
import { MemberServices } from './member.service';
import { MemberController } from './member.controller';
import { DatabaseService } from '../../database/database.service';

@Module({
  controllers: [MemberController],
  providers: [MemberServices, DatabaseService],
})
export class MemberModule {}