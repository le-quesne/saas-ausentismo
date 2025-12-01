export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface RiskArchetype {
    id: string;
    name: string;
    description: string;
    riskScore: number; // 0-100
    composition: number; // Percentage of workforce
    trend: 'up' | 'down' | 'stable';
    color: string;
}

export interface OperationalUnit {
    id: string;
    name: string;
    type: 'Plant' | 'Store' | 'Distribution Center';
    totalHeadcount: number;
    absenteeismRate: number; // Percentage
    fra: number; // Factor de Riesgo de Ausentismo (0-100)
    projectedCost: number; // Annualized cost of risk
    status: RiskLevel;
    location: string;
}

export interface SimulationParams {
    turnoverReduction: number; // Percentage
    seniorityMix: number; // Percentage shift towards Senior
    workloadBalance: number; // Percentage reduction in peak load
}

export interface SimulationResult {
    currentFra: number;
    projectedFra: number;
    currentCost: number;
    projectedCost: number;
    savings: number;
}
