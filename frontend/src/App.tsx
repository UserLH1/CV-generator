import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  // const { user, isLoaded, isSignedIn } = {
  //   user: false,
  //   isLoaded: true,
  //   isSignedIn: false,
  // };
  // console.log({ user, isLoaded, isSignedIn });

  // if (!isSignedIn && isLoaded) {
  //   console.log("User is not signed in");
  //   return <Navigate to="/register" />;
  // }

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
