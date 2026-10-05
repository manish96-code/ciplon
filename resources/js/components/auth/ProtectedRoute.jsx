// ProtectedRoute component - in Laravel + Inertia, route protection is enforced server-side via web middleware
export default function ProtectedRoute({ children }) {
  return children || null;
}
