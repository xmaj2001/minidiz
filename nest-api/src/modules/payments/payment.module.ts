import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { DatabaseService } from '../../database/database.service';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, DatabaseService],
})
export class PaymentModule {}