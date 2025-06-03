
import React from 'react';
import { FileText, StickyNote, CheckSquare, Plus, Clock, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Mock data for demonstration
const mockData = {
  recentPrompts: [
    { id: '1', title: 'AI Marketing Strategy', description: 'Develop a comprehensive AI-driven marketing campaign...', createdAt: '2024-06-02' },
    { id: '2', title: 'Product Launch Ideas', description: 'Brainstorm innovative approaches for our Q4 product launch...', createdAt: '2024-06-01' }
  ],
  recentNotes: [
    { id: '1', title: 'Meeting Notes - June 2', content: 'Discussed quarterly goals and team restructuring...', createdAt: '2024-06-02' },
    { id: '2', title: 'Research Findings', content: 'Key insights from market research on AI adoption...', createdAt: '2024-06-01' }
  ],
  pendingTasks: [
    { id: '1', title: 'Review quarterly reports', dueDate: '2024-06-05', completed: false },
    { id: '2', title: 'Prepare presentation slides', dueDate: '2024-06-03', completed: false },
    { id: '3', title: 'Schedule team meeting', dueDate: '2024-06-04', completed: false }
  ]
};

interface DashboardProps {
  onViewChange: (view: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onViewChange }) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-2">Welcome back!</h2>
        <p className="text-muted-foreground text-lg">Here's what's happening with your productivity today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onViewChange('prompts')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Prompts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onViewChange('notes')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Notes</CardTitle>
            <StickyNote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+5 from last week</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onViewChange('tasks')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.pendingTasks.length}</div>
            <p className="text-xs text-muted-foreground">Due this week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Recent Prompts</span>
            </CardTitle>
            <Button variant="outline" size="sm" onClick={() => onViewChange('prompts')}>
              <Plus className="h-4 w-4 mr-2" />
              New Prompt
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockData.recentPrompts.map((prompt) => (
              <div 
                key={prompt.id} 
                className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => onViewChange('prompts')}
              >
                <h4 className="font-semibold mb-1">{prompt.title}</h4>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{prompt.description}</p>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{prompt.createdAt}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <StickyNote className="h-5 w-5" />
              <span>Recent Notes</span>
            </CardTitle>
            <Button variant="outline" size="sm" onClick={() => onViewChange('notes')}>
              <Plus className="h-4 w-4 mr-2" />
              New Note
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockData.recentNotes.map((note) => (
              <div 
                key={note.id} 
                className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => onViewChange('notes')}
              >
                <h4 className="font-semibold mb-1">{note.title}</h4>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{note.content}</p>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{note.createdAt}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <CheckSquare className="h-5 w-5" />
            <span>Upcoming Tasks</span>
          </CardTitle>
          <Button variant="outline" size="sm" onClick={() => onViewChange('tasks')}>
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockData.pendingTasks.map((task) => (
              <div 
                key={task.id} 
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => onViewChange('tasks')}
              >
                <div className="flex items-center space-x-3">
                  <input type="checkbox" className="rounded" />
                  <span className="font-medium">{task.title}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    <Calendar className="h-3 w-3 mr-1" />
                    {task.dueDate}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
