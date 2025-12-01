import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import RiskCommand from './pages/RiskCommand';
import ArchetypeEngine from './pages/ArchetypeEngine';
import ContinuitySimulator from './pages/ContinuitySimulator';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<RiskCommand />} />
          <Route path="archetypes" element={<ArchetypeEngine />} />
          <Route path="simulator" element={<ContinuitySimulator />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
