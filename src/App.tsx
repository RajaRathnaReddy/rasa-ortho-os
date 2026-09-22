import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { LandingPage } from './features/landing/LandingPage';
import { LoginPage } from './features/auth/LoginPage';
import { Dashboard } from './features/dashboard/Dashboard';
import { PatientsPage } from './features/patients/PatientsPage';
import { PatientDetailPage } from './features/patients/PatientDetailPage';
import { AppointmentsPage } from './features/appointments/AppointmentsPage';
import { DoctorsPage } from './features/doctors/DoctorsPage';
import { SurgeriesPage } from './features/surgeries/SurgeriesPage';
import { ImplantsPage } from './features/implants/ImplantsPage';
import { RecoveryPage } from './features/recovery/RecoveryPage';
import { FollowUpsPage } from './features/follow-ups/FollowUpsPage';
import {
  ReceptionPage,
  ConsultationsPage,
  DiagnosticsPage,
  OTTheatrePage,
  PhysiotherapyPage,
  CommunicationPage,
  AIAssistantPage,
  ReportsPage,
  AnalyticsPage,
  FinancePage,
  InventoryPage,
  StaffPage,
  SettingsPage,
} from './features/pages';
import { useAuthStore } from './stores/authStore';

function RootRoute() {
  const { isAuthenticated } = useAuthStore();
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return <LandingPage />;
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Root Route: Landing Page when logged out, Dashboard when logged in */}
        <Route path="/" element={<RootRoute />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/overview" element={<LandingPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/about" element={<LandingPage />} />

        {/* Protected Hospital OS Workspace */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/patients/:id" element={<PatientDetailPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/reception" element={<ReceptionPage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/consultations" element={<ConsultationsPage />} />
          <Route path="/diagnostics" element={<DiagnosticsPage />} />
          <Route path="/surgeries" element={<SurgeriesPage />} />
          <Route path="/ot-theatre" element={<OTTheatrePage />} />
          <Route path="/implants" element={<ImplantsPage />} />
          <Route path="/recovery" element={<RecoveryPage />} />
          <Route path="/physiotherapy" element={<PhysiotherapyPage />} />
          <Route path="/follow-ups" element={<FollowUpsPage />} />
          <Route path="/communication" element={<CommunicationPage />} />
          <Route path="/ai-assistant" element={<AIAssistantPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/finance" element={<FinancePage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/staff" element={<StaffPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
