import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { AppController } from './modules/app/app.controller';
import { AppService } from './modules/app/app.service';
import { CacheModule } from '@nestjs/cache-manager';
import { MemberModule } from './modules/members/member.module';
import { GroupModule } from './modules/groups/group.module';
import { EventModule } from './modules/events/event.module';
import { UserModule } from './modules/users/user.module';
import { ExpenseModule } from './modules/expense/expense.module';
import { ContributionModule } from './modules/contribution/contribution.module';
// import { ActivityLogModule } from './modules/activitylog/activityLog.module';
import { EmployeeModule } from './modules/employee/employee.module';
// import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    // CacheModule.register({
    //   isGlobal: true,
    //   ttl: getCacheTTL('1h'), // seconds
    //   max: getCacheTTL('12h'), // maximum number of items in cache
    // }),
    // JwtModule.register({
    //   global: true,
    //   secret: process.env.SECRET ?? "teste",
    //   signOptions: { expiresIn: '60s' },
    // }),
    PrismaModule.forRoot(),
    UserModule,
    GroupModule,
    MemberModule,
    EventModule,
    ExpenseModule,
    ContributionModule,
    EmployeeModule,
  ],
})
export class AppModule {}
