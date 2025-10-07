import { useState, useEffect } from "react";

/**
 * Hook para atrasar a atualização de um valor.
 * Útil para adiar chamadas de API até que o usuário pare de digitar.
 *
 * @param value O valor a ser debatido (geralmente uma string de pesquisa).
 * @param delay O tempo de atraso em milissegundos (ex: 500ms).
 * @returns O valor debatido.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Configura um timer para atualizar o valor debatido após o atraso
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Função de limpeza: cancela o timer anterior se o 'value' ou 'delay' mudar
    // ou se o componente for desmontado.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Reexecuta o efeito se 'value' ou 'delay' mudar

  return debouncedValue;
}
