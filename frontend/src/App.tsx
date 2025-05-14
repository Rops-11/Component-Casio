import EmployeesPage from "./pages/EmployeesPage";
import UsersPage from "./pages/UsersPage";
import MembersPage from "./pages/MembersPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ToDoPage from "./pages/ToDoPage";
import NavBar from "./components/utils/NavBar.tsx";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
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
        <Route
          path="/todo"
          element={<ToDoPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
