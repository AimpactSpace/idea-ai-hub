
import React, { useState } from 'react';
import { StickyNote, Plus, Search, Edit, Trash2, ArrowLeft } from 'lucide-react';
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
    content: 'Discussed quarterly goals and team restructuring. Key decisions: hire 2 new developers, focus on mobile app development, and implement new project management tools.\n\nAction items:\n- Post job listings by Friday\n- Research project management tools\n- Schedule follow-up meeting with engineering team\n- Update budget projections for Q3',
    createdAt: '2024-06-02',
    updatedAt: '2024-06-02'
  },
  {
    id: '2',
    title: 'Research Findings',
    content: 'Key insights from market research on AI adoption: 73% of companies plan to integrate AI within the next year, main concerns are data security and implementation costs.\n\nDetailed findings:\n- Small businesses are most concerned about costs\n- Enterprise clients prioritize security\n- Mid-market shows highest adoption rate',
    createdAt: '2024-06-01',
    updatedAt: '2024-06-01'
  },
  {
    id: '3',
    title: 'Book Summary: The Lean Startup',
    content: 'Main concepts: Build-Measure-Learn feedback loop, MVP development, validated learning, and innovation accounting. Focus on creating value for customers through continuous innovation.\n\nKey takeaways:\n- Start with a minimum viable product\n- Measure everything\n- Learn from customer feedback\n- Pivot when necessary',
    createdAt: '2024-05-29',
    updatedAt: '2024-05-29'
  }
];

export const NotesView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<typeof mockNotes[0] | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const filteredNotes = mockNotes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNoteClick = (note: typeof mockNotes[0]) => {
    setSelectedNote(note);
    setIsEditMode(false);
  };

  const handleEdit = (note: typeof mockNotes[0]) => {
    setSelectedNote(note);
    setIsEditMode(true);
  };

  if (selectedNote) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => setSelectedNote(null)}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Notes</span>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                <StickyNote className="h-5 w-5 text-primary" />
                <CardTitle className="text-2xl">{selectedNote.title}</CardTitle>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" onClick={() => handleEdit(selectedNote)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isEditMode ? (
              <div className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input defaultValue={selectedNote.title} />
                </div>
                <div>
                  <Label>Content</Label>
                  <Textarea defaultValue={selectedNote.content} rows={12} />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={() => setIsEditMode(false)}>Save Changes</Button>
                  <Button variant="outline" onClick={() => setIsEditMode(false)}>Cancel</Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="prose max-w-none">
                  <p className="text-foreground whitespace-pre-wrap">{selectedNote.content}</p>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground border-t pt-4">
                  <span>Created: {selectedNote.createdAt}</span>
                  <span>Updated: {selectedNote.updatedAt}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

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
          <Card 
            key={note.id} 
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleNoteClick(note)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <StickyNote className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl">{note.title}</CardTitle>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(note);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={(e) => e.stopPropagation()}
                  >
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
