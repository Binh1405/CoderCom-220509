import { Navigate, useLocation } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import useAuth from "../hooks/useAuth";

function AuthRequire({ children }) {
  const auth = useAuth();
  console.log("auth in AuthRequire", auth);
  const { isInitialized, isAuthenticated } = auth;
  const location = useLocation();
  if (!isInitialized) {
    return <LoadingScreen />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
export default AuthRequire;
