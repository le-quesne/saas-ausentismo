// import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Activity, Settings, LogOut, X, BrainCircuit } from 'lucide-react';
import clsx from 'clsx';

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

const Sidebar = ({ isOpen = false, onClose }: SidebarProps) => {
    const navItems = [
        { to: '/', icon: LayoutDashboard, label: 'Centro de Resiliencia' },
        { to: '/predictability', icon: BrainCircuit, label: 'Inteligencia Predictiva' },
        { to: '/simulator', icon: Activity, label: 'Simulador de Crisis' },
        { to: '/archetypes', icon: Users, label: 'Segmentación de Fuerza Laboral' },
    ];

    return (
        <>
            {/* Mobile Backdrop */}
            <div
                className={clsx(
                    "fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            {/* Sidebar */}
            <aside className={clsx(
                "w-64 bg-surface border-r border-white/10 flex flex-col h-screen fixed left-0 top-0 z-50 transition-transform duration-300 ease-in-out lg:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-white">
                            OpResilience <span className="text-primary">AI</span>
                        </h1>
                        <p className="text-xs text-muted mt-1">Plataforma de Continuidad</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="lg:hidden text-muted hover:text-white p-1"
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            onClick={() => onClose?.()}
                            className={({ isActive }) =>
                                clsx(
                                    'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                                    isActive
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-muted hover:text-white hover:bg-white/5'
                                )
                            }
                        >
                            <item.icon size={20} />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/10 space-y-2">
                    <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-muted hover:text-white hover:bg-white/5 transition-colors">
                        <Settings size={20} />
                        Configuración
                    </button>
                    <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-muted hover:text-white hover:bg-white/5 transition-colors">
                        <LogOut size={20} />
                        Cerrar Sesión
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
