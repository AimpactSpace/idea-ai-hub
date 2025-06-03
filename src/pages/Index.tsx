
import React, { useState } from 'react';
import { Dashboard } from '@/components/Dashboard';
import { PromptsView } from '@/components/PromptsView';
import { NotesView } from '@/components/NotesView';
import { TasksView } from '@/components/TasksView';
import { AIChat } from '@/components/AIChat';
import { FloatingAIButton } from '@/components/FloatingAIButton';
import { ThemeProvider } from '@/components/ThemeProvider';
import { BottomNavigation } from '@/components/BottomNavigation';
import { TopHeader } from '@/components/TopHeader';

const Index = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onViewChange={setCurrentView} />;
      case 'prompts':
        return <PromptsView />;
      case 'notes':
        return <NotesView />;
      case 'tasks':
        return <TasksView />;
      default:
        return <Dashboard onViewChange={setCurrentView} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300 pt-30">
        <TopHeader />
        <BottomNavigation currentView={currentView} onViewChange={setCurrentView} />
        <main className="container mx-auto px-4 py-6">
          {renderCurrentView()}
        </main>
        <FloatingAIButton onClick={() => setIsChatOpen(true)} />
        <AIChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </div>
    </ThemeProvider>
  );
};

export default Index;
