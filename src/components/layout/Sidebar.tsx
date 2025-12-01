// import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Activity, Settings, LogOut } from 'lucide-react';
import clsx from 'clsx';

const Sidebar = () => {
    const navItems = [
        { to: '/', icon: LayoutDashboard, label: 'Comando de Riesgo' },
        { to: '/archetypes', icon: Users, label: 'Motor de Arquetipos' },
        { to: '/simulator', icon: Activity, label: 'Simulador de Continuidad' },
    ];

    return (
        <aside className="w-64 bg-surface border-r border-white/10 flex flex-col h-screen fixed left-0 top-0 z-50">
            <div className="p-6 border-b border-white/10">
                <h1 className="text-xl font-bold tracking-tight text-white">
                    OpHealth <span className="text-primary">OS</span>
                </h1>
                <p className="text-xs text-muted mt-1">v1.0.0-MVP</p>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
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
    );
};

export default Sidebar;
