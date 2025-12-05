import React from 'react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Cell, ReferenceLine } from 'recharts';
import type { RiskArchetype } from '../../types';

/**
 * Propiedades para el componente ClusterChart.
 */
interface ClusterChartProps {
    /** Lista de arquetipos de riesgo a visualizar. */
    archetypes: RiskArchetype[];
}

/**
 * Gráfico de dispersión que visualiza la distribución de arquetipos de riesgo.
 * Muestra la relación entre la composición de la fuerza laboral y el puntaje de riesgo.
 *
 * @param {ClusterChartProps} props - Propiedades del componente.
 * @returns {JSX.Element} El gráfico renderizado.
 */
const ClusterChart: React.FC<ClusterChartProps> = ({ archetypes }) => {
    return (
        <div className="bg-surface border border-white/5 rounded-xl p-6 h-[400px]">
            <h3 className="text-lg font-bold text-white mb-4">Distribución de Arquetipos de Riesgo</h3>
            <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <XAxis
                        type="number"
                        dataKey="composition"
                        name="Composición"
                        unit="%"
                        stroke="#71717a"
                        label={{ value: 'Composición de Fuerza Laboral (%)', position: 'bottom', fill: '#71717a', offset: 0 }}
                    />
                    <YAxis
                        type="number"
                        dataKey="riskScore"
                        name="Puntaje de Riesgo"
                        stroke="#71717a"
                        label={{ value: 'Puntaje de Riesgo (FRA)', angle: -90, position: 'insideLeft', fill: '#71717a' }}
                    />
                    <ZAxis type="number" dataKey="riskScore" range={[100, 500]} />
                    <Tooltip
                        cursor={{ strokeDasharray: '3 3' }}
                        contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }}
                    />
                    <ReferenceLine y={50} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Umbral Crítico', fill: '#ef4444', position: 'insideTopRight' }} />
                    <Scatter name="Archetypes" data={archetypes} fill="#8884d8">
                        {archetypes.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Scatter>
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ClusterChart;
