"use server"

import { mockActivityLogs } from "@/lib/mock-data"
import type { ActivityLog } from "@/lib/types"

export async function getActivityLogsAction(): Promise<ActivityLog[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockActivityLogs
}

export async function getActivityLogsByUserAction(userId: number): Promise<ActivityLog[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockActivityLogs.filter((log) => log.user_id === userId)
}

export async function getActivityLogsByEntityAction(entity: string): Promise<ActivityLog[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockActivityLogs.filter((log) => log.entidade === entity)
}
