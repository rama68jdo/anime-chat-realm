
import { characters } from "@/data/characters";
import { CharacterCard } from "@/components/CharacterCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Character } from "@/types/character";

const Index = () => {
  const navigate = useNavigate();
  const [charactersList, setCharactersList] = useState<Character[]>(characters);

  // Update local state when global characters change
  useEffect(() => {
    setCharactersList(characters);
  }, [characters]);

  return (
    <div className="min-h-screen py-12 space-y-8">
      <div className="container px-4 mx-auto space-y-4 text-center">
        <div className="inline-flex px-4 py-1.5 glass rounded-full">
          <span className="text-sm font-medium text-primary">
            AI-Powered Anime Characters
          </span>
        </div>
        <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
          Chat with Your Favorite
          <span className="block mt-2 text-primary">Anime Characters</span>
        </h1>
        <p className="max-w-lg mx-auto text-lg text-muted-foreground">
          Experience unique conversations with AI-powered anime characters. Each interaction is special and memorable.
        </p>
        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-primary"
          onClick={() => navigate("/admin")}
        >
          Admin Panel
        </Button>
      </div>

      <div className="container px-4 mx-auto">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {charactersList.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
