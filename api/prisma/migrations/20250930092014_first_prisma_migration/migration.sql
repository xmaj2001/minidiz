-- CreateEnum
CREATE TYPE "public"."UserPermission" AS ENUM ('ADMIN', 'TESOUREIRO', 'VISUALIZADOR');

-- CreateEnum
CREATE TYPE "public"."UserStatus" AS ENUM ('ATIVO', 'BLOQUEADO');

-- CreateEnum
CREATE TYPE "public"."MemberStatus" AS ENUM ('ATIVO', 'INATIVO', 'VISITANTE');

-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('MASCULINO', 'FEMININO', 'OUTRO');

-- CreateEnum
CREATE TYPE "public"."MaritalStatus" AS ENUM ('SOLTEIRO', 'CASADO', 'DIVORCIADO', 'VIUVO', 'UNIAO_ESTAVEL');

-- CreateEnum
CREATE TYPE "public"."ContributionType" AS ENUM ('DIZIMO', 'OFERTA', 'DOACAO');

-- CreateEnum
CREATE TYPE "public"."PaymentMethod" AS ENUM ('NENHUN', 'DINHEIRO', 'TRANSFERENCIA', 'CARTAO', 'CHEQUE', 'OUTRO');

-- CreateEnum
CREATE TYPE "public"."ContributionStatus" AS ENUM ('PENDENTE', 'RECEBIDO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "public"."EventType" AS ENUM ('CULTO', 'CONFERENCIA', 'RETIRO', 'REUNIAO_GRUPO', 'CELEBRACAO_ESPECIAL');

-- CreateEnum
CREATE TYPE "public"."ExpenseCategory" AS ENUM ('MANUTENCAO', 'SALARIOS', 'EVENTOS', 'MISSOES', 'CARIDADE', 'ADMINISTRATIVO', 'OUTRO');

-- CreateEnum
CREATE TYPE "public"."EmployeeRole" AS ENUM ('PASTOR', 'SECRETARIO', 'DIACONO', 'MUSICO', 'ZELADOR', 'OUTRO');

-- CreateEnum
CREATE TYPE "public"."EntityType" AS ENUM ('USER', 'MEMBER', 'CONTRIBUTION', 'EXPENSE', 'EVENT', 'GROUP', 'EMPLOYEE', 'MEMBERDETAILS');

-- CreateEnum
CREATE TYPE "public"."ActionType" AS ENUM ('CRIADO', 'ATUALIZADO', 'DELETADO', 'BLOQUEADO', 'ATIVADO');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "permissao" "public"."UserPermission" NOT NULL,
    "status" "public"."UserStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Member" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "sobreNome" TEXT NOT NULL,
    "email" TEXT,
    "telefone" TEXT,
    "data_nascimento" TIMESTAMP(3),
    "endereco" TEXT,
    "status" "public"."MemberStatus" NOT NULL,
    "genero" "public"."Gender" NOT NULL,
    "data_cadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MemberDetails" (
    "id" SERIAL NOT NULL,
    "member_id" INTEGER NOT NULL,
    "data_batismo" TIMESTAMP(3),
    "data_comunhao" TIMESTAMP(3),
    "data_crisma" TIMESTAMP(3),
    "estado_civil" "public"."MaritalStatus",
    "observacao" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MemberDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Contribution" (
    "id" SERIAL NOT NULL,
    "evento_id" INTEGER,
    "member_id" INTEGER NOT NULL,
    "tipo" "public"."ContributionType" NOT NULL,
    "valor" DECIMAL(65,30) NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "metodo" "public"."PaymentMethod" NOT NULL,
    "finalidade" TEXT,
    "observacao" TEXT,
    "descricao" TEXT,
    "imagens" TEXT[],
    "status" "public"."ContributionStatus" NOT NULL DEFAULT 'PENDENTE',
    "tipoObjeto" TEXT,
    "created_by" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contribution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Event" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "tipo" "public"."EventType" NOT NULL,
    "grupo_id" INTEGER,
    "arrecadacao_total" DECIMAL(65,30),
    "observacao" TEXT,
    "created_by" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."EventAttendance" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "member_id" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventAttendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Expense" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "valor" DECIMAL(65,30) NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "categoria" "public"."ExpenseCategory" NOT NULL,
    "evento_id" INTEGER,
    "employee_id" INTEGER,
    "observacao" TEXT,
    "created_by" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Employee" (
    "id" SERIAL NOT NULL,
    "member_id" INTEGER NOT NULL,
    "cargo" "public"."EmployeeRole" NOT NULL,
    "data_contratacao" TIMESTAMP(3),
    "observacao" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Group" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "lider_id" INTEGER NOT NULL,
    "descricao" TEXT,
    "created_by" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ActivityLog" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "entidade" "public"."EntityType" NOT NULL,
    "entidade_id" INTEGER NOT NULL,
    "acao" "public"."ActionType" NOT NULL,
    "dados_anteriores" JSONB,
    "dados_atuais" JSONB,
    "data_acao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "observacao" TEXT,
    "contributionId" INTEGER,
    "expenseId" INTEGER,

    CONSTRAINT "ActivityLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_MembrosDoGrupo" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_MembrosDoGrupo_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Member_email_key" ON "public"."Member"("email");

-- CreateIndex
CREATE UNIQUE INDEX "MemberDetails_member_id_key" ON "public"."MemberDetails"("member_id");

-- CreateIndex
CREATE UNIQUE INDEX "EventAttendance_event_id_member_id_key" ON "public"."EventAttendance"("event_id", "member_id");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_member_id_key" ON "public"."Employee"("member_id");

-- CreateIndex
CREATE INDEX "_MembrosDoGrupo_B_index" ON "public"."_MembrosDoGrupo"("B");

-- AddForeignKey
ALTER TABLE "public"."Member" ADD CONSTRAINT "Member_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MemberDetails" ADD CONSTRAINT "MemberDetails_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "public"."Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Contribution" ADD CONSTRAINT "Contribution_evento_id_fkey" FOREIGN KEY ("evento_id") REFERENCES "public"."Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Contribution" ADD CONSTRAINT "Contribution_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "public"."Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Contribution" ADD CONSTRAINT "Contribution_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Event" ADD CONSTRAINT "Event_grupo_id_fkey" FOREIGN KEY ("grupo_id") REFERENCES "public"."Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Event" ADD CONSTRAINT "Event_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EventAttendance" ADD CONSTRAINT "EventAttendance_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EventAttendance" ADD CONSTRAINT "EventAttendance_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "public"."Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "Expense_evento_id_fkey" FOREIGN KEY ("evento_id") REFERENCES "public"."Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "Expense_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "public"."Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "Expense_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Employee" ADD CONSTRAINT "Employee_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "public"."Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Group" ADD CONSTRAINT "Group_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Group" ADD CONSTRAINT "Group_lider_id_fkey" FOREIGN KEY ("lider_id") REFERENCES "public"."Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ActivityLog" ADD CONSTRAINT "ActivityLog_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ActivityLog" ADD CONSTRAINT "ActivityLog_contributionId_fkey" FOREIGN KEY ("contributionId") REFERENCES "public"."Contribution"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ActivityLog" ADD CONSTRAINT "ActivityLog_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "public"."Expense"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_MembrosDoGrupo" ADD CONSTRAINT "_MembrosDoGrupo_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_MembrosDoGrupo" ADD CONSTRAINT "_MembrosDoGrupo_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;
