'use client';

import { CreateExpenseData, IExpense } from '@/lib/interfaces/expense.interface';
import { ExpenseServices } from '@/lib/services/expense.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// Esta é a interface que o seu formulário envia. 
// A função de mutação deve ser capaz de lidar tanto com criação (sem ID) quanto com atualização (com ID).
type ExpensePayload = CreateExpenseData;

export function useExpenseMutations() {
  const queryClient = useQueryClient();

  // Função centralizada para salvar (criar ou editar)
  const { mutateAsync: saveExpense, isPending: isSaving } = useMutation<IExpense, Error, ExpensePayload>({
    mutationFn: async (data: ExpensePayload): Promise<IExpense> => {
      const apiResponse = await ExpenseServices.create(data, 1, "teste");
      const expense = apiResponse.result;
      if (apiResponse.success === false || !expense) {
        if(process.env.NODE_ENV === 'development') {
          console.error('Erro na API ao criar/editar despesa:', apiResponse.error);
        }
        throw new Error(apiResponse.error?.message ?? 'Resposta inválida da API ao criar/editar despesa');
      }
      return expense;
    },
    
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['expenses'] }); 
      
      // 2. Opcional: Se você tivesse um endpoint separado para o resumo/estatísticas (e você deveria),
      // você o invalidaria aqui para forçar o recálculo dos cards.
      // await queryClient.invalidateQueries({ queryKey: ['expenseSummary'] }); 

      console.log('Cache de despesas invalidado com sucesso.');
    },
    
    onError: (error) => {
      console.error('Erro na mutação de despesa:', error);
      // Aqui você poderia usar um toast para mostrar o erro ao usuário.
    }
  });

  const { mutateAsync: deleteExpense, isPending: isDeleting } = useMutation({
    mutationFn: async (id: number) => {
      const apiResponse = await ExpenseServices.remove(id,"teste");
      if (apiResponse === false) {
        throw new Error('Resposta inválida da API ao deletar despesa');
      }
      return apiResponse;
    },
    onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['expenses'] }); 
    }
  });

  return { 
      saveExpense, 
      isSaving, 
      deleteExpense, 
      isDeleting 
  };
}
