
import { useMemo } from 'react';
import { DollarSign, Activity, AlertTriangle, TrendingUp } from 'lucide-react';
import KPICard from '../components/dashboard/KPICard';
import RiskHeatmap from '../components/dashboard/RiskHeatmap';
import { generateMockUnits } from '../lib/mockData';
import Explainable from '../components/common/Explainable';

const RiskCommand = () => {
    // In a real app, this would be fetched from an API/Supabase
    const units = useMemo(() => generateMockUnits(12), []);

    const totalCost = units.reduce((acc, unit) => acc + unit.projectedCost, 0);
    const avgFra = Math.round(units.reduce((acc, unit) => acc + unit.fra, 0) / units.length);
    const criticalUnits = units.filter(u => u.status === 'critical').length;
    // const highRiskUnits = units.filter(u => u.status === 'high').length;

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Comando de Riesgo</h2>
                <p className="text-muted">Monitoreo de estabilidad operacional en tiempo real.</p>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Explainable
                    title="Costo Anual Proyectado"
                    description="Estimación del impacto financiero total basado en los niveles actuales de riesgo de ausentismo y costos laborales por unidad."
                >
                    <KPICard
                        title="Costo Anual Proyectado"
                        value={`$${(totalCost / 1000000).toFixed(1)} M`}
                        trend="up"
                        trendValue="+12.5%"
                        icon={DollarSign}
                        color="primary"
                    />
                </Explainable>

                <Explainable
                    title="Puntaje FRA Global"
                    description="Factor de Riesgo de Ausentismo promedio ponderado. Un puntaje >50 indica inestabilidad operativa sistémica."
                >
                    <KPICard
                        title="Puntaje FRA Global"
                        value={`${avgFra}% `}
                        trend="up"
                        trendValue="+4.2%"
                        icon={Activity}
                        color="secondary"
                    />
                </Explainable>

                <Explainable
                    title="Unidades Críticas"
                    description="Número de unidades operativas (Plantas, Tiendas) con un FRA > 75, requiriendo intervención inmediata."
                >
                    <KPICard
                        title="Unidades Críticas"
                        value={criticalUnits.toString()}
                        trend="up"
                        trendValue="+1"
                        icon={AlertTriangle}
                        color="danger"
                    />
                </Explainable>

                <Explainable
                    title="Velocidad de Riesgo"
                    description="Tasa de cambio en el FRA en los últimos 30 días. 'Alta' indica un deterioro rápido de la estabilidad."
                >
                    <KPICard
                        title="Velocidad de Riesgo"
                        value="Alta"
                        trend="neutral"
                        trendValue="Estable"
                        icon={TrendingUp}
                        color="accent"
                    />
                </Explainable>
            </div>

            {/* Main Visualizations */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-3">
                    <Explainable
                        title="Mapa de Calor de Riesgo"
                        description="Visualización matricial del estado de riesgo de cada unidad operativa. Permite identificar focos rojos rápidamente."
                    >
                        <RiskHeatmap units={units} />
                    </Explainable>
                </div>
            </div>
        </div>
    );
};

export default RiskCommand;
