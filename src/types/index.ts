/**
 * Define los niveles de riesgo posibles para una unidad operativa.
 */
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

/**
 * Representa un arquetipo de riesgo de empleado.
 */
export interface RiskArchetype {
    /** Identificador único del arquetipo. */
    id: string;
    /** Nombre descriptivo del arquetipo. */
    name: string;
    /** Descripción detallada del comportamiento y riesgo asociado. */
    description: string;
    /** Puntaje de riesgo (0-100). */
    riskScore: number;
    /** Porcentaje de la fuerza laboral que cae en este arquetipo. */
    composition: number;
    /** Tendencia del riesgo (subiendo, bajando, estable). */
    trend: 'up' | 'down' | 'stable';
    /** Color asociado para visualización. */
    color: string;
}

/**
 * Representa una unidad operativa (planta, tienda, etc.).
 */
export interface OperationalUnit {
    /** Identificador único de la unidad. */
    id: string;
    /** Nombre de la unidad. */
    name: string;
    /** Tipo de unidad operativa. */
    type: 'Plant' | 'Store' | 'Distribution Center';
    /** Número total de empleados. */
    totalHeadcount: number;
    /** Tasa de ausentismo en porcentaje. */
    absenteeismRate: number;
    /** Factor de Riesgo de Ausentismo (0-100). */
    fra: number;
    /** Costo anualizado proyectado del riesgo. */
    projectedCost: number;
    /** Nivel de riesgo actual. */
    status: RiskLevel;
    /** Ubicación geográfica. */
    location: string;
}

/**
 * Parámetros configurables para la simulación de continuidad.
 */
export interface SimulationParams {
    /** Porcentaje de reducción de rotación objetivo. */
    turnoverReduction: number;
    /** Porcentaje de cambio hacia una mezcla de mayor seniority. */
    seniorityMix: number;
    /** Porcentaje de reducción en la carga máxima de trabajo. */
    workloadBalance: number;
}

/**
 * Resultados calculados de una simulación.
 */
export interface SimulationResult {
    /** FRA actual antes de la simulación. */
    currentFra: number;
    /** FRA proyectado después de aplicar los parámetros. */
    projectedFra: number;
    /** Costo actual del riesgo. */
    currentCost: number;
    /** Costo proyectado después de la simulación. */
    projectedCost: number;
    /** Ahorro total estimado. */
    savings: number;
}
