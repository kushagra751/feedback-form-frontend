import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateForm from "./pages/CreateForm";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/create-form" element={<CreateForm />} />
      </Routes>
    </Router>
  );
}

export default App;
