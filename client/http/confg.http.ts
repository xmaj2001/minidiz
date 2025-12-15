export const API = {
  members: `${process.env.NEXT_PUBLIC_API_URL}/member`, // Ex.: "http://localhost:3000/members"
  contributions: `${process.env.NEXT_PUBLIC_API_URL}/contributions`,
  expenses: `${process.env.NEXT_PUBLIC_API_URL}/expenses`,
  events: `${process.env.NEXT_PUBLIC_API_URL}/events`,
  groups: `${process.env.NEXT_PUBLIC_API_URL}/groups`,
  users: `${process.env.NEXT_PUBLIC_API_URL}/users`,
  activityLogs: `${process.env.NEXT_PUBLIC_API_URL}/activity-logs`,
};

export const API_STALE_TIME = {
  members: {
    list: 5 * 60 * 1000, // 5 minutos
    create: 0,
    update: 0,
    delete: 0,
  },
  expenses: {
    list: 5 * 60 * 1000, // 5 minutos
    create: 0,
    update: 0,
    delete: 0,
  },
  contributions: {
    list: 5 * 60 * 1000, // 5 minutos
    create: 0,
    update: 0,
    delete: 0,
  },
  events: {
    list: 5 * 60 * 1000, // 5 minutos
    create: 0,
    update: 0,
    delete: 0,
  },
  groups: {
    list: 5 * 60 * 1000, // 5 minutos
    create: 0,
    update: 0,
    delete: 0,
  },
};

export interface ApiResponse<T> {
  result: T;
  success: boolean;
  message: string;
  error?: ErrorResponse | null;
}

interface FieldError {
  field: string;
  errors: string[];
}

export interface ErrorResponse {
  message: string;
  errors: FieldError[];
}
