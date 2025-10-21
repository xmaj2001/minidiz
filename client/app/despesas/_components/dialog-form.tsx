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
  CreateExpenseData,
  ExpenseCategory,
  ExpenseStatus,
  IExpense,
  PaymentMethod,
} from "@/lib/interfaces/expense.interface";
import { useEffect } from "react";
import {
  CreateExpenseSchema,
  FormCreateExpense,
} from "@/lib/schemas/expense.schema";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useExpenseMutations } from "@/hooks/use-expense-motation";

interface DialogFormProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  editingDespesa: IExpense | null;
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
}

const getCategoriaToEnum = (categoria: string) => {
  return (
    Object.values(ExpenseCategory).find((cat) => cat === categoria) ||
    ExpenseCategory.OUTRO
  );
};

const getStatusToEnum = (status: string) => {
  return (
    Object.values(ExpenseStatus).find((st) => st === status) ||
    ExpenseStatus.PENDENTE
  );
};

const getPaymentMethodToEnum = (method: string) => {
  return (
    Object.values(PaymentMethod).find((m) => m === method) ||
    PaymentMethod.DINHEIRO
  );
};

export function DialogForm({
  isDialogOpen,
  setIsDialogOpen,
  editingDespesa,
  selectedDate,
  setSelectedDate,
}: DialogFormProps) {
  const { saveExpense, isSaving } = useExpenseMutations();
  const { toast } = useToast();

  const form = useForm<FormCreateExpense>({
    resolver: zodResolver(CreateExpenseSchema),
    defaultValues: {
      descricao: "",
      categoria: ExpenseCategory.OUTRO,
      valor: 0,
      data: "",
      forma_pagamento: PaymentMethod.DINHEIRO,
      status: ExpenseStatus.PENDENTE,
      observacao: "",
      created_by: 1
    },
  });

  useEffect(() => {
    if (editingDespesa) {
      form.reset({
        descricao: editingDespesa.descricao,
        categoria: getCategoriaToEnum(editingDespesa.categoria),
        valor: editingDespesa.valor,
        data: format(new Date(editingDespesa.data), "yyyy-MM-dd"),
        forma_pagamento: getPaymentMethodToEnum(editingDespesa.forma_pagamento),
        status: getStatusToEnum(editingDespesa.status),
        observacao: editingDespesa.observacao,
        // created_by: editingDespesa.created_by,
      });
      setSelectedDate(new Date(editingDespesa.data));
    } else {
      form.reset();
      setSelectedDate(undefined);
    }
  }, [editingDespesa, form, setSelectedDate]);

  const handleSubmit = form.handleSubmit(async (values) => {
    // const payload = editingDespesa ? { ...values, id: editingDespesa.id } : values;
    const payload: CreateExpenseData = {
      descricao: values.descricao,
      valor: values.valor,
      data: format(new Date(values.data), "yyyy-MM-dd"),
      categoria: values.categoria,
      observacao: values.observacao ?? undefined,
      created_by: values.created_by,
      status: values.status,
      forma_pagamento: values.forma_pagamento,
    };

    try {
      await saveExpense(payload);

      // Sucesso:
      toast({
        title: "Sucesso!",
        description: `Despesa ${
          editingDespesa ? "atualizada" : "registrada"
        } com sucesso.`,
      });

      form.reset();
      setSelectedDate(undefined);
      setIsDialogOpen(false);
    } catch (error) {
      // Erro:
      toast({
        title: "Erro ao Salvar",
        description: "Não foi possível completar a operação. Tente novamente.",
        variant: "destructive",
      });
    }
  });

  const isLoading = isSaving || form.formState.isSubmitting;

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
            onSubmit={handleSubmit} // Usa o handleSubmit com o useMutation
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* DESCRIÇÃO */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Input
                  id="descricao"
                  {...form.register("descricao")}
                  placeholder="Descrição da despesa"
                />
                <p className="text-sm text-red-600">
                  {form.formState.errors.descricao?.message}
                </p>
              </div>

              {/* CATEGORIA */}
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

              {/* VALOR */}
              <div className="space-y-2">
                <Label htmlFor="valor">Valor</Label>
                <Input
                  id="valor"
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  {...form.register("valor", { valueAsNumber: true })}
                />
                <p className="text-sm text-red-600">
                  {form.formState.errors.valor?.message}
                </p>
              </div>

              {/* DATA */}
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

              {/* FORNECEDOR (Use register se estiver no schema) */}
              {/* <div className="space-y-2">
                <Label htmlFor="fornecedor">Fornecedor</Label>
                <Input
                  id="fornecedor"
                  placeholder="Nome do fornecedor"
                  {...form.register("fornecedor")}
                />
              </div> */}

              {/* FORMA DE PAGAMENTO */}
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

              {/* STATUS */}
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

              {/* OBSERVAÇÕES */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  rows={4}
                  {...form.register("observacao")}
                  placeholder="Informações adicionais sobre a despesa"
                />
                <p className="text-sm text-red-600">
                  {form.formState.errors.observacao?.message}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                type="button"
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading
                  ? "Salvando..."
                  : editingDespesa
                  ? "Salvar Alterações"
                  : "Registrar Despesa"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
