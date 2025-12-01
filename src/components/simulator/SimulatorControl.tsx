import React from 'react';

interface SimulatorControlProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    step?: number;
    unit?: string;
}

const SimulatorControl: React.FC<SimulatorControlProps> = ({ label, value, onChange, min, max, step = 1, unit = '%' }) => {
    return (
        <div className="bg-surface border border-white/5 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-medium text-muted">{label}</label>
                <span className="text-xl font-bold text-white font-mono">
                    {value}{unit}
                </span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primary/80 transition-all"
            />
            <div className="flex justify-between mt-2 text-xs text-muted">
                <span>{min}{unit}</span>
                <span>{max}{unit}</span>
            </div>
        </div>
    );
};

export default SimulatorControl;
