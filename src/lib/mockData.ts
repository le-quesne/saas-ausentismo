import type { OperationalUnit, RiskArchetype, RiskLevel } from '../types';

const UNITS = ['Planta A', 'Planta B', 'Centro Logístico Norte', 'Tienda 105', 'Tienda 204', 'Centro de Distribución Sur', 'Hub Tecnológico', 'Call Center'];
const LOCATIONS = ['Ciudad de México', 'Monterrey', 'Guadalajara', 'Querétaro', 'Tijuana'];

/**
 * Genera un conjunto de unidades operativas simuladas para pruebas.
 *
 * @param {number} count - El número de unidades a generar.
 * @returns {OperationalUnit[]} Un array de objetos OperationalUnit.
 */
export const generateMockUnits = (count: number): OperationalUnit[] => {
    return Array.from({ length: count }).map((_, i) => {
        const fra = Math.floor(Math.random() * (85 - 15) + 15);
        let status: RiskLevel = 'low';
        if (fra > 75) status = 'critical';
        else if (fra > 50) status = 'high';
        else if (fra > 30) status = 'medium';

        const headcount = Math.floor(Math.random() * (500 - 50) + 50);

        return {
            id: `unit-${i}`,
            name: UNITS[i % UNITS.length],
            location: LOCATIONS[i % LOCATIONS.length],
            type: i % 3 === 0 ? 'Plant' : i % 3 === 1 ? 'Store' : 'Distribution Center',
            totalHeadcount: headcount,
            absenteeismRate: Math.floor(Math.random() * 15),
            fra,
            // trend: Math.random() > 0.5 ? 'up' : 'down', // Removed as it's not in OperationalUnit interface
            status,
            projectedCost: Math.floor(Math.random() * (5000000 - 500000) + 500000),
        };
    });
};

/**
 * Lista predefinida de arquetipos de riesgo para demostración.
 * Representa diferentes perfiles de comportamiento de empleados.
 */
export const mockArchetypes: RiskArchetype[] = [
    {
        id: 'arch-1',
        name: 'Senior Estable',
        description: 'Empleados con alta antigüedad y baja volatilidad. Base operativa crítica.',
        riskScore: 25,
        composition: 45,
        trend: 'stable',
        color: '#22c55e' // green-500
    },
    {
        id: 'arch-2',
        name: 'Junior Volátil',
        description: 'Nuevas contrataciones (<1 año) con altas tasas de ausentismo temprano.',
        riskScore: 78,
        composition: 20,
        trend: 'up',
        color: '#ef4444' // red-500
    },
    {
        id: 'arch-3',
        name: 'Riesgo de Burnout',
        description: 'Alto desempeño con horas extras excesivas. Riesgo de salida repentina.',
        riskScore: 62,
        composition: 15,
        trend: 'up',
        color: '#f59e0b' // amber-500
    },
    {
        id: 'arch-4',
        name: 'Desconectados',
        description: 'Bajo compromiso y productividad decreciente. Riesgo de rotación silenciosa.',
        riskScore: 45,
        composition: 20,
        trend: 'down',
        color: '#3b82f6' // blue-500
    }
];
