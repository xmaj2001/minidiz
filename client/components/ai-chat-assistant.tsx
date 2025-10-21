"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, Bot, X } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

function cn(...inputs: (string | boolean | undefined | null)[]): string {
  return inputs.filter(Boolean).join(" ");
}

interface AIChatAssistantProps {
  onClose: () => void;
}

export function AIChatAssistant({ onClose }: AIChatAssistantProps) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // useChat do SDK fornece messages e função sendMessage
  const { messages, sendMessage } = useChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    try {
      await sendMessage({
        text: input,
      });
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      toast({
        title: "Erro",
        description: "Não foi possível enviar a mensagem. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setInput("");
    }
  };

  const getBotMessageStyle = (role: any) => {
    switch (role) {
      case "system":
        return "border-primary border-1 text-xs rounded-lg border border-primary rounded-br-50";
      case "assistant":
        return "bg-yellow-100 text-yellow-800 text-xs rounded-lg italic border border-yellow-300 rounded-bl-none";
      default:
         return "bg-primary border-1 text-xs rounded-lg border border-primary rounded-br-none";
    }
  };

  return (
    <Card className="fixed bottom-4 right-4 w-full max-w-sm h-[80vh] flex flex-col shadow-2xl z-50">
      <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" /> Assistente de IA
        </h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </CardHeader>

      {/* Área de Mensagens */}
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
        {messages.map((message) =>
          message.parts.map((part, i) => {
            {
              switch (part.type) {
                case "text":
                  return (
                    <div
                      key={`${message.id}-${i}`}
                      className={cn(
                        "p-3",
                       getBotMessageStyle(message.role)
                      )}
                    >
                      {part.text}
                    </div>
                  );
                case "tool-weather":
                  return (
                    <pre key={`${message.id}-${i}`}>
                      {JSON.stringify(part, null, 2)}
                    </pre>
                  );
              }
            }
          })
        )}
        <div ref={messagesEndRef}></div>
      </CardContent>

      {/* Input de Chat */}
      <div className="p-4 border-t flex items-center gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          placeholder="Pergunte sobre suas finanças..."
          className="min-h-10 resize-none"
          rows={1}
          disabled={isLoading}
        />
        <Button
          onClick={handleSendMessage}
          disabled={!input.trim() || isLoading}
          size="icon"
          className="shrink-0"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </Button>
      </div>
    </Card>
  );
}
