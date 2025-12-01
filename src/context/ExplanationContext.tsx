import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface ExplanationData {
    title: string;
    description: string;
}

interface ExplanationContextType {
    isExplanatoryMode: boolean;
    toggleMode: () => void;
    activeExplanation: ExplanationData | null;
    showExplanation: (data: ExplanationData) => void;
    closeExplanation: () => void;
}

const ExplanationContext = createContext<ExplanationContextType | undefined>(undefined);

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

export const useExplanation = () => {
    const context = useContext(ExplanationContext);
    if (context === undefined) {
        throw new Error('useExplanation must be used within an ExplanationProvider');
    }
    return context;
};
