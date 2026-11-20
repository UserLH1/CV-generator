import { FileText } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";
import UserPanel from "./hooks/user-panel";

export default function App() {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();

  return (
    <>
      {pathname !== "/" && (
        <header className="border-b bg-background print:hidden">
          <div className="mx-auto flex min-h-16 max-w-screen-xl items-center justify-between gap-3 px-5 sm:px-10">
            <Link to="/" className="flex items-center gap-2 font-serif text-xl font-bold text-primary">
              <span className="grid size-8 place-items-center rounded bg-primary text-primary-foreground">
                <FileText size={17} aria-hidden="true" />
              </span>
              Easy CV
            </Link>
            {user && (
              <div className="flex items-center gap-3">
                <Link to="/dashboard" className="text-sm font-medium text-primary hover:underline">My CVs</Link>
                <UserPanel username={user} onLogout={logout} />
              </div>
            )}
          </div>
        </header>
      )}
      <main className="print:bg-white">
        <Outlet />
      </main>
    </>
  );
}
