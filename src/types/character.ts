
export interface Character {
  id: string;
  name: string;
  anime: string;
  description: string;
  image: string;
  personality: string;
}

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
}
