import { MembrosPageX } from "./pagex"
import { MemberServices } from "@/lib/services/members/member.service"
// Dados mockados dos membros
const membrosData = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao.silva@email.com",
    telefone: "(11) 99999-9999",
    endereco: "Rua das Flores, 123",
    dataNascimento: "1985-03-15",
    dataIngresso: "2020-01-10",
    status: "Ativo",
    grupo: "Jovens",
    cargo: "Membro",
    observacoes: "Participa ativamente dos cultos",
  },
  {
    id: 2,
    nome: "Maria Santos",
    email: "maria.santos@email.com",
    telefone: "(11) 88888-8888",
    endereco: "Av. Principal, 456",
    dataNascimento: "1978-07-22",
    dataIngresso: "2018-05-15",
    status: "Ativo",
    grupo: "Mulheres",
    cargo: "Líder",
    observacoes: "Líder do grupo de mulheres",
  },
  {
    id: 3,
    nome: "Pedro Costa",
    email: "pedro.costa@email.com",
    telefone: "(11) 77777-7777",
    endereco: "Rua da Igreja, 789",
    dataNascimento: "1990-12-08",
    dataIngresso: "2019-03-20",
    status: "Ativo",
    grupo: "Homens",
    cargo: "Diácono",
    observacoes: "Responsável pela manutenção",
  },
  {
    id: 4,
    nome: "Ana Oliveira",
    email: "ana.oliveira@email.com",
    telefone: "(11) 66666-6666",
    endereco: "Rua Nova, 321",
    dataNascimento: "1995-09-30",
    dataIngresso: "2021-08-12",
    status: "Inativo",
    grupo: "Jovens",
    cargo: "Membro",
    observacoes: "Mudou-se para outra cidade",
  },
]

interface MemberPageProps {
  searchParams: { page?: string };
}

export default async function MemberPage({ searchParams }: MemberPageProps) {
  const data = await  MemberServices.listPaginate()
  console.log("Data:", data)

  return (
   <MembrosPageX data={data}/>
  )
}
