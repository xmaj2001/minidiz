"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
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
import {
  createMemberSchema,
  FormCreateMember,
} from "@/lib/schemas/member.schema";
import { useActionState, useEffect, useTransition } from "react";
import { RegisterMember, StateFormAction } from "../actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, Terminal } from "lucide-react";

interface FormProps {
  onCreating: (v: boolean) => void;
}

export default function MemberRegistrationForm({ onCreating }: FormProps) {
  const [state, formAction, isloading] = useActionState<
    StateFormAction,
    FormCreateMember
  >(RegisterMember, {
    success: null,
    info: {
      title: "",
      message: "",
    },
  });
  const [stateTrans, startTrans] = useTransition();
  const form = useForm<FormCreateMember>({
    resolver: zodResolver(createMemberSchema),
    defaultValues: {
      nome: "",
      sobreNome: "",
      email: "",
      telefone: "",
      data_nascimento: "",
      endereco: "",
      observacoes: "",
      status: "ATIVO",
      genero: "MASCULINO",
    },
  });
  const {
    formState: { errors },
  } = form;
  const onSubmit = async (values: FormCreateMember) => {
    console.log("Dados:", values);
    onCreating(true);
    startTrans(() => {
      formAction(values);
    });
    // Aqui você pode chamar sua API, ex:
    // await fetch("/api/members", { method: "POST", body: JSON.stringify(values) })
  };
  useEffect(() => {
    const verify = () => {
      if (state.success != null && state.success) {
        form.reset();
        onCreating(false);
      } else if (state.success != null) onCreating(state.success);
    };
    verify();
  }, [state]);

  console.table(errors);
  return (
    <DrawerContent className="px-4">
      <DrawerHeader>
        <DrawerTitle>CADASTRAR NOVO MEMBRO</DrawerTitle>
        <DrawerDescription>Adicione um novo membro à igreja</DrawerDescription>
      </DrawerHeader>
      {state.success != null && (
        <Alert
          variant={state.success ? "default" : "destructive"}
          className={`my-4 ${
            state.success ? "border-green-500 text-green-500" : "border-red-500"
          }`}
        >
          <AlertCircleIcon />
          <AlertTitle>{state.info.title}</AlertTitle>
          <AlertDescription>
            <p>{state.info.message}</p>
            <ul className="list-inside list-disc text-sm">
              {state.info.error?.errors.map((e) => {
                return (
                  <>
                    <ul className="list-inside list-disc text-sm">
                      {e.errors.map((i) => {
                        return (
                          <>
                            <li>{i}</li>
                          </>
                        );
                      })}
                    </ul>
                  </>
                );
              })}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o primeiro nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sobreNome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sobrenome</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o sobrenome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="email@exemplo.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="telefone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input placeholder="+244999999999" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="data_nascimento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de Nascimento</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="genero"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gênero</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um gênero" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="MASCULINO">Masculino</SelectItem>
                    <SelectItem value="FEMININO">Feminino</SelectItem>
                    <SelectItem value="OUTRO">Outro</SelectItem>
                    <SelectItem value="NAO_INFORMADO">Não Informado</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ATIVO">Ativo</SelectItem>
                    <SelectItem value="INATIVO">Inativo</SelectItem>
                    <SelectItem value="PENDENTE">Pendente</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endereco"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Endereço</FormLabel>
                <FormControl>
                  <Input placeholder="Rua, número, bairro, cidade" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="observacoes"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Observações</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Informações adicionais sobre o membro"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DrawerFooter className="col-span-2">
            <Button type="submit" disabled={isloading}>
              {isloading ? "Aguarda o Registro" : " Adicionar Membro"}
            </Button>
            <DrawerClose>
              <Button variant="outline" type="button">
                Cancelar
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </Form>
    </DrawerContent>
  );
}
