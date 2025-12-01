
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { ExplanationProvider, useExplanation } from '../../context/ExplanationContext';
import ExplanationModal from '../common/ExplanationModal';
import { HelpCircle } from 'lucide-react';
import clsx from 'clsx';

const LayoutContent = () => {
    const { isExplanatoryMode, toggleMode } = useExplanation();

    return (
        <div className="min-h-screen bg-background text-white">
            <Sidebar />
            <main className="pl-64 min-h-screen">
                <header className="h-16 border-b border-white/10 flex items-center px-8 justify-between bg-background/50 backdrop-blur-sm sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                            <span className="text-xs font-mono text-primary">SYSTEM OPERATIONAL</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
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
                            Modo Explicativo: {isExplanatoryMode ? 'ON' : 'OFF'}
                        </button>
                        <div className="flex items-center gap-4 text-sm text-muted">
                            <span>FRA Global: <span className="text-white font-bold">42%</span></span>
                            <span className="w-px h-4 bg-white/10"></span>
                            <span>Alertas Activas: <span className="text-danger font-bold">3</span></span>
                        </div>
                    </div>
                </header>
                <div className="p-8">
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

