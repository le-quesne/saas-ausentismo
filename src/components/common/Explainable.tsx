import React, { type ReactNode } from 'react';
import { useExplanation } from '../../context/ExplanationContext';
import clsx from 'clsx';
import { HelpCircle } from 'lucide-react';

/**
 * Propiedades para el componente Explainable.
 */
interface ExplainableProps {
    /** Título que aparecerá en el modal de explicación. */
    title: string;
    /** Descripción detallada que aparecerá en el modal. */
    description: string;
    /** Elemento hijo que será envuelto y se volverá interactivo en modo explicativo. */
    children: ReactNode;
    /** Clases CSS adicionales para el contenedor. */
    className?: string;
}

/**
 * Componente envoltorio que hace que sus hijos sean "explicables".
 * Cuando el modo explicativo está activo, al hacer clic en este componente se muestra un modal con información.
 *
 * @param {ExplainableProps} props - Propiedades del componente.
 * @returns {JSX.Element} El componente renderizado.
 */
const Explainable: React.FC<ExplainableProps> = ({ title, description, children, className }) => {
    const { isExplanatoryMode, showExplanation } = useExplanation();

    const handleClick = (e: React.MouseEvent) => {
        if (isExplanatoryMode) {
            e.preventDefault();
            e.stopPropagation();
            showExplanation({ title, description });
        }
    };

    return (
        <div
            onClick={handleClick}
            className={clsx(
                "relative transition-all duration-200 rounded-xl",
                isExplanatoryMode && "cursor-help ring-2 ring-primary/50 hover:ring-primary hover:bg-primary/5 group",
                className
            )}
        >
            {isExplanatoryMode && (
                <div className="absolute -top-2 -right-2 z-10 bg-primary text-black rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity scale-0 group-hover:scale-100">
                    <HelpCircle size={14} strokeWidth={3} />
                </div>
            )}
            {children}
        </div>
    );
};

export default Explainable;
