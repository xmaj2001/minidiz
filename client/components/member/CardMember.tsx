import { IMember } from "@/http/member/member.interface";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card } from "../ui/card";

interface PropsCardMember {
  data: IMember;
  onSelect: (data: IMember) => void;
}

export const CardMember = ({ data, onSelect }: PropsCardMember) => {
  return (
    <Card
      className={`${data.isBaptized ? "border-primary/20" : ""}`}
      onClick={() => onSelect(data)}
    >
      <div className="flex flex-col items-center gap-3">
        <Avatar>
          <AvatarImage
            src={`/abstract-geometric-shapes.png?height=32&width=32&query=${data.name}`}
          />
          <AvatarFallback>{data.name}</AvatarFallback>
        </Avatar>
        <div className="font-medium text-center">{data.name}</div>
        <div className="text-sm text-muted-foreground text-center">
          <p>{data.email}</p>
          <p>{data.phone}</p>
          Registrado {new Date(data.createdAt).toLocaleDateString("pt-BR")}
        </div>
      </div>
    </Card>
  );
};
