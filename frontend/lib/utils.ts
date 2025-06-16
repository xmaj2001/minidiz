import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatMony = (value: number) => {
  return ((new Intl.NumberFormat('pt-AO', { currency: 'AOA', style: 'currency' })).format(value))
}
export const getDay = (date: Date, format: "long" | "short" | "narrow" = 'long') => {
  return new Intl.DateTimeFormat('pt-AO', { weekday: format }).format(date)
}

export const getMonth = (month: number) => {
  const date = new Date(2001, month, 0);
  return new Intl.DateTimeFormat('pt-AO', { month: 'short' }).format(date).replace('.', '')
}