import { Navigate, Route, Routes } from 'react-router-dom'
import LandingPage2 from '../pages/landing/LandingPage2'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import ForgotPassword from '../pages/auth/ForgotPassword'
import AppLayout from '../components/layout/AppLayout'
import ProtectedRoute from './ProtectedRoute'
import Dashboard from '../pages/dashboard/Dashboard'
import Transactions from '../pages/finance/Transactions'
import Budget from '../pages/finance/Budget'
import Investments from '../pages/finance/Investments'
import Market from '../pages/finance/Market'
import TaxCalculator from '../pages/tools/TaxCalculator'
import RentVsBuy from '../pages/tools/RentVsBuy'
import Wealth from '../pages/tools/Wealth'
import Forecast from '../pages/tools/Forecast'
import Anomalies from '../pages/tools/Anomalies'
import Assistant from '../pages/tools/Assistant'
import Reports from '../pages/tools/Reports'
import Settings from '../pages/tools/Settings'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage2 />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/app" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="budget" element={<Budget />} />
        <Route path="investments" element={<Investments />} />
        <Route path="market" element={<Market />} />
        <Route path="tax" element={<TaxCalculator />} />
        <Route path="rent-vs-buy" element={<RentVsBuy />} />
        <Route path="wealth" element={<Wealth />} />
        <Route path="forecast" element={<Forecast />} />
        <Route path="anomalies" element={<Anomalies />} />
        <Route path="assistant" element={<Assistant />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
