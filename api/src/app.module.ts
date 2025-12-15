import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { AppController } from './modules/app/app.controller';
import { AppService } from './modules/app/app.service';
import { CacheModule } from '@nestjs/cache-manager';
import { JwtModule } from '@nestjs/jwt';
// import { ActivityLogModule } from './modules/activitylog/activityLog.module';
import { ChurchModule } from './modules/church/church.module';
import { ParishModule } from './modules/parish/parish.module';
import { MemberModule } from './modules/member/member.module';
import { GroupModule } from './modules/group/group.module';
import { ContributionModule } from './modules/contribution/contribution.module';
import { FundModule } from './modules/fund/fund.module';
import { ExpenseModule } from './modules/expense/expense.module';
@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 5, // seconds
      max: 10, // maximum number of items in cache
    }),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET ?? 'secretKey',
      signOptions: { expiresIn: '60s' },
    }),
    PrismaModule.forRoot(),
    ChurchModule,
    ParishModule,
    MemberModule,
    GroupModule,
    ContributionModule,
    FundModule,
    ExpenseModule,
  ],
})
export class AppModule {}
