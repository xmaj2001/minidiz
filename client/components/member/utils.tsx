import { UserCheck, UserX } from "lucide-react";
import { Badge } from "../ui/badge";
import { StatusMember } from "@/lib/interfaces/member.interface";

export const getStatusBadge = (status: StatusMember) => {
  return status == "ATIVO" ? (
    <Badge variant="secondary" className="bg-primary text-white">
      <UserCheck className="h-3 w-3 mr-1" />
      Ativo
    </Badge>
  ) : (
    <Badge variant="secondary" className="bg-muted text-muted-foreground">
      <UserX className="h-3 w-3 mr-1" />
      Inativo
    </Badge>
  );
};
export const getMaritalStatusBadge = (status: string) => {
  return status == "CASADO" ? (
    <Badge variant="secondary" className="bg-primary text-white">
      <UserCheck className="h-3 w-3 mr-1" />
      CASADO
    </Badge>
  ) : (
    <Badge variant="secondary" className="bg-muted text-muted-foreground">
      <UserX className="h-3 w-3 mr-1" />
      SOLTEIRO/A
    </Badge>
  );
};
