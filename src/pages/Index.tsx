
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
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="container mx-auto px-4 py-8 space-y-12">
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            CHAT WITH AI
            <br />
            ANIME CHARACTERS
          </h1>
          <p className="text-gray-400">
            Chat with Gojo Satoru, Nezuko, Luffy, and many other characters! 
            Dive deep into the worlds of your favorite anime series.
          </p>
          <Button
            variant="outline"
            className="text-purple-400 border-purple-400 hover:bg-purple-400/10"
            onClick={() => navigate("/admin")}
          >
            Admin Panel
          </Button>
        </div>

        <div className="space-y-4">
          <div className="bg-black/50 py-2 px-4 text-center uppercase tracking-wider text-sm border-t border-b border-purple-500/20">
            ☘️ EXPLORE OUR ANIME AI CHARACTERS
          </div>
          
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {charactersList.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
