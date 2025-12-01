import { useState, useEffect } from 'react';
import SimulatorControl from '../components/simulator/SimulatorControl';
import { Calculator, ArrowRight, DollarSign, Activity } from 'lucide-react';
// import clsx from 'clsx';
import Explainable from '../components/common/Explainable';

const ContinuitySimulator = () => {
    const [turnoverReduction, setTurnoverReduction] = useState(5);
    const [seniorityMix, setSeniorityMix] = useState(10);
    const [workloadBalance, setWorkloadBalance] = useState(15);

    const [results, setResults] = useState({
        currentFra: 42,
        projectedFra: 38,
        currentCost: 2400000,
        projectedCost: 2100000,
        savings: 300000
    });

    // Mock calculation logic
    useEffect(() => {
        const impactFactor = (turnoverReduction * 0.5) + (seniorityMix * 0.3) + (workloadBalance * 0.2);
        const newFra = Math.max(15, Math.round(42 - impactFactor));
        const savingsPercent = (42 - newFra) / 42;
        const newCost = Math.round(2400000 * (1 - savingsPercent));

        setResults({
            currentFra: 42,
            projectedFra: newFra,
            currentCost: 2400000,
            projectedCost: newCost,
            savings: 2400000 - newCost
        });
    }, [turnoverReduction, seniorityMix, workloadBalance]);

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Simulador de Continuidad</h2>
                <p className="text-muted">Modelado predictivo de ROI y riesgo.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Controls */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Calculator className="text-primary" />
                        <h3 className="text-lg font-bold text-white">Parámetros de Simulación</h3>
                    </div>

                    <Explainable
                        title="Reducción de Rotación"
                        description="Objetivo de reducción porcentual en la tasa de rotación anual. Impacta directamente en la estabilidad operativa."
                    >
                        <SimulatorControl
                            label="Reducción de Rotación"
                            value={turnoverReduction}
                            onChange={setTurnoverReduction}
                            min={0}
                            max={20}
                        />
                    </Explainable>

                    <Explainable
                        title="Mix de Seniority"
                        description="Incremento porcentual en la proporción de empleados Senior vs Junior. Mayor seniority reduce la volatilidad."
                    >
                        <SimulatorControl
                            label="Cambio en Mix de Seniority"
                            value={seniorityMix}
                            onChange={setSeniorityMix}
                            min={0}
                            max={50}
                        />
                    </Explainable>

                    <Explainable
                        title="Balanceo de Carga"
                        description="Reducción en la variabilidad de la carga de trabajo. Cargas más estables reducen el riesgo de burnout."
                    >
                        <SimulatorControl
                            label="Balanceo de Carga"
                            value={workloadBalance}
                            onChange={setWorkloadBalance}
                            min={0}
                            max={30}
                        />
                    </Explainable>
                </div>

                {/* Results */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-surface border border-white/5 rounded-xl p-8">
                        <h3 className="text-lg font-bold text-white mb-8">Impacto Proyectado</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {/* FRA Impact */}
                            <Explainable
                                title="Impacto en FRA"
                                description="Comparativa del Factor de Riesgo de Ausentismo actual vs el proyectado tras aplicar las mejoras simuladas."
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-muted mb-2">
                                        <Activity size={20} />
                                        <span className="font-medium">Puntaje FRA Global</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-muted">Actual</p>
                                            <p className="text-2xl font-bold text-white">{results.currentFra}%</p>
                                        </div>
                                        <ArrowRight className="text-muted" />
                                        <div>
                                            <p className="text-sm text-primary">Proyectado</p>
                                            <p className="text-3xl font-bold text-primary">{results.projectedFra}%</p>
                                        </div>
                                    </div>
                                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mt-4">
                                        {/* The original code had two divs for the progress bar, one for current and one for projected.
                            The new calculation logic might change the width, but the structure remains.
                            I'll keep the original widths as they are part of the visual representation,
                            assuming the user only intended to change the logic and add wrappers.
                            If the widths should dynamically reflect currentFra/projectedFra, that would be a separate instruction.
                        */}
                                        <div className="h-full bg-white/30 w-[42%]" />
                                        <div className="h-full bg-primary w-[35%] -mt-2 relative z-10" />
                                    </div>
                                </div>
                            </Explainable>

                            {/* Cost Impact */}
                            <Explainable
                                title="Impacto Financiero"
                                description="Ahorro estimado en costos operativos y de reemplazo basado en la reducción del riesgo."
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-muted mb-2">
                                        <DollarSign size={20} />
                                        <span className="font-medium">Costo Anual de Riesgo</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-muted">Actual</p>
                                            <p className="text-2xl font-bold text-white">${(results.currentCost / 1000000).toFixed(2)}M</p>
                                        </div>
                                        <ArrowRight className="text-muted" />
                                        <div>
                                            <p className="text-sm text-primary">Proyectado</p>
                                            <p className="text-3xl font-bold text-primary">${(results.projectedCost / 1000000).toFixed(2)}M</p>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-primary/10 rounded-lg border border-primary/20 mt-4">
                                        <p className="text-sm text-primary mb-1">Ahorro Anual Total</p>
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
