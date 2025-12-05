import { AlertTriangle, CheckCircle, Factory, TrendingUp } from 'lucide-react';
import clsx from 'clsx';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';
import Explainable from '../components/common/Explainable';

// Mock data generator for 7-day forecast
/**
 * Genera datos simulados para la proyección de riesgo a 7 días.
 *
 * @param {number} baseRisk - Nivel de riesgo base.
 * @param {number} volatility - Volatilidad aleatoria añadida al riesgo.
 * @returns {Array<{day: string, risk: number}>} Array de objetos con día y nivel de riesgo.
 */
const generateForecast = (baseRisk: number, volatility: number) => {
    return Array.from({ length: 7 }, (_, i) => ({
        day: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'][i],
        risk: Math.min(100, Math.max(0, baseRisk + (Math.random() - 0.5) * volatility)),
    }));
};

const PLANTS = [
    {
        id: 1,
        name: 'Planta Norte',
        status: 'normal',
        message: 'Ánimo del equipo positivo. Baja probabilidad de licencias.',
        riskScore: 12,
        data: generateForecast(15, 10),
    },
    {
        id: 2,
        name: 'Planta Central',
        status: 'warning',
        message: 'Alerta de Fatiga: Check-in diario detecta agotamiento en 5 FTEs clave. Riesgo de licencia inminente.',
        riskScore: 88,
        data: generateForecast(85, 15),
    },
    {
        id: 3,
        name: 'Planta Sur',
        status: 'normal',
        message: 'Ánimo del equipo estable. Sin patrones de riesgo detectados.',
        riskScore: 24,
        data: generateForecast(20, 12),
    },
];

/**
 * Página "Inteligencia Predictiva".
 * Muestra alertas tempranas y proyecciones de riesgo basadas en el ánimo y otros factores.
 *
 * @returns {JSX.Element} La página de predictibilidad.
 */
const Predictability = () => {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Inteligencia Predictiva</h1>
                <p className="text-muted mt-2">Detección temprana de riesgos basada en Check-in de Ánimo y patrones históricos.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {PLANTS.map((plant) => (
                    <Explainable
                        key={plant.id}
                        title={`Análisis: ${plant.name}`}
                        description={plant.status === 'warning'
                            ? "Se ha detectado una correlación entre baja calificación de ánimo y aumento de licencias médicas. Se recomienda intervención de liderazgo."
                            : "La unidad opera con niveles óptimos de resiliencia. El clima laboral es un factor protector activo."}
                    >
                        <div
                            className={clsx(
                                "rounded-xl border overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5",
                                plant.status === 'warning'
                                    ? "bg-gradient-to-br from-red-950/30 to-background border-red-500/30"
                                    : "bg-surface border-white/10"
                            )}
                        >
                            <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Info Section */}
                                <div className="lg:col-span-1 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Factory size={18} className="text-muted" />
                                            <h3 className="text-xl font-bold text-white">{plant.name}</h3>
                                        </div>
                                        <div className={clsx(
                                            "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                                            plant.status === 'warning' ? "bg-red-500/20 text-red-400" : "bg-emerald-500/20 text-emerald-400"
                                        )}>
                                            {plant.status === 'warning' ? 'Riesgo de Cobertura' : 'Estable'}
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className={clsx(
                                            "p-3 rounded-lg shrink-0",
                                            plant.status === 'warning' ? "bg-red-500/10 text-red-500" : "bg-emerald-500/10 text-emerald-500"
                                        )}>
                                            {plant.status === 'warning' ? <AlertTriangle size={28} /> : <CheckCircle size={28} />}
                                        </div>
                                        <p className={clsx(
                                            "text-lg font-medium leading-snug",
                                            plant.status === 'warning' ? "text-red-100" : "text-emerald-100"
                                        )}>
                                            {plant.message}
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-white/5">
                                        <div className="flex items-center justify-between text-sm text-muted mb-1">
                                            <span>Factor Bradford (Promedio)</span>
                                            <span className={clsx(
                                                "font-bold",
                                                plant.status === 'warning' ? "text-red-400" : "text-emerald-400"
                                            )}>{plant.riskScore}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                            <div
                                                className={clsx(
                                                    "h-full rounded-full transition-all duration-1000",
                                                    plant.status === 'warning' ? "bg-red-500" : "bg-emerald-500"
                                                )}
                                                style={{ width: `${plant.riskScore}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Chart Section */}
                                <div className="lg:col-span-2 h-[200px] relative">
                                    <div className="absolute top-0 left-0 z-10 flex items-center gap-2 text-xs font-medium text-muted bg-background/50 backdrop-blur px-2 py-1 rounded-br-lg border-b border-r border-white/5">
                                        <TrendingUp size={12} />
                                        Proyección de Ausentismo (7 días)
                                    </div>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={plant.data}>
                                            <defs>
                                                <linearGradient id={`gradient-${plant.id}`} x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor={plant.status === 'warning' ? '#ef4444' : '#10b981'} stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor={plant.status === 'warning' ? '#ef4444' : '#10b981'} stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', color: '#fff' }}
                                                itemStyle={{ color: '#fff' }}
                                                cursor={{ stroke: 'rgba(255,255,255,0.1)' }}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="risk"
                                                stroke={plant.status === 'warning' ? '#ef4444' : '#10b981'}
                                                strokeWidth={2}
                                                fillOpacity={1}
                                                fill={`url(#gradient-${plant.id})`}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </Explainable>
                ))}
            </div>
        </div>
    );
};

export default Predictability;
