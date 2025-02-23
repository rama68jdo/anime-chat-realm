
import { Character } from "@/types/character";

export let characters: Character[] = [
  {
    id: "gojo",
    name: "Gojo Satoru",
    anime: "Jujutsu Kaisen",
    description: "The strongest jujutsu sorcerer who enjoys teaching and having fun conversations.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    personality: "Confident, playful, and intelligent"
  },
  {
    id: "luffy",
    name: "Monkey D. Luffy",
    anime: "One Piece",
    description: "A cheerful pirate with a dream to become the Pirate King.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    personality: "Energetic, determined, and straightforward"
  },
  {
    id: "nezuko",
    name: "Nezuko Kamado",
    anime: "Demon Slayer",
    description: "A caring demon who protects humans despite her transformation.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    personality: "Protective, gentle, and resilient"
  }
];

// Add function to update characters list
export const updateCharacters = (newCharacters: Character[]) => {
  characters = newCharacters;
};
