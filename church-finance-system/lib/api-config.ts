export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

export const API_ENDPOINTS = {
  users: "/users",
  members: "/members",
  groups: "/groups",
  events: "/events",
  expenses: "/expenses",
  contributions: "/contributions",
  activityLogs: "/activityLogs",
} as const

export async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`)
  }

  return response.json()
}
