import { AuthPage } from "./pages/AuthPage";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import { CashierDashboard } from "./pages/CashierDashboard";
import { AdminDashboard } from "./pages/AdminDashboard";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AuthPage></AuthPage>}></Route>
        <Route
          path="/admin"
          element={
            <ProtectedRoutes allowedRole="admin">
              <AdminDashboard></AdminDashboard>
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="/cashier"
          element={
            <ProtectedRoutes allowedRole="cashier">
              <CashierDashboard></CashierDashboard>
            </ProtectedRoutes>
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
