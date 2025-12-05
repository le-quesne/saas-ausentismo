# OpResilience AI

Plataforma integral para transformar la gestión de ausentismo en una estrategia de continuidad operativa y protección financiera.

## Descripción General

OpResilience AI es una solución SaaS B2B diseñada para grandes empresas que buscan mitigar el impacto financiero y operativo del ausentismo laboral. A diferencia de los sistemas tradicionales de RRHH, esta plataforma utiliza inteligencia predictiva para anticipar riesgos, cuantificar pérdidas potenciales (EBITDA en riesgo) y ofrecer soluciones de respuesta elástica (Staffing On-Demand).

### Módulos Principales

1.  **Centro de Resiliencia (Dashboard):**
    *   Monitoreo en tiempo real de KPIs financieros (Capital Protegido, EBITDA en Riesgo).
    *   Visualización de la salud operativa global mediante una Matriz de Continuidad.
    *   Alertas tempranas de fatiga organizacional.

2.  **Inteligencia Predictiva:**
    *   Análisis de correlación entre el estado de ánimo (Check-in) y el ausentismo.
    *   Proyecciones de riesgo a 7 días por unidad operativa.
    *   Detección de patrones de liderazgo tóxico o burnout.

3.  **Simulador de Crisis:**
    *   Herramienta "What-If" para ensayar escenarios de estrés.
    *   Evaluación del impacto de estrategias de retención y staffing externo.
    *   Cálculo de ahorro proyectado y mejora en la cobertura operativa.

4.  **Segmentación de Fuerza Laboral (Motor de Arquetipos):**
    *   Clasificación de empleados en arquetipos de riesgo (ej. "Senior Estable", "Junior Volátil").
    *   Identificación de focos rojos de comportamiento.

## Tecnologías Utilizadas

*   **Frontend:** React, TypeScript, Vite
*   **Estilos:** Tailwind CSS, clsx
*   **Visualización de Datos:** Recharts
*   **Iconografía:** Lucide React
*   **Enrutamiento:** React Router DOM

## Configuración y Ejecución

### Requisitos Previos

*   Node.js (versión 16 o superior recomendada)
*   npm o yarn

### Instalación

1.  Clona el repositorio:
    ```bash
    git clone https://github.com/tu-usuario/saas-ausentismo.git
    ```
2.  Navega al directorio del proyecto:
    ```bash
    cd saas-ausentismo
    ```
3.  Instala las dependencias:
    ```bash
    npm install
    ```

### Desarrollo Local

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

### Construcción para Producción

Para generar los archivos estáticos optimizados para producción:

```bash
npm run build
```

Los archivos se generarán en la carpeta `dist`.

## Estructura del Proyecto

```
src/
├── components/         # Componentes reutilizables
│   ├── common/         # Componentes genéricos (Explainable, Modal)
│   ├── dashboard/      # Componentes específicos del dashboard (KPIs, Heatmap)
│   ├── engine/         # Componentes del motor de arquetipos (Gráficos)
│   ├── layout/         # Componentes de estructura (Sidebar, AppLayout)
│   └── simulator/      # Componentes del simulador (Controles)
├── context/            # Contextos de React (ExplanationContext)
├── lib/                # Utilidades y datos simulados (mockData)
├── pages/              # Vistas principales de la aplicación
├── types/              # Definiciones de tipos TypeScript
├── App.tsx             # Configuración de rutas
└── main.tsx            # Punto de entrada
```

## Modo Explicativo

La plataforma incluye un "Modo Explicativo" global. Al activarlo desde la barra superior, los elementos interactivos se resaltan y, al hacer clic, muestran explicaciones detalladas sobre métricas y conceptos clave, facilitando la adopción por parte de usuarios no técnicos.

## Contribución

1.  Haz un Fork del proyecto.
2.  Crea una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`).
3.  Haz Commit de tus cambios (`git commit -m 'Agrega nueva funcionalidad'`).
4.  Haz Push a la rama (`git push origin feature/nueva-funcionalidad`).
5.  Abre un Pull Request.
