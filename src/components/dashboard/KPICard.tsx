import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import clsx from 'clsx';

interface KPICardProps {
    title: string;
    value: string;
    trend: 'up' | 'down' | 'neutral';
    trendValue: string;
    icon: LucideIcon;
    color: 'primary' | 'danger' | 'accent' | 'secondary' | 'success' | 'warning';
}

const KPICard: React.FC<KPICardProps> = ({ title, value, trend, trendValue, icon: Icon, color }) => {
    const colorStyles = {
        primary: 'text-primary bg-primary/10',
        danger: 'text-danger bg-danger/10',
        accent: 'text-accent bg-accent/10',
        secondary: 'text-secondary bg-secondary/10',
        success: 'text-emerald-400 bg-emerald-400/10',
        warning: 'text-amber-400 bg-amber-400/10',
    };

    const trendColor = trend === 'up' ? 'text-danger' : trend === 'down' ? 'text-primary' : 'text-muted';
    const TrendIcon = trend === 'up' ? ArrowUpRight : trend === 'down' ? ArrowDownRight : Minus;

    return (
        <div className="bg-surface border border-white/5 rounded-xl p-6 hover:border-white/10 transition-colors">
            <div className="flex items-start justify-between mb-4">
                <div className={clsx('p-3 rounded-lg', colorStyles[color])}>
                    <Icon size={24} />
                </div>
                <div className={clsx('flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-white/5', trendColor)}>
                    <TrendIcon size={14} />
                    {trendValue}
                </div>
            </div>
            <h3 className="text-muted text-sm font-medium mb-1">{title}</h3>
            <p className="text-2xl font-bold text-white tracking-tight">{value}</p>
        </div>
    );
};

export default KPICard;
