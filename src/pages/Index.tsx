
import { characters } from "@/data/characters";
import { CharacterCard } from "@/components/CharacterCard";

const Index = () => {
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
      </div>

      <div className="container px-4 mx-auto">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
