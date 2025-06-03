
import React, { useState } from 'react';
import { FileText, Plus, Search, Edit, Trash2, Sparkles, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const mockPrompts = [
  {
    id: '1',
    title: 'AI Marketing Strategy',
    description: 'Develop a comprehensive AI-driven marketing campaign for our new product launch, focusing on personalization and customer engagement. Consider multi-channel approach including social media, email marketing, and content creation. Analyze target demographics and create personalized messaging for each segment.',
    createdAt: '2024-06-02',
    updatedAt: '2024-06-02'
  },
  {
    id: '2',
    title: 'Product Launch Ideas',
    description: 'Brainstorm innovative approaches for our Q4 product launch, including viral marketing tactics and influencer partnerships. Focus on creating buzz and anticipation in the market while maintaining brand consistency.',
    createdAt: '2024-06-01',
    updatedAt: '2024-06-01'
  },
  {
    id: '3',
    title: 'User Experience Optimization',
    description: 'Create a detailed plan for improving user experience across our web application, with focus on reducing friction and increasing conversion. Include user journey mapping and pain point analysis.',
    createdAt: '2024-05-30',
    updatedAt: '2024-05-30'
  }
];

export const PromptsView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<typeof mockPrompts[0] | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const filteredPrompts = mockPrompts.filter(prompt =>
    prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prompt.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePromptClick = (prompt: typeof mockPrompts[0]) => {
    setSelectedPrompt(prompt);
    setIsEditMode(false);
  };

  const handleEdit = (prompt: typeof mockPrompts[0]) => {
    setSelectedPrompt(prompt);
    setIsEditMode(true);
  };

  if (selectedPrompt) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => setSelectedPrompt(null)}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Prompts</span>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle className="text-2xl">{selectedPrompt.title}</CardTitle>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" onClick={() => handleEdit(selectedPrompt)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Sparkles className="h-4 w-4" />
                  <span>Enhance</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isEditMode ? (
              <div className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input defaultValue={selectedPrompt.title} />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea defaultValue={selectedPrompt.description} rows={10} />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={() => setIsEditMode(false)}>Save Changes</Button>
                  <Button variant="outline" onClick={() => setIsEditMode(false)}>Cancel</Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="prose max-w-none">
                  <p className="text-foreground whitespace-pre-wrap">{selectedPrompt.description}</p>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground border-t pt-4">
                  <span>Created: {selectedPrompt.createdAt}</span>
                  <span>Updated: {selectedPrompt.updatedAt}</span>
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
          <h2 className="text-3xl font-bold tracking-tight">Prompts</h2>
          <p className="text-muted-foreground">Manage your AI prompts and ideas</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>New Prompt</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Prompt</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter prompt title..." />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Enter detailed prompt description..." 
                  rows={6}
                />
              </div>
              <div className="flex justify-between">
                <Button variant="outline" className="flex items-center space-x-2">
                  <Sparkles className="h-4 w-4" />
                  <span>Enhance with AI</span>
                </Button>
                <div className="space-x-2">
                  <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsCreateOpen(false)}>
                    Create Prompt
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search prompts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="grid gap-4">
        {filteredPrompts.map((prompt) => (
          <Card 
            key={prompt.id} 
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handlePromptClick(prompt)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl">{prompt.title}</CardTitle>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(prompt);
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
              <p className="text-muted-foreground mb-4 line-clamp-3">{prompt.description}</p>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Created: {prompt.createdAt}</span>
                <span>Updated: {prompt.updatedAt}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
