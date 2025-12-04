
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
    // const highRiskUnits = units.filter(u => u.status === 'high').length;

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Centro de Resiliencia</h2>
                <p className="text-muted">Monitoreo de continuidad operativa y protección financiera.</p>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Explainable
                    title="Capital Protegido (YTD)"
                    description="Valor financiero preservado mediante la prevención de paradas operativas y optimización de reemplazos."
                >
                    <KPICard
                        title="Capital Protegido"
                        value={`$${(totalCost * 0.15 / 1000000).toFixed(1)} M`}
                        trend="up"
                        trendValue="+15%"
                        icon={DollarSign}
                        color="success"
                    />
                </Explainable>

                <Explainable
                    title="EBITDA en Riesgo"
                    description="Proyección de pérdida operativa directa si no se cubren las brechas de talento detectadas."
                >
                    <KPICard
                        title="EBITDA en Riesgo"
                        value={`$${(totalCost * 0.05 / 1000).toFixed(0)} K`}
                        trend="down"
                        trendValue="-2.1%"
                        icon={AlertTriangle}
                        color="danger"
                    />
                </Explainable>

                <Explainable
                    title="Índice de Fatiga Organizacional"
                    description="Métrica predictiva basada en biometría de ánimo. Alerta sobre riesgo de burnout antes de que ocurra la baja."
                >
                    <KPICard
                        title="Índice de Fatiga"
                        value="Alta"
                        trend="up"
                        trendValue="+5%"
                        icon={Activity}
                        color="warning"
                    />
                </Explainable>

                <Explainable
                    title="Respuesta Elástica (Staffing)"
                    description="Despliegue actual de flota externa para garantizar continuidad operativa sin sobrecargar al equipo interno."
                >
                    <KPICard
                        title="Staffing Activo"
                        value="12 FTE"
                        trend="neutral"
                        trendValue="Estable"
                        icon={TrendingUp}
                        color="primary"
                    />
                </Explainable>
            </div>

            {/* Main Visualizations */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-3">
                    <Explainable
                        title="Matriz de Continuidad Operativa"
                        description="Visión consolidada del estado de salud de todas las plantas. Los bloques rojos indican riesgo inminente de disrupción."
                    >
                        <RiskHeatmap units={units} />
                    </Explainable>
                </div>
            </div>
        </div>
    );
};

export default RiskCommand;
