"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ContributionStatus,
  IContribution,
  IListaContributions,
} from "@/lib/interfaces/contribution.interface";
import {
  Calendar,
  Car,
  DollarSign,
  Edit,
  Eye,
  ImageIcon,
  Monitor,
  PiggyBank,
  Trash2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Home from "@/app/page";
import { useState } from "react";

interface ListContributionProps {
  data: IListaContributions;
  onEdit: (data: IContribution) => void;
  oneDelete: (id: number) => void;
}

export const ListContribution = ({
  data,
  oneDelete,
  onEdit,
}: ListContributionProps) => {
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedDoacao, setSelectedDoacao] = useState<IContribution | null>(
    null
  );

  const getStatusBadge = (status: string) => {
    return status === ContributionStatus.RECEBIDO ? (
      <Badge variant="default" className="bg-primary text-primary-foreground">
        RECEBIDO
      </Badge>
    ) : (
      <Badge variant="secondary" className="bg-secondary text-muted-foreground">
        PENDENTE
      </Badge>
    );
  };

  const getTipoIcon = (tipo: string) => {
    const icons = {
      Veículo: Car,
      Equipamento: Monitor,
      Imóvel: Home,
      Móvel: Monitor,
      Teste: Monitor,
    };
    const Icon = icons[tipo as keyof typeof icons] || PiggyBank;
    return <Icon className="h-4 w-4" />;
  };

  const handleViewImages = (doacao: IContribution) => {
    setSelectedDoacao(doacao);
    setSelectedImages(doacao.imagens || []);
    setShowImageDialog(true);
  };
  return (
    <>
      {/* Lista de Doações */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {data.map((doacao) => (
          <Card key={doacao.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  {/* TODO: Atecao aqui */}
                  {getTipoIcon(doacao.tipoObjeto ?? "")}
                  {`${doacao.member.nome} ${doacao.member.sobreNome}`}
                </CardTitle>
                {getStatusBadge(doacao.status)}
              </div>
              <CardDescription>{doacao.descricao}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-primary">
                  {doacao.metodo != "NENHUM" &&
                    Number(doacao.valor).toLocaleString("pt-AO", {
                      style: "currency",
                      currency: "AOA",
                    })}
                </span>
                <Badge variant="outline">{doacao.tipoObjeto}</Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    Data: {new Date(doacao.data).toLocaleDateString("pt-AO")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>Pagamento: {doacao.metodo}</span>
                </div>
                {doacao.imagens && (
                  <div className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {doacao.imagens?.length || 0} imagem(ns) anexada(s)
                    </span>
                  </div>
                )}
              </div>

              <p className="text-sm text-muted-foreground">
                {doacao.observacao}
              </p>

              <div className="flex gap-2 pt-2">
                {doacao.imagens && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewImages(doacao)}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    Ver Imagens
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  <Edit className="h-3 w-3 mr-1" />
                  Editar
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog para Visualizar Imagens */}
      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              Imagens da Doação - {selectedDoacao?.member.nome}
            </DialogTitle>
            <DialogDescription>{selectedDoacao?.descricao}</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedImages.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Imagem ${index + 1} da doação`}
                  className="w-full h-64 object-cover rounded-lg border"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setShowImageDialog(false)}>
              Fechar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
