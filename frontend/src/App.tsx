import EmployeesPage from "./pages/EmployeesPage";
import UsersPage from "./pages/UsersPage";
import MembersPage from "./pages/MembersPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/users" />}
        />
        <Route
          path="/users"
          element={<UsersPage />}
        />
        <Route
          path="/employees"
          element={<EmployeesPage />}
        />
        <Route
          path="/members"
          element={<MembersPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
