
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { characters } from "@/data/characters";

const ADMIN_PASSWORD = "ramasanpi";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [newCharacter, setNewCharacter] = useState({
    name: "",
    anime: "",
    image: "",
    description: "",
    personality: "",
  });
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      toast.success("Login successful!");
    } else {
      toast.error("Invalid credentials");
    }
  };

  const handleCreateCharacter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCharacter.name || !newCharacter.anime || !newCharacter.image) {
      toast.error("Please fill in all required fields");
      return;
    }

    const character = {
      ...newCharacter,
      id: newCharacter.name.toLowerCase().replace(/\s+/g, "-"),
    };

    // Here you would typically make an API call to save the character
    console.log("New character:", character);
    toast.success("Character created successfully!");
    setNewCharacter({
      name: "",
      anime: "",
      image: "",
      description: "",
      personality: "",
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background p-4">
        <Card className="w-full max-w-md glass p-6 space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold text-primary">Admin Login</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={loginForm.username}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, username: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary">
            Character Management
          </h1>
          <Button variant="outline" onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </div>

        <Card className="glass p-6">
          <h2 className="text-xl font-semibold mb-4">Add New Character</h2>
          <form onSubmit={handleCreateCharacter} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newCharacter.name}
                onChange={(e) =>
                  setNewCharacter({ ...newCharacter, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="anime">Anime</Label>
              <Input
                id="anime"
                value={newCharacter.anime}
                onChange={(e) =>
                  setNewCharacter({ ...newCharacter, anime: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={newCharacter.image}
                onChange={(e) =>
                  setNewCharacter({ ...newCharacter, image: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newCharacter.description}
                onChange={(e) =>
                  setNewCharacter({
                    ...newCharacter,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="personality">Personality</Label>
              <Textarea
                id="personality"
                value={newCharacter.personality}
                onChange={(e) =>
                  setNewCharacter({
                    ...newCharacter,
                    personality: e.target.value,
                  })
                }
              />
            </div>
            <Button type="submit" className="w-full">
              Create Character
            </Button>
          </form>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Existing Characters</h2>
          {characters.map((character) => (
            <Card key={character.id} className="glass p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{character.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {character.anime}
                  </p>
                  <p className="mt-2 text-sm">{character.description}</p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-primary hover:text-primary"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
