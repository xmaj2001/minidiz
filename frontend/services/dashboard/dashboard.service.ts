import { api } from "@/config/settings"

interface DashboardResponse {
    data: {
        members: {
            total: number;
            percentageChange: number;
        };
        payments: {
            totalThisMonth: number;
            percentageChange: number;
        };
        todayPayments: {
            total: number;
        };
        monthlyRevenue: Array<{
            year: number;
            month: number;
            total: number;
            goal: number;
            percentage: number;
        }>;
        topContributors: Array<{
            id: number;
            name: string;
            totalContributed: number;
            frequency: number;
        }>;
    };
    message: string;
}

export const dashboardServices = {
    info: async () => {
        try {
            const res = await fetch(api.dashboard,{
                method:'GET',
                headers:{
                    'Content-Type': 'Application/json'
                }
            })
            const data = await res.json()
            if (res.ok)
                return (data as DashboardResponse)
            return (null)
        } catch (error) {
            console.error("Erro ao carregar os estatus da dashboard: ", error)
            return (null)
        }
    }
}