import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Character } from "@/types/character";
import { Message } from "@/types/character";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Chat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    async function fetchCharacter() {
      if (!id) return;
      const { data, error } = await supabase
        .from('characters')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        toast.error('Character not found');
        navigate('/');
        return;
      }

      setCharacter(data);
    }

    fetchCharacter();
  }, [id, navigate]);

  const handleAnimeImage = async () => {
    try {
      setIsLoading(true);
      const userMessage: Message = {
        id: Date.now().toString(),
        content: "send pic",
        role: "user",
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, userMessage]);

      const response = await fetch('https://api.waifu.pics/sfw/waifu');
      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }
      const data = await response.json();
      
      if (!data.url) {
        throw new Error('No image URL received');
      }

      const imageMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.url,
        role: "assistant",
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, imageMessage]);
    } catch (error) {
      console.error('Error getting image:', error);
      toast.error('Failed to get anime image');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Handle special commands
    if (input.toLowerCase() === 'send pic') {
      handleAnimeImage();
      setInput("");
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Prepare the context for the character
      const systemMessage = `You are ${character.name} from ${character.anime}. Your personality is ${character.personality}. ${character.description} Respond to the user in character.`;
      
      const { data, error } = await supabase.functions.invoke('chat', {
        body: {
          messages: [
            { role: "system", content: systemMessage },
            ...messages.map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            { role: "user", content: input }
          ]
        }
      });

      if (error) throw error;

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.choices[0].message.content,
        role: "assistant",
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm having trouble responding right now. Please try again later.",
        role: "assistant",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!character) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Loading character...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center p-4 border-b glass">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="mr-4"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 overflow-hidden rounded-full">
            <img
              src={character.image}
              alt={character.name}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h2 className="text-lg font-bold">{character.name}</h2>
            <p className="text-sm text-muted-foreground">{character.anime}</p>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-lg ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "glass"
              }`}
            >
              {message.content.includes('http') ? (
                <img 
                  src={message.content}
                  alt="Anime character"
                  className="rounded-lg max-w-full h-auto"
                  loading="lazy"
                />
              ) : (
                <p>{message.content}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4 glass">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message or 'send pic' for an anime image..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
