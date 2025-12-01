
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { ExplanationProvider, useExplanation } from '../../context/ExplanationContext';
import ExplanationModal from '../common/ExplanationModal';
import { HelpCircle, Menu } from 'lucide-react';
import clsx from 'clsx';
import { useState } from 'react';

const LayoutContent = () => {
    const { isExplanatoryMode, toggleMode } = useExplanation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background text-white">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <main className="lg:pl-64 min-h-screen transition-all duration-300">
                <header className="h-16 border-b border-white/10 flex items-center px-4 lg:px-8 justify-between bg-background/50 backdrop-blur-sm sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button
                            className="lg:hidden p-2 -ml-2 text-muted hover:text-white"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                            <span className="text-xs font-mono text-primary hidden sm:inline">SYSTEM OPERATIONAL</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 lg:gap-6">
                        <button
                            onClick={toggleMode}
                            className={clsx(
                                "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all border",
                                isExplanatoryMode
                                    ? "bg-primary/20 text-primary border-primary/50"
                                    : "bg-white/5 text-muted border-white/10 hover:bg-white/10"
                            )}
                        >
                            <HelpCircle size={14} />
                            <span className="hidden sm:inline">Modo Explicativo: {isExplanatoryMode ? 'ON' : 'OFF'}</span>
                            <span className="sm:hidden">{isExplanatoryMode ? 'ON' : 'OFF'}</span>
                        </button>
                        <div className="flex items-center gap-4 text-sm text-muted">
                            <span className="hidden sm:inline">FRA Global: <span className="text-white font-bold">42%</span></span>
                            <span className="w-px h-4 bg-white/10 hidden sm:block"></span>
                            <div className="flex items-center gap-2">
                                <span className="hidden sm:inline">Alertas:</span>
                                <span className="text-danger font-bold bg-danger/10 px-2 py-0.5 rounded text-xs sm:text-sm">3</span>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="p-4 lg:p-8">
                    <Outlet />
                </div>
            </main>
            <ExplanationModal />
        </div>
    );
};

const AppLayout = () => {
    return (
        <ExplanationProvider>
            <LayoutContent />
        </ExplanationProvider>
    );
};

export default AppLayout;

