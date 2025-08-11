"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useSupabaseCreateVisitorMutation } from "@/hooks/use-supabase-visitors-query"
import { validateCPF, formatCPF } from "@/lib/utils"
import type { ChangeEvent } from "react"

const visitorSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(100, "Nome muito longo"),
  cpf: z.string().refine(validateCPF, "CPF inválido"),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  birthDate: z.string().optional(),
  destinationRoom: z.string().min(1, "Sala de destino é obrigatória"),
})

export type VisitorFormData = z.infer<typeof visitorSchema>

export function useVisitorForm() {
  const createVisitorMutation = useSupabaseCreateVisitorMutation()

  const form = useForm<VisitorFormData>({
    resolver: zodResolver(visitorSchema),
    defaultValues: {
      name: "",
      cpf: "",
      email: "",
      birthDate: "",
      destinationRoom: "",
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = form

  const selectedRoom = watch("destinationRoom")

  const onSubmit = async (data: VisitorFormData) => {
    try {
      await createVisitorMutation.mutateAsync({
        ...data,
        email: data.email || undefined,
        birthDate: data.birthDate || undefined,
      })
      reset()
    } catch (error) {
      console.error("Error creating visitor:", error)
    }
  }

  const handleCPFChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value)
    setValue("cpf", formatted)
  }

  const handleRoomSelect = (value: string) => {
    setValue("destinationRoom", value)
  }

  return {
    // Form methods
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    setValue,
    watch,
    reset,

    // Form state
    selectedRoom,
    isSubmitting: createVisitorMutation.isPending,

    // Custom handlers
    handleCPFChange,
    handleRoomSelect,

    // Mutation state
    createVisitorMutation,
  }
}
