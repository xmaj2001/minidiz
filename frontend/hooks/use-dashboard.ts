import { dashboardServices } from "@/services/dashboard/dashboard.service";
import { useEffect, useState } from "react";

export interface DashboardStates {
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
}

export function useDashboard() {
    const [states, setStates] = useState<DashboardStates | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const loadingStates = async () => {
        setLoading(true)
        const res = await dashboardServices.info()
        if (res)
            setStates(res.data)
        setLoading(false)
    }

    useEffect(() => {
        loadingStates()
    }, [])

    return ({
        states,
        loading,
        loadingStates
    })
}
