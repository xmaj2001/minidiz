import { Controller, Get, HttpCode } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @HttpCode(200)
  async getDashboardData() {
    const data = await this.dashboardService.getDashboardData();
    return { data, message: 'Dados do dashboard recuperados com sucesso' };
  }
}