import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: DatabaseService) {}

  async getDashboardData() {
    const now = new Date('2025-06-14T23:20:00+01:00'); // Data atual em WAT (UTC+1)
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfThisMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);

    // 1. Total de membros e percentagem
    const totalMembers = await this.prisma.member.count({ where: { status: 'active' } });
    const membersLastMonth = await this.prisma.member.count({
      where: {
        status: 'active',
        createdAt: { lte: endOfLastMonth },
      },
    });
    const membersPercentageChange = membersLastMonth
      ? ((totalMembers - membersLastMonth) / membersLastMonth) * 100
      : 0;

    // 2. Total de pagamentos e percentagem
    const totalPaymentsThisMonth = await this.prisma.payment.aggregate({
      _sum: { amount: true },
      where: {
        date: { gte: startOfThisMonth, lte: endOfThisMonth },
      },
    });
    const totalPaymentsLastMonth = await this.prisma.payment.aggregate({
      _sum: { amount: true },
      where: {
        date: { gte: startOfLastMonth, lte: endOfLastMonth },
      },
    });
    const paymentsThisMonthValue = totalPaymentsThisMonth._sum.amount || 0;
    const paymentsLastMonthValue = totalPaymentsLastMonth._sum.amount || 0;
    const paymentsPercentageChange = paymentsLastMonthValue
      ? ((paymentsThisMonthValue - paymentsLastMonthValue) / paymentsLastMonthValue) * 100
      : 0;

    // 3. Total de pagamentos hoje
    const totalPaymentsToday = await this.prisma.payment.aggregate({
      _sum: { amount: true },
      where: {
        date: { gte: startOfToday, lte: endOfToday },
      },
    });
    const paymentsTodayValue = totalPaymentsToday._sum.amount || 0;

    // 4. Arrecadação mensal vs. meta
    const monthlyRevenue = await this.prisma.payment.groupBy({
      by: ['date'],
      _sum: { amount: true },
      orderBy: { date: 'asc' },
    });
    const monthlyGoals = await this.prisma.monthlyGoal.findMany({
    orderBy: { month: 'desc' }
    });
    const monthlyData = monthlyGoals.map((goal) => {
      const startOfMonth = new Date(goal.year, goal.month - 1, 1);
      const endOfMonth = new Date(goal.year, goal.month, 0, 23, 59, 59, 999);
      const total = monthlyRevenue
        .filter((payment) => {
          const paymentDate = new Date(payment.date);
          return paymentDate >= startOfMonth && paymentDate <= endOfMonth;
        })
        .reduce((sum, payment) => sum + (payment._sum.amount || 0), 0);
      const percentage = goal.goal ? (total / goal.goal) * 100 : 0;
      return {
        year: goal.year,
        month: goal.month,
        total,
        goal: goal.goal,
        percentage: parseFloat(percentage.toFixed(2)),
      };
    });

    // 5. Top 5 contribuintes em 2025
    const topContributors = await this.prisma.payment.groupBy({
      by: ['memberId'],
      _sum: { amount: true },
      _count: { _all: true },
      where: {
        date: { gte: startOfYear, lte: endOfYear },
      },
      orderBy: { _sum: { amount: 'desc' } },
      take: 5,
    });

    const topContributorsData = await Promise.all(
      topContributors.map(async (contributor) => {
        const member = await this.prisma.member.findUnique({
          where: { id: contributor.memberId },
          select: { id: true, name: true },
        });

        // Contar meses distintos de contribuição
        const distinctMonths = await this.prisma.payment.groupBy({
          by: ['date'],
          where: {
            memberId: contributor.memberId,
            date: { gte: startOfYear, lte: endOfYear },
          },
          // select: {date: true},
        });

        const frequency = new Set(
          distinctMonths.map((payment) => new Date(payment.date).getMonth() + 1)
        ).size;

        return {
          id: member?.id || contributor.memberId,
          name: member?.name || 'Desconhecido',
          totalContributed: parseFloat(contributor._sum.amount?.toFixed(2) || '0'),
          frequency,
        };
      })
    );

    return {
      members: {
        total: totalMembers,
        percentageChange: parseFloat(membersPercentageChange.toFixed(2)),
      },
      payments: {
        totalThisMonth: paymentsThisMonthValue,
        percentageChange: parseFloat(paymentsPercentageChange.toFixed(2)),
      },
      todayPayments: {
        total: paymentsTodayValue,
      },
      monthlyRevenue: monthlyData,
      topContributors: topContributorsData,
    };
  }
}
