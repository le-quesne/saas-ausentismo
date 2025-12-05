import { useState, useEffect } from 'react';
import SimulatorControl from '../components/simulator/SimulatorControl';
import { Calculator, ArrowRight, DollarSign, Users } from 'lucide-react';
import Explainable from '../components/common/Explainable';
import clsx from 'clsx';

/**
 * Página "Simulador de Crisis".
 * Permite a los usuarios ajustar variables y ver el impacto proyectado en la continuidad y costos.
 *
 * @returns {JSX.Element} La página del simulador.
 */
const ContinuitySimulator = () => {
    const [turnoverReduction, setTurnoverReduction] = useState(5);
    const [seniorityMix, setSeniorityMix] = useState(10);
    const [staffingOnDemand, setStaffingOnDemand] = useState(false);

    const [results, setResults] = useState({
        currentFra: 42,
        projectedFra: 38,
        currentCost: 2400000,
        projectedCost: 2100000,
        savings: 300000,
        coverage: 85
    });

    useEffect(() => {
        // Calculation logic with Staffing On-Demand impact
        const baseImpact = (turnoverReduction * 0.5) + (seniorityMix * 0.3);
        const staffingImpact = staffingOnDemand ? 15 : 0; // Staffing On-Demand drastically improves coverage

        const newFra = Math.max(10, Math.round(42 - baseImpact - (staffingImpact * 0.5)));
        const newCoverage = Math.min(100, 85 + (baseImpact * 0.2) + staffingImpact);

        const savingsPercent = (42 - newFra) / 42;
        const staffingCost = staffingOnDemand ? 150000 : 0; // Cost of external service
        const newCost = Math.round(2400000 * (1 - savingsPercent)) + staffingCost;

        setResults({
            currentFra: 42,
            projectedFra: newFra,
            currentCost: 2400000,
            projectedCost: newCost,
            savings: 2400000 - newCost,
            coverage: newCoverage
        });
    }, [turnoverReduction, seniorityMix, staffingOnDemand]);

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Simulador de Crisis</h2>
                <p className="text-muted">Ensayo de escenarios de cobertura y activación de respuesta elástica.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Controls */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Calculator className="text-primary" />
                        <h3 className="text-lg font-bold text-white">Variables de Respuesta</h3>
                    </div>

                    <Explainable
                        title="Estrategia de Retención"
                        description="Inversión en cultura y beneficios para reducir la fuga de talento clave. Estabiliza el conocimiento operativo."
                    >
                        <SimulatorControl
                            label="Retención Interna (%)"
                            value={turnoverReduction}
                            onChange={setTurnoverReduction}
                            min={0}
                            max={20}
                        />
                    </Explainable>

                    <Explainable
                        title="Madurez del Equipo (Seniority)"
                        description="Aumento en la densidad de talento senior. Equipos más experimentados absorben mejor los shocks operativos."
                    >
                        <SimulatorControl
                            label="Incremento Seniority (%)"
                            value={seniorityMix}
                            onChange={setSeniorityMix}
                            min={0}
                            max={50}
                        />
                    </Explainable>

                    <Explainable
                        title="Respuesta Elástica (On-Demand)"
                        description="Activación inmediata de 'Squads' externos certificados para cubrir ausencias críticas en < 4 horas."
                    >
                        <div className="p-4 bg-surface border border-white/10 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-sm font-medium text-muted">Staffing On-Demand</label>
                                <button
                                    onClick={() => setStaffingOnDemand(!staffingOnDemand)}
                                    className={clsx(
                                        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                                        staffingOnDemand ? "bg-primary" : "bg-white/10"
                                    )}
                                >
                                    <span
                                        className={clsx(
                                            "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                                            staffingOnDemand ? "translate-x-6" : "translate-x-1"
                                        )}
                                    />
                                </button>
                            </div>
                            <p className="text-xs text-muted">
                                {staffingOnDemand
                                    ? "ACTIVO: Cobertura externa garantizada ante crisis."
                                    : "INACTIVO: Dependencia 100% de recursos internos."}
                            </p>
                        </div>
                    </Explainable>
                </div>

                {/* Results */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-surface border border-white/5 rounded-xl p-8">
                        <h3 className="text-lg font-bold text-white mb-8">Resultados de Simulación</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {/* Coverage Impact */}
                            <Explainable
                                title="Índice de Continuidad de Negocio"
                                description="Probabilidad de mantener la operación al 100% de capacidad durante un evento de crisis de talento."
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-muted mb-2">
                                        <Users size={20} />
                                        <span className="font-medium">Nivel de Cobertura</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-muted">Actual</p>
                                            <p className="text-2xl font-bold text-white">85%</p>
                                        </div>
                                        <ArrowRight className="text-muted" />
                                        <div>
                                            <p className="text-sm text-primary">Simulado</p>
                                            <p className="text-3xl font-bold text-primary">{results.coverage}%</p>
                                        </div>
                                    </div>
                                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mt-4">
                                        <div
                                            className="h-full bg-primary transition-all duration-500"
                                            style={{ width: `${results.coverage}%` }}
                                        />
                                    </div>
                                </div>
                            </Explainable>

                            {/* Cost Impact */}
                            <Explainable
                                title="Impacto en Margen Operativo"
                                description="Cuantificación del EBITDA salvaguardado al evitar costos de oportunidad y penalizaciones contractuales."
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-muted mb-2">
                                        <DollarSign size={20} />
                                        <span className="font-medium">Costo de Riesgo</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-muted">Actual</p>
                                            <p className="text-2xl font-bold text-white">${(results.currentCost / 1000000).toFixed(2)}M</p>
                                        </div>
                                        <ArrowRight className="text-muted" />
                                        <div>
                                            <p className="text-sm text-primary">Simulado</p>
                                            <p className="text-3xl font-bold text-primary">${(results.projectedCost / 1000000).toFixed(2)}M</p>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-primary/10 rounded-lg border border-primary/20 mt-4">
                                        <p className="text-sm text-primary mb-1">EBITDA Protegido</p>
                                        <p className="text-2xl font-bold text-primary">+${results.savings.toLocaleString()}</p>
                                    </div>
                                </div>
                            </Explainable>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContinuitySimulator;
