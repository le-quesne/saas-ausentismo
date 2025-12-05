import { X, Info } from 'lucide-react';
import { useExplanation } from '../../context/ExplanationContext';

/**
 * Modal que muestra la información detallada de un elemento "explicable".
 * Se renderiza solo si hay una explicación activa en el contexto.
 *
 * @returns {JSX.Element | null} El modal renderizado o null si no hay explicación activa.
 */
const ExplanationModal = () => {
    const { activeExplanation, closeExplanation } = useExplanation();

    if (!activeExplanation) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-surface border border-primary/30 rounded-xl max-w-md w-full shadow-2xl shadow-primary/10 animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                    <div className="flex items-center gap-2 text-primary">
                        <Info size={20} />
                        <h3 className="font-bold text-lg">{activeExplanation.title}</h3>
                    </div>
                    <button
                        onClick={closeExplanation}
                        className="text-muted hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>
                <div className="p-6">
                    <p className="text-white/90 leading-relaxed">
                        {activeExplanation.description}
                    </p>
                </div>
                <div className="p-4 bg-white/5 border-t border-white/10 rounded-b-xl flex justify-end">
                    <button
                        onClick={closeExplanation}
                        className="px-4 py-2 bg-primary text-black font-bold rounded-lg hover:bg-primary/90 transition-colors text-sm"
                    >
                        Entendido
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExplanationModal;
