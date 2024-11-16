import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";
import UserPanel from "./hooks/user-panel";

const App: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <header className="header">
        
        {user ? (
          <UserPanel
            username={user}
            avatarUrl="" // Optionally provide an avatar URL if available
            onLogout={logout} // Pass the logout function to UserPanel
          />
        ) : (
          <div>Please log in</div>
        )}
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default App;
