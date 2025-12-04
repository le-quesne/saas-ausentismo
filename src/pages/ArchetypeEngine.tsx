
// import React from 'react';
import { mockArchetypes } from '../lib/mockData';
import ClusterChart from '../components/engine/ClusterChart';
import { Users, TrendingUp, AlertCircle } from 'lucide-react';
import Explainable from '../components/common/Explainable';


const ArchetypeEngine = () => {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Segmentación de Fuerza Laboral</h2>
                <p className="text-muted">Análisis de comportamiento y detección de focos de liderazgo tóxico.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart */}
                <div className="lg:col-span-2">
                    <Explainable
                        title="Mapa de Riesgo Conductual"
                        description="Correlación entre antigüedad, desempeño y ausentismo. Permite identificar si la rotación se debe a fatiga o falta de liderazgo."
                    >
                        <ClusterChart archetypes={mockArchetypes} />
                    </Explainable>
                </div>

                {/* Stats/Summary */}
                <div className="bg-surface border border-white/5 rounded-xl p-6 space-y-6">
                    <h3 className="text-lg font-bold text-white">Insights del Motor</h3>
                    <div className="space-y-4">
                        <Explainable
                            title="Perfil Dominante"
                            description="El segmento mayoritario de su plantilla. Su estabilidad define la resiliencia base de la operación."
                        >
                            <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                                <div className="flex items-center gap-3 mb-2">
                                    <Users className="text-primary" size={20} />
                                    <span className="text-sm font-medium text-muted">Perfil Dominante</span>
                                </div>
                                <p className="text-xl font-bold text-white">Senior Estable (45%)</p>
                            </div>
                        </Explainable>

                        <Explainable
                            title="Foco de Riesgo Crítico"
                            description="Grupo con mayor probabilidad de licencia inminente debido a burnout o gestión deficiente."
                        >
                            <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                                <div className="flex items-center gap-3 mb-2">
                                    <AlertCircle className="text-danger" size={20} />
                                    <span className="text-sm font-medium text-muted">Mayor Riesgo</span>
                                </div>
                                <p className="text-xl font-bold text-white">Junior Volátil (FRA 78)</p>
                            </div>
                        </Explainable>
                    </div>
                </div>
            </div>

            {/* Archetype Cards */}
            <h3 className="text-xl font-bold text-white mt-8">Perfiles de Riesgo Activos</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mockArchetypes.map((arch) => (
                    <Explainable
                        key={arch.id}
                        title={`Arquetipo: ${arch.name} `}
                        description={arch.description}
                    >
                        <div className="bg-surface border border-white/5 rounded-xl p-6 hover:border-white/10 transition-all h-full">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="font-bold text-white">{arch.name}</h4>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-muted">FRA</span>
                                    <span
                                        className="px-2 py-1 rounded text-xs font-bold"
                                        style={{ backgroundColor: `${arch.color} 20`, color: arch.color }}
                                    >
                                        {arch.riskScore}
                                    </span>
                                </div>
                            </div>

                            <p className="text-sm text-muted mb-6 h-10">{arch.description}</p>

                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted">Composición</span>
                                    <span className="text-white font-mono">{arch.composition}%</span>
                                </div>
                                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                    <div className="h-full bg-white/20" style={{ width: `${arch.composition}% `, backgroundColor: arch.color }} />
                                </div>

                                <div className="flex justify-between text-sm pt-2 border-t border-white/5">
                                    <span className="text-muted">Tendencia</span>
                                    <div className="flex items-center gap-1 text-white">
                                        <TrendingUp size={14} />
                                        <span>{arch.trend.toUpperCase()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Explainable>
                ))}
            </div>
        </div>
    );
};

export default ArchetypeEngine;
