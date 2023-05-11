import { Route, Redirect } from "react-router-dom";
import useAuth from "hooks/useAuth.tsx";

export default function ProtectedRoute(props) {
  const isAuthenticated = useAuth();

  return isAuthenticated ? <Route {...props} /> : <Redirect to="/login" />;
}
