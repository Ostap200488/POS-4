import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Home, Auth, Orders, Tables, Menu, Dashboard } from "./pages";
import Header from "./components/shared/Header";
import { getUserData } from "./https";
import { setUser, removeUser } from "./redux/slices/userSlice";

/* =========================
   APP LAYOUT
========================= */
function AppLayout() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.user);

  const [authChecked, setAuthChecked] = useState(false);

  const hideHeaderRoutes = ["/auth"];

  /* =========================
     LOAD USER ON APP START
  ========================= */
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await getUserData();

        if (res?.data?.data) {
          dispatch(setUser(res.data.data));
        } else {
          dispatch(removeUser());
        }
      } catch (error) {
        console.error("Unexpected auth error:", error);
        dispatch(removeUser());
      } finally {
        setAuthChecked(true);
      }
    };

    loadUser();
  }, [dispatch]);

  // ⏳ Wait until auth status is known
  if (!authChecked) {
    return null; // or loading spinner
  }

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}

      <Routes>
        {/* PUBLIC ROUTE */}
        <Route
          path="/auth"
          element={isAuth ? <Navigate to="/" replace /> : <Auth />}
        />

        {/* PROTECTED ROUTES */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tables"
          element={
            <ProtectedRoute>
              <Tables />
            </ProtectedRoute>
          }
        />

        <Route
          path="/menu"
          element={
            <ProtectedRoute>
              <Menu />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </>
  );
}

/* =========================
   PROTECTED ROUTE
========================= */
function ProtectedRoute({ children }) {
  const { isAuth } = useSelector((state) => state.user);

  if (!isAuth) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

/* =========================
   ROOT APP
========================= */
function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
