import React, { type ReactNode } from 'react';
import { useExplanation } from '../../context/ExplanationContext';
import clsx from 'clsx';
import { HelpCircle } from 'lucide-react';

interface ExplainableProps {
    title: string;
    description: string;
    children: ReactNode;
    className?: string;
}

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
