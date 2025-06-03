
import React, { useState } from 'react';
import { StickyNote, Plus, Search, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const mockNotes = [
  {
    id: '1',
    title: 'Meeting Notes - June 2',
    content: 'Discussed quarterly goals and team restructuring. Key decisions: hire 2 new developers, focus on mobile app development, and implement new project management tools.',
    createdAt: '2024-06-02',
    updatedAt: '2024-06-02'
  },
  {
    id: '2',
    title: 'Research Findings',
    content: 'Key insights from market research on AI adoption: 73% of companies plan to integrate AI within the next year, main concerns are data security and implementation costs.',
    createdAt: '2024-06-01',
    updatedAt: '2024-06-01'
  },
  {
    id: '3',
    title: 'Book Summary: The Lean Startup',
    content: 'Main concepts: Build-Measure-Learn feedback loop, MVP development, validated learning, and innovation accounting. Focus on creating value for customers through continuous innovation.',
    createdAt: '2024-05-29',
    updatedAt: '2024-05-29'
  }
];

export const NotesView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const filteredNotes = mockNotes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Notes</h2>
          <p className="text-muted-foreground">Capture and organize your thoughts</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>New Note</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Note</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="note-title">Title</Label>
                <Input id="note-title" placeholder="Enter note title..." />
              </div>
              <div>
                <Label htmlFor="note-content">Content</Label>
                <Textarea 
                  id="note-content" 
                  placeholder="Write your note content..." 
                  rows={8}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsCreateOpen(false)}>
                  Create Note
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="grid gap-4">
        {filteredNotes.map((note) => (
          <Card key={note.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <StickyNote className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl">{note.title}</CardTitle>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 line-clamp-3">{note.content}</p>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Created: {note.createdAt}</span>
                <span>Updated: {note.updatedAt}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
