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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  ExpenseCategory,
  ExpenseStatus,
  IExpense,
  PaymentMethod,
} from "@/lib/interfaces/expense.interface";
import { use, useActionState, useEffect, useTransition } from "react";
import {
  CreateExpenseSchema,
  FormCreateExpense,
} from "@/lib/schemas/expense.schema";
import { RegisterActionDespesa, StateFormAction } from "../actions";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface DialogFormProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  editingDespesa: IExpense | null;
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
}

const getCategoriaToEnum = (categoria: string) => {
  const res = Object.values(ExpenseCategory).find(
    (cat) => cat === categoria
  );
  if (res) return res;
  return ExpenseCategory.OUTRO;
};

const getStatusToEnum = (status: string) => {
  const res = Object.values(ExpenseStatus).find((st) => st === status);
  if (res) return res;
  return ExpenseStatus.PENDENTE;
};

const getPaymentMethodToEnum = (method: string) => {
  const res = Object.values(PaymentMethod).find((m) => m === method);
  if (res) return res;
  return PaymentMethod.DINHEIRO;
};

export function DialogForm({
  isDialogOpen,
  setIsDialogOpen,
  editingDespesa,
  selectedDate,
  setSelectedDate,
}: DialogFormProps) {
  const [state, formAction, isPending] = useActionState<
    StateFormAction,
    FormCreateExpense
  >(RegisterActionDespesa, {
    success: null,
    info: { title: "", message: "", error: null },
  });

  const [isTransitioning, startTransition] = useTransition();

  const form = useForm<FormCreateExpense>({
    resolver: zodResolver(CreateExpenseSchema),
    defaultValues: {
      descricao: editingDespesa?.descricao || "",
      categoria:
        getCategoriaToEnum(editingDespesa?.categoria ?? "") ||
        ExpenseCategory.OUTRO,
      valor: editingDespesa?.valor || 0,
      data: editingDespesa
        ? format(new Date(editingDespesa.data), "yyyy-MM-dd")
        : "",
      // fornecedor: editingDespesa?.fornecedor || "",
      forma_pagamento:
        getPaymentMethodToEnum(editingDespesa?.forma_pagamento?? '') ||
        PaymentMethod.DINHEIRO,
      status: getStatusToEnum() || ExpenseStatus.PENDENTE,
      // numeroNF: editingDespesa?.numeroNF || "",
      observacao: editingDespesa?.observacao || "",
      created_by: 1,
    },
  });

  const { isSubmitting } = form.formState;
  const isLoading = isPending || isTransitioning || isSubmitting;
  // Handle success

  const handleSubmit = (values: FormCreateExpense) => {
    startTransition(() => {
      formAction(values);
    });
  };

  useEffect(() => {
    if (state.success) {
      form.reset();
      setSelectedDate(undefined);
      setIsDialogOpen(false);
    }
  }, [state]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingDespesa ? "Editar Despesa" : "Nova Despesa"}
          </DialogTitle>
          <DialogDescription>
            {editingDespesa
              ? "Edite as informações da despesa"
              : "Registre uma nova despesa da igreja"}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="despesa-form"
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Input
                  id="descricao"
                  {...form.register("descricao")}
                  placeholder="Descrição da despesa"
                  defaultValue={editingDespesa?.descricao}
                />
                <p className="text-sm text-red-600">
                  {form.formState.errors.descricao?.message}
                </p>
              </div>

              <div className="space-y-2">
                <FormField
                  name="categoria"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(ExpenseCategory).map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="valor">Valor</Label>
                <Input
                  id="valor"
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  {...form.register("valor", { valueAsNumber: true })}
                  defaultValue={editingDespesa?.valor}
                />
                <p className="text-sm text-red-600">
                  {form.formState.errors.valor?.message}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="data">Data</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate
                        ? format(selectedDate, "PPP", { locale: ptBR })
                        : "Selecione a data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        setSelectedDate(date);
                        form.setValue(
                          "data",
                          date ? format(date, "yyyy-MM-dd") : ""
                        );
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <p
                  className="
                  text-sm text-red-600"
                >
                  {form.formState.errors.data?.message}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fornecedor">Fornecedor</Label>
                <Input
                  id="fornecedor"
                  placeholder="Nome do fornecedor"
                  defaultValue={editingDespesa?.fornecedor ?? ""}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  name="forma_pagamento"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Forma de Pagamento</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a forma" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(PaymentMethod).map((method) => (
                            <SelectItem key={method} value={method}>
                              {method}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  name="status"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(ExpenseStatus).map((status) => (
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="numeroNF">Número da NF (opcional)</Label>
                <Input
                  id="numeroNF"
                  placeholder="NF-2024-001"
                  defaultValue={editingDespesa?.numeroNF ?? ""}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  rows={4}
                  {...form.register("observacao")}
                  placeholder="Informações adicionais sobre a despesa"
                  defaultValue={editingDespesa?.observacao ?? ""}
                />
                <p className="text-sm text-red-600">
                  {form.formState.errors.observacao?.message}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button disabled={isLoading}>
                {editingDespesa ? "Salvar Alterações" : "Registrar Despesa"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
