import React from 'react';

/**
 * Propiedades para el componente SimulatorControl.
 */
interface SimulatorControlProps {
    /** Etiqueta descriptiva del control. */
    label: string;
    /** Valor actual del control. */
    value: number;
    /** Función de callback al cambiar el valor. */
    onChange: (value: number) => void;
    /** Valor mínimo permitido. */
    min: number;
    /** Valor máximo permitido. */
    max: number;
    /** Incremento por paso (por defecto 1). */
    step?: number;
    /** Unidad de medida a mostrar (ej. '%'). */
    unit?: string;
}

/**
 * Control deslizante (slider) para ajustar parámetros de simulación.
 *
 * @param {SimulatorControlProps} props - Propiedades del componente.
 * @returns {JSX.Element} El control renderizado.
 */
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
