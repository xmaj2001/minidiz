"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { IMember } from "@/lib/interfaces/member.interface";
import {
  createDoacaoSchema,
  FormCreateDoacao,
} from "@/lib/schemas/contribution.schema";
import { useActionState, useTransition } from "react";
import { RegisterActionContributions, StateFormAction } from "../actions";

const PAYMENT_METHODS = [
  "NENHUM",
  "DINHEIRO",
  "EXPRESS",
  "CARTAO",
  "TRANSFERENCIA",
  "CHEQUE",
  "OUTRO",
] as const;

const CONTRIBUTION_STATUSES = ["PENDENTE", "RECEBIDO", "CANCELADO"] as const;

interface RegisterContributionFormProps {
  selectedMember: IMember;
  onOpen: (v: boolean) => void;
  onSuccess?: (v: StateFormAction) => void;
}

export function RegisterContributionForm({
  selectedMember,
  onOpen,
  onSuccess,
}: RegisterContributionFormProps) {
  const [state, formAction, isPending] = useActionState<
    StateFormAction,
    FormCreateDoacao
  >(RegisterActionContributions, {
    success: null,
    info: {
      title: "",
      message: "",
    },
  });

  const [isTransitioning, startTransition] = useTransition();

  const form = useForm<FormCreateDoacao>({
    resolver: zodResolver(createDoacaoSchema),
    defaultValues: {
      member_id: selectedMember.id,
      valor: 0.01,
      data: new Date().toISOString().split("T")[0],
      metodo: "NENHUM",
      status: "PENDENTE",
      finalidade: "",
      observacao: "",
      created_by: 1,
    },
    mode: "onChange",
  });

  const { isSubmitting } = form.formState;
  const isLoading = isPending || isTransitioning || isSubmitting;
  // Handle success
  if (state.success && onSuccess) {
    onSuccess(state);
    onOpen(false);
  }

  const handleSubmit = (values: FormCreateDoacao) => {
    startTransition(() => {
      formAction(values);
    });
  };

  // Helper to format payment method display
  const formatPaymentMethod = (method: string) => method.replace(/_/g, " ");

  return (
    <div className="w-full max-w-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Header */}
            <div className="md:col-span-2 space-y-2">
              <h2 className="text-xl font-semibold">Registro de Doação</h2>
              <div className="border p-3 rounded-md bg-muted/50">
                <FormLabel>Membro Contribuinte</FormLabel>
                <p className="font-medium text-secondary">
                  {selectedMember.nome} {selectedMember.sobreNome}
                </p>
              </div>
            </div>

            {/* Método de Pagamento */}
            <FormField
              control={form.control}
              name="metodo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Forma de Pagamento</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isLoading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a forma" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PAYMENT_METHODS.map((method) => (
                        <SelectItem key={method} value={method}>
                          {formatPaymentMethod(method)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Valor */}
            {form.watch("metodo") !== "NENHUM" && (
              <FormField
                control={form.control}
                name="valor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor (AOA / R$)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value) || 0)
                        }
                        value={field.value === 0 ? "" : field.value}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Data */}
            <FormField
              control={form.control}
              name="data"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Data</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                          disabled={isLoading}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(new Date(field.value), "PPP", {
                              locale: ptBR,
                            })
                          ) : (
                            <span>Selecione a data</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) =>
                          field.onChange(
                            date?.toISOString().split("T")[0] || ""
                          )
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isLoading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CONTRIBUTION_STATUSES.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Descricao */}

            <FormField
              control={form.control}
              name="descricao"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Descricao (Opcional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Informações adicionais sobre a contribuição"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Finalidade */}
            <FormField
              control={form.control}
              name="finalidade"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Finalidade (Opcional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Dízimo da obra missionária"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Observações */}
            <FormField
              control={form.control}
              name="observacao"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Observações (Opcional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Informações adicionais sobre a contribuição"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Error/Success Messages */}
          {state.info.message && (
            <div
              className={cn(
                "p-4 rounded-md text-sm",
                state.success
                  ? "bg-green-100 text-green-800"
                  : "bg-destructive/10 text-destructive"
              )}
            >
              <strong>{state.info.title}:</strong> {state.info.message}
            </div>
          )}

          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Registrando..." : "Registrar Dízimo"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
