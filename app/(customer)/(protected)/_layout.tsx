import { Redirect, Slot } from "expo-router";
import { useAuth } from "@/src/hooks/auth/useAuth";

export default function ProtectedLayout() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return <Slot />;
}
