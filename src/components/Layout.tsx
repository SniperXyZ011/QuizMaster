import React from 'react';
import { Sparkles } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  onLogoClick?: () => void;
}

export function Layout({ children, onLogoClick }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-900 text-white selection:bg-indigo-500 selection:text-white">
      {/* Background gradients */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[100px]" />
        <div className="absolute -bottom-[10%] left-[20%] w-[30%] h-[30%] rounded-full bg-pink-600/20 blur-[80px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-4 min-h-screen flex flex-col">
        <header className="flex items-center justify-between py-3">
          <div 
            className={`flex items-center gap-2 ${onLogoClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
            onClick={onLogoClick}
          >
            <div className="p-2 bg-indigo-500/20 rounded-xl backdrop-blur-sm border border-indigo-500/30">
              <Sparkles className="w-6 h-6 text-indigo-400" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              QuizMaster
            </h1>
          </div>
        </header>

        <main className="flex-1 flex flex-col justify-center">
          {children}
        </main>

        <footer className="text-center py-2 text-slate-500 text-xs">
          © 2026 QuizMaster
        </footer>
      </div>
    </div>
  );
}
