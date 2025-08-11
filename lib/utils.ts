import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCPF(cpf: string): string {
  const numbers = cpf.replace(/\D/g, "")
  return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
}

export function validateCPF(cpf: string): boolean {
  const numbers = cpf.replace(/\D/g, "")

  if (numbers.length !== 11) return false

  // Check for repeated numbers
  if (/^(\d)\1{10}$/.test(numbers)) return false

  // Validate first digit
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += Number.parseInt(numbers[i]) * (10 - i)
  }
  let digit1 = 11 - (sum % 11)
  if (digit1 > 9) digit1 = 0

  if (Number.parseInt(numbers[9]) !== digit1) return false

  // Validate second digit
  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += Number.parseInt(numbers[i]) * (11 - i)
  }
  let digit2 = 11 - (sum % 11)
  if (digit2 > 9) digit2 = 0

  return Number.parseInt(numbers[10]) === digit2
}

export function formatDateTime(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function formatDate(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleDateString("pt-BR")
}

export function calculateDuration(entryTime: string, exitTime?: string): string {
  const entry = new Date(entryTime)
  const exit = exitTime ? new Date(exitTime) : new Date()

  const diffMs = exit.getTime() - entry.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

  if (diffHours > 0) {
    return `${diffHours}h ${diffMinutes}m`
  }
  return `${diffMinutes}m`
}
