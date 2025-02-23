
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
      className="group relative overflow-hidden bg-black border-0 rounded-lg cursor-pointer transition-transform hover:scale-105"
      onClick={() => navigate(`/chat/${character.id}`)}
    >
      <div className="aspect-[4/3] relative">
        <img
          src={character.image}
          alt={character.name}
          className="object-cover w-full h-full"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute bottom-0 p-4 w-full">
          <h3 className="text-lg font-bold text-white uppercase tracking-wide mb-1">
            {character.name}
            {character.anime && ` FROM ${character.anime.toUpperCase()}`}
          </h3>
          <p className="text-sm text-gray-300 line-clamp-2">
            {character.description}
          </p>
          <button className="mt-2 text-xs text-purple-400 hover:text-purple-300 uppercase font-semibold tracking-wider flex items-center">
            PLAY NOW! →
          </button>
        </div>
      </div>
    </Card>
  );
}
