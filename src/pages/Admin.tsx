import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Character } from "@/types/character";
import { supabase } from "@/integrations/supabase/client";

const ADMIN_PASSWORD = "ramasanpi";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [charactersList, setCharactersList] = useState<Character[]>([]);
  const [newCharacter, setNewCharacter] = useState({
    name: "",
    anime: "",
    image: "",
    description: "",
    personality: "",
  });
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      fetchCharacters();
    }
  }, [isLoggedIn]);

  const fetchCharacters = async () => {
    const { data, error } = await supabase
      .from('characters')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      toast.error('Failed to load characters');
      return;
    }

    setCharactersList(data || []);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      toast.success("Login successful!");
    } else {
      toast.error("Invalid credentials");
    }
  };

  const handleCreateCharacter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCharacter.name || !newCharacter.anime || !newCharacter.image) {
      toast.error("Please fill in all required fields");
      return;
    }

    const character = {
      ...newCharacter,
      id: newCharacter.name.toLowerCase().replace(/\s+/g, "-"),
    };

    const { error } = await supabase
      .from('characters')
      .insert([character]);

    if (error) {
      toast.error('Failed to create character');
      return;
    }

    toast.success("Character created successfully!");
    setNewCharacter({
      name: "",
      anime: "",
      image: "",
      description: "",
      personality: "",
    });
    fetchCharacters();
  };

  const handleEditCharacter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCharacter) return;

    const { data, error } = await supabase
      .from('characters')
      .update({
        name: editingCharacter.name,
        anime: editingCharacter.anime,
        image: editingCharacter.image,
        description: editingCharacter.description,
        personality: editingCharacter.personality
      })
      .eq('id', editingCharacter.id);

    if (error) {
      toast.error('Failed to update character');
      console.error('Update error:', error);
      return;
    }

    setEditingCharacter(null);
    toast.success("Character updated successfully!");
    fetchCharacters();
  };

  const handleDeleteCharacter = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this character?");
    if (!confirmed) return;

    const { error } = await supabase
      .from('characters')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Failed to delete character');
      console.error('Delete error:', error);
      return;
    }

    toast.success("Character deleted successfully!");
    fetchCharacters();
  };

  return (
    <div className="min-h-screen bg-background p-4">
      {!isLoggedIn ? (
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
      ) : (
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-primary">
              Character Management
            </h1>
            <Button variant="outline" onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </div>

          {editingCharacter ? (
            <Card className="glass p-6">
              <h2 className="text-xl font-semibold mb-4">Edit Character</h2>
              <form onSubmit={handleEditCharacter} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Name</Label>
                  <Input
                    id="edit-name"
                    value={editingCharacter.name}
                    onChange={(e) =>
                      setEditingCharacter({
                        ...editingCharacter,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-anime">Anime</Label>
                  <Input
                    id="edit-anime"
                    value={editingCharacter.anime}
                    onChange={(e) =>
                      setEditingCharacter({
                        ...editingCharacter,
                        anime: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-image">Image URL</Label>
                  <Input
                    id="edit-image"
                    value={editingCharacter.image}
                    onChange={(e) =>
                      setEditingCharacter({
                        ...editingCharacter,
                        image: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={editingCharacter.description}
                    onChange={(e) =>
                      setEditingCharacter({
                        ...editingCharacter,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-personality">Personality</Label>
                  <Textarea
                    id="edit-personality"
                    value={editingCharacter.personality}
                    onChange={(e) =>
                      setEditingCharacter({
                        ...editingCharacter,
                        personality: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex space-x-2">
                  <Button type="submit" className="flex-1">
                    Save Changes
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setEditingCharacter(null)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          ) : (
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
          )}

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Existing Characters</h2>
            {charactersList.map((character) => (
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
                      onClick={() => setEditingCharacter(character)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDeleteCharacter(character.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
