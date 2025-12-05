import React, { createContext, useContext, useState, type ReactNode } from 'react';

/**
 * Estructura de datos para una explicación.
 */
interface ExplanationData {
    /** Título de la explicación. */
    title: string;
    /** Descripción detallada del concepto. */
    description: string;
}

/**
 * Interfaz para el contexto de explicación.
 */
interface ExplanationContextType {
    /** Indica si el modo explicativo está activo. */
    isExplanatoryMode: boolean;
    /** Función para alternar el modo explicativo. */
    toggleMode: () => void;
    /** Datos de la explicación activa actualmente (si hay alguna). */
    activeExplanation: ExplanationData | null;
    /** Función para mostrar una explicación específica. */
    showExplanation: (data: ExplanationData) => void;
    /** Función para cerrar la explicación actual. */
    closeExplanation: () => void;
}

const ExplanationContext = createContext<ExplanationContextType | undefined>(undefined);

/**
 * Proveedor del contexto de explicación.
 * Envuelve la aplicación para gestionar el estado global del modo explicativo.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {ReactNode} props.children - Elementos hijos que tendrán acceso al contexto.
 * @returns {JSX.Element} El proveedor del contexto.
 */
export const ExplanationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isExplanatoryMode, setIsExplanatoryMode] = useState(false);
    const [activeExplanation, setActiveExplanation] = useState<ExplanationData | null>(null);

    const toggleMode = () => {
        setIsExplanatoryMode(prev => !prev);
        setActiveExplanation(null); // Close any open explanation when toggling
    };

    const showExplanation = (data: ExplanationData) => {
        if (isExplanatoryMode) {
            setActiveExplanation(data);
        }
    };

    const closeExplanation = () => {
        setActiveExplanation(null);
    };

    return (
        <ExplanationContext.Provider value={{ isExplanatoryMode, toggleMode, activeExplanation, showExplanation, closeExplanation }}>
            {children}
        </ExplanationContext.Provider>
    );
};

/**
 * Hook personalizado para acceder al contexto de explicación.
 *
 * @returns {ExplanationContextType} El contexto de explicación.
 * @throws {Error} Si se usa fuera de un ExplanationProvider.
 */
export const useExplanation = () => {
    const context = useContext(ExplanationContext);
    if (context === undefined) {
        throw new Error('useExplanation must be used within an ExplanationProvider');
    }
    return context;
};
