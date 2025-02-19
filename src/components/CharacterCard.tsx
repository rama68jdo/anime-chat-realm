
import { Card } from "@/components/ui/card";
import { Character } from "@/types/character";
import { useNavigate } from "react-router-dom";

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      className="group relative overflow-hidden glass neon-glow scale-up cursor-pointer"
      onClick={() => navigate(`/chat/${character.id}`)}
    >
      <div className="aspect-[3/4] relative">
        <img
          src={character.image}
          alt={character.name}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
        <div className="absolute bottom-0 p-4 space-y-2">
          <div className="px-2 py-1 text-xs font-medium rounded-full w-fit glass">
            {character.anime}
          </div>
          <h3 className="text-lg font-bold leading-tight text-white">
            {character.name}
          </h3>
          <p className="text-sm text-white/80 line-clamp-2">
            {character.description}
          </p>
        </div>
      </div>
    </Card>
  );
}
