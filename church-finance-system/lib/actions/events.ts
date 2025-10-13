"use server"

import { revalidatePath } from "next/cache"
import { mockEvents, mockMembers } from "@/lib/mock-data"
import type { Event, EventFormData } from "@/lib/types"

let eventsDB = [...mockEvents]

export async function getEventsAction(): Promise<Event[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return eventsDB
}

export async function getEventByIdAction(id: number): Promise<Event | null> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return eventsDB.find((e) => e.id === id) || null
}

export async function createEventAction(data: EventFormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const responsavel = mockMembers.find((m) => m.id === data.responsavel_id)

  const newEvent: Event = {
    id: eventsDB.length + 1,
    nome: data.nome,
    descricao: data.descricao,
    data_inicio: data.data_inicio,
    data_fim: data.data_fim,
    local: data.local,
    responsavel_id: data.responsavel_id,
    orcamento: data.orcamento,
    participantes_esperados: data.participantes_esperados,
    status: data.status,
    created_by: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    responsavel,
  }

  eventsDB.push(newEvent)
  revalidatePath("/eventos")

  return { success: true, data: newEvent }
}

export async function updateEventAction(id: number, data: EventFormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const index = eventsDB.findIndex((e) => e.id === id)
  if (index === -1) {
    return { error: "Evento não encontrado" }
  }

  const responsavel = mockMembers.find((m) => m.id === data.responsavel_id)

  eventsDB[index] = {
    ...eventsDB[index],
    nome: data.nome,
    descricao: data.descricao,
    data_inicio: data.data_inicio,
    data_fim: data.data_fim,
    local: data.local,
    responsavel_id: data.responsavel_id,
    orcamento: data.orcamento,
    participantes_esperados: data.participantes_esperados,
    status: data.status,
    updated_at: new Date().toISOString(),
    responsavel,
  }

  revalidatePath("/eventos")
  return { success: true, data: eventsDB[index] }
}

export async function deleteEventAction(id: number) {
  await new Promise((resolve) => setTimeout(resolve, 500))

  eventsDB = eventsDB.filter((e) => e.id !== id)
  revalidatePath("/eventos")

  return { success: true }
}
