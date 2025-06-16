import { Module } from '@nestjs/common';
import { PaymentModule } from './modules/payments/payment.module';
import { DatabaseService } from './database/database.service';
import { MemberModule } from './modules/members/member.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@Module({
  imports: [PaymentModule, MemberModule, DashboardModule],
  providers: [DatabaseService],
})
export class AppModule {}