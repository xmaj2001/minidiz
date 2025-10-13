"use client";
import { Search, User2 } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { IListaMembers, IMember } from "@/lib/interfaces/member.interface";
import { useEffect, useState, useCallback, useMemo } from "react"; // Adicionado useCallback e useMemo
import { MemberServices } from "@/lib/services/member.service";
import { useDebounce } from "@/hooks/useDebounce";
import { RegisterContributionForm } from "./registration-form";
import {
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useToast } from "@/hooks/use-toast";
// Importa o custom hook

// O ItemMembers não foi alterado (boas práticas: componente de apresentação puro)
interface ItemMembersProps {
  members: IListaMembers;
  onSelectMember: (member: IMember) => void;
}

export function ItemMembers({ members, onSelectMember }: ItemMembersProps) {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <ItemGroup className="gap-4">
        {members.map((member) => (
          <Item
            key={member.id}
            className="hover:border-primary/45 border-[1px] cursor-pointer" // Adicionado cursor-pointer
            variant="default"
            asChild
            role="listitem"
            // Boa prática: usar onClick em vez de <a> se a ação for puramente JS
            onClick={() => onSelectMember(member)}
          >
            <div>
              {" "}
              {/* Troquei <a> por <div> e adicionei onClick no Item */}
              <ItemMedia variant="image">
                <User2 />
              </ItemMedia>
              <ItemContent>
                <ItemTitle className="line-clamp-1">
                  {member.nome} -{" "}
                  <span className="text-muted-foreground">
                    {member.sobreNome}
                  </span>
                </ItemTitle>
                <ItemDescription>
                  {member.email ?? member.telefone}
                </ItemDescription>
              </ItemContent>
              <ItemContent className="flex-none text-center">
                <ItemDescription>{member.status}</ItemDescription>
              </ItemContent>
            </div>
          </Item>
        ))}
      </ItemGroup>
      {/* Boa Prática: feedback visual se não houver resultados */}
      {members.length === 0 && (
        <p className="text-center text-muted-foreground mt-4">
          Nenhum membro encontrado.
        </p>
      )}
    </div>
  );
}

function useSearchMembers(searchTerm: string) {
  const [members, setMembers] = useState<IListaMembers>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Boa prática: usar useCallback para memorizar a função de busca
  const fetchMembers = useCallback(async (query: string) => {
    if (query.trim() === "") {
      setMembers([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const apiReuslt = await MemberServices.search(query);
      if (apiReuslt.success) {
        setMembers(apiReuslt.result);
      } else {
        setMembers([]);
        setError("Falha ao buscar membros.");
      }
    } catch (e) {
      setMembers([]);
      setError("Erro de conexão com a API.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Executa a busca sempre que o termo debatido mudar
  useEffect(() => {
    fetchMembers(searchTerm);
  }, [searchTerm, fetchMembers]);

  return { members, isLoading, error };
}

// -----------------------------------------------------------------------------

interface SearchMembersProps {
  setOpenDialog: (v: boolean) => void;
}

export function SearchMembers({ setOpenDialog }: SearchMembersProps) {
  const [search, setSearch] = useState<string>("");
  const [selectedMember, setSelectedMember] = useState<IMember | null>(null); // Renomeado para camelCase
  const { toast } = useToast();
  // 1. Usar useDebounce para a pesquisa (melhora de performance)
  const debouncedSearchTerm = useDebounce(search, 500); // Debounce de 500ms

  // 2. Usar o custom hook de busca (separação de responsabilidades)
  const { members, isLoading, error } = useSearchMembers(debouncedSearchTerm);

  // Boa Prática: usar useCallback para memorizar a função de handler
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    []
  );

  const handleMemberSelect = useCallback(
    (member: IMember) => {
      setSelectedMember(member);
      console.log("Membro selecionado:", member);
    },
    [setOpenDialog]
  );

  // 3. Exibir feedback de carregamento ou erro
  const resultsContent = useMemo(() => {
    if (isLoading) {
      return <p className="text-center text-purple-400 mt-4">Carregando...</p>;
    }

    if (error) {
      return <p className="text-center text-red-500 mt-4">Erro: {error}</p>;
    }

    if (search.trim() === "") {
      return (
        <p className="text-center text-muted-foreground mt-4">
          Digite para começar a buscar membros.
        </p>
      );
    }

    return (
      <ItemMembers members={members} onSelectMember={handleMemberSelect} />
    );
  }, [isLoading, error, members, handleMemberSelect, search]);

  return (
    <div className="flex justify-center items-center flex-col p-8 w-full gap-6">
      {!selectedMember && (
        <>
          <DrawerHeader>
            <DrawerTitle>Buscar o membro que vai contribuir</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <InputGroup className="w-full max-w-md">
            {" "}
            {/* Aumentei a largura do InputGroup */}
            <InputGroupInput
              placeholder="Nome, sobrenome, email ou telefone..."
              value={search}
              onChange={handleInputChange} // Usar handler memorizado
            />
            <InputGroupAddon>
              {isLoading ? "..." : <Search />}{" "}
              {/* Feedback de loading no ícone */}
            </InputGroupAddon>
            {/* Boa prática: O status não precisa de um Addon. Pode ser um parágrafo abaixo.
        Ou, se precisar, mantenha o Addon: */}
            <InputGroupAddon align="inline-end" className="text-sm">
              {isLoading ? "Buscando..." : `${members.length} resultados`}
            </InputGroupAddon>
          </InputGroup>

          <div className="w-full max-w-md">{resultsContent}</div>
        </>
      )}

      {selectedMember && (
        <RegisterContributionForm
          onSuccess={(state) => {
            toast({
              title: state.info.title,
              description: state.info.message,
            });
          }}
          onOpen={setOpenDialog}
          selectedMember={selectedMember}
        />
      )}
    </div>
  );
}
