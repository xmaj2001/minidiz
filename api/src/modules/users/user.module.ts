import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import UserRepository from './repository/user.repository';
import { UserImplementation } from './repository/prisma/user.implementation';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    {
      provide: UserRepository,
      useClass: UserImplementation,
    },
  ],
})
export class UserModule {}
