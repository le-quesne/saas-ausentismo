import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, BrainCircuit, Activity, Users, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

/**
 * Página de inicio de la aplicación.
 * Presenta una visión general de los módulos disponibles y la propuesta de valor.
 *
 * @returns {JSX.Element} La página de inicio renderizada.
 */
const Home = () => {
    const navigate = useNavigate();

    const modules = [
        {
            title: 'Centro de Resiliencia',
            description: 'Dashboard ejecutivo para monitorear KPIs financieros y operativos en tiempo real. Visualice el Capital Protegido y el EBITDA en Riesgo.',
            icon: LayoutDashboard,
            path: '/dashboard',
            color: 'text-blue-400',
            bgColor: 'bg-blue-400/10',
        },
        {
            title: 'Inteligencia Predictiva',
            description: 'Anticipe riesgos de ausentismo mediante análisis de Check-in de Ánimo y detección temprana de fatiga organizacional.',
            icon: BrainCircuit,
            path: '/predictability',
            color: 'text-purple-400',
            bgColor: 'bg-purple-400/10',
        },
        {
            title: 'Simulador de Crisis',
            description: 'Ensaye escenarios de estrés y active respuestas elásticas (Staffing On-Demand) para medir su impacto en la continuidad.',
            icon: Activity,
            path: '/simulator',
            color: 'text-emerald-400',
            bgColor: 'bg-emerald-400/10',
        },
        {
            title: 'Segmentación de Fuerza Laboral',
            description: 'Entienda los arquetipos de comportamiento de su equipo e identifique focos de riesgo conductual y liderazgo tóxico.',
            icon: Users,
            path: '/archetypes',
            color: 'text-amber-400',
            bgColor: 'bg-amber-400/10',
        },
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-12 py-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                    Bienvenido a <span className="text-primary">OpResilience AI</span>
                </h1>
                <p className="text-xl text-muted max-w-2xl mx-auto">
                    La plataforma integral para transformar la gestión de ausentismo en una estrategia de continuidad operativa y protección financiera.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {modules.map((module) => (
                    <div
                        key={module.path}
                        onClick={() => navigate(module.path)}
                        className="group bg-surface border border-white/5 rounded-2xl p-8 hover:border-white/20 hover:bg-white/5 transition-all cursor-pointer relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowRight className="text-white" />
                        </div>

                        <div className={clsx("w-14 h-14 rounded-xl flex items-center justify-center mb-6", module.bgColor, module.color)}>
                            <module.icon size={28} />
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                            {module.title}
                        </h3>

                        <p className="text-muted leading-relaxed">
                            {module.description}
                        </p>
                    </div>
                ))}
            </div>

            <div className="bg-surface border border-white/5 rounded-xl p-8 text-center">
                <h3 className="text-lg font-medium text-white mb-2">¿Por qué OpResilience?</h3>
                <p className="text-muted max-w-3xl mx-auto">
                    A diferencia de los sistemas tradicionales de RRHH que solo registran faltas, OpResilience utiliza IA para predecir riesgos, cuantificar el impacto financiero y ofrecer soluciones elásticas inmediatas.
                </p>
            </div>
        </div>
    );
};

export default Home;
