import React from 'react';
import type { OperationalUnit } from '../../types';
import clsx from 'clsx';
import { AlertTriangle, CheckCircle, AlertOctagon } from 'lucide-react';

/**
 * Propiedades para el componente RiskHeatmap.
 */
interface RiskHeatmapProps {
    /** Lista de unidades operativas a visualizar. */
    units: OperationalUnit[];
}

/**
 * Visualización de mapa de calor para el riesgo de las unidades operativas.
 * Muestra una cuadrícula de tarjetas codificadas por color según el nivel de riesgo.
 *
 * @param {RiskHeatmapProps} props - Propiedades del componente.
 * @returns {JSX.Element} El mapa de calor renderizado.
 */
const RiskHeatmap: React.FC<RiskHeatmapProps> = ({ units }) => {
    const getStatusColor = (status: OperationalUnit['status']) => {
        switch (status) {
            case 'low': return 'bg-primary/20 border-primary/50 text-primary hover:bg-primary/30';
            case 'medium': return 'bg-accent/20 border-accent/50 text-accent hover:bg-accent/30';
            case 'high': return 'bg-danger/20 border-danger/50 text-danger hover:bg-danger/30';
            case 'critical': return 'bg-danger/40 border-danger text-white animate-pulse hover:bg-danger/50';
            default: return 'bg-muted/20 border-muted/50 text-muted';
        }
    };

    return (
        <div className="bg-surface border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-white">Mapa de Calor de Riesgo Operacional</h2>
                <div className="flex gap-4 text-xs text-muted">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary"></span> Estable
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-accent"></span> Alerta
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-danger"></span> Crítico
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {units.map((unit) => (
                    <div
                        key={unit.id}
                        className={clsx(
                            'border rounded-lg p-4 transition-all cursor-pointer group relative overflow-hidden',
                            getStatusColor(unit.status)
                        )}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <span className="font-bold truncate pr-2">{unit.name}</span>
                            {unit.status === 'critical' ? <AlertOctagon size={16} /> :
                                unit.status === 'high' ? <AlertTriangle size={16} /> :
                                    <CheckCircle size={16} />}
                        </div>

                        <div className="space-y-1">
                            <div className="flex justify-between text-xs opacity-80">
                                <span>Puntaje FRA</span>
                                <span className="font-mono font-bold">{unit.fra}%</span>
                            </div>
                            <div className="w-full bg-black/20 h-1.5 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-current transition-all duration-500"
                                    style={{ width: `${unit.fra}%` }}
                                />
                            </div>
                            <div className="flex justify-between text-xs opacity-60 mt-2">
                                <span>{unit.location}</span>
                                <span>{unit.totalHeadcount} HC</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RiskHeatmap;
