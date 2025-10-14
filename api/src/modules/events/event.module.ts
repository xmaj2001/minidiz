import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { EventService } from './services/event.service';
import { EventController } from './controllers/event.controller';
import EventRepository from './repository/event.repository';
import { EventImplementation } from './repository/prisma/event.implementation';
import { MemberModule } from '../members/member.module';
import { UserModule } from '../users/user.module';

@Module({
  controllers: [EventController],
  exports: [EventRepository, EventService],
  imports: [MemberModule, UserModule],
  providers: [
    EventService,
    PrismaService,
    {
      provide: EventRepository,
      useClass: EventImplementation,
    },
  ],
})
export class EventModule {}
