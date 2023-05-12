import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import Spinner from "../Spinner/Spinner";

export default function ProtectedRoute({ children }) {
  const { userRegister, loading } = useAuth();

  if (loading) return <Spinner/>;

  if (!userRegister) return <Navigate to="/login" />;

  return (
    <>
      {loading && <Spinner/>}
      {children}
    </>
  );
}
