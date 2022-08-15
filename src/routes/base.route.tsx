import {
  AboutUs,
  AdminTools,
  Careers,
  ConditionsAndTemplates,
  ContactUs,
  Documents,
  EditProfile,
  FAQs,
  ForgetPassword,
  Guidelines,
  Home,
  HowItWorks,
  Investors,
  LoanOverview,
  Login,
  Pipeline,
  Pricing,
  Register,
  Registrations,
  ResetPassword,
  UserActivity,
  Vendors,
  WhereWeLend,
} from 'pages'
import { Navigate, Route, Routes } from 'react-router-dom'
import { PermissionGate } from 'utils/PermissionGate'

import { ProtectedRoute } from './protected.route'

export function BaseRoute() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/about_us" element={<AboutUs />} />
      <Route path="/investors" element={<Investors />} />
      <Route path="/how_it_works" element={<HowItWorks />} />
      <Route path="/where_we_lend" element={<WhereWeLend />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/faqs" element={<FAQs />} />
      <Route path="/contacts" element={<ContactUs />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/guidelines" element={<Guidelines />} />
      <Route path="/documents" element={<Documents />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgetPassword" element={<ForgetPassword />} />
      <Route path="/resetPassword/:selector/:token" element={<ResetPassword />} />
      <Route
        path="/registrations"
        element={
          <ProtectedRoute>
            <PermissionGate permission={'MANAGE_ACCOUNTS'}>
              <Registrations />
            </PermissionGate>
          </ProtectedRoute>
        }
      />
      <Route
        path="/user_activity"
        element={
          <ProtectedRoute>
            <PermissionGate permission={'MANAGE_USER_ACTIVITY'}>
              <UserActivity />
            </PermissionGate>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin_tool/:menu"
        element={
          <ProtectedRoute>
            <PermissionGate permission={'MANAGE_ADMIN_TOOLS'}>
              <AdminTools />
            </PermissionGate>
          </ProtectedRoute>
        }
      />
      <Route
        path="/vendors/:menu"
        element={
          <ProtectedRoute>
            <PermissionGate permission={'MANAGE_VENDORS'}>
              <Vendors />
            </PermissionGate>
          </ProtectedRoute>
        }
      />
      <Route
        path="/condition_template/:menu"
        element={
          <ProtectedRoute>
            <PermissionGate permission={'MANAGE_CONDITIONS_TEMPLATES'}>
              <ConditionsAndTemplates />
            </PermissionGate>
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit_profile"
        element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/loan_process/:action/:loan_number"
        element={
          <ProtectedRoute>
            <LoanOverview />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pipeline"
        element={
          <ProtectedRoute>
            <Pipeline />
          </ProtectedRoute>
        }
      />
      <Route path="/*" element={<Navigate replace to="/home" />} />
    </Routes>
  )
}
