import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateForm from "./pages/CreateForm";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SubmitResponse from "./pages/SubmitResponse";
import ViewResponses from "./pages/ViewResponses";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/create-form" element={<CreateForm />} />
        <Route path="/submit/:formId" element={<SubmitResponse />} />
        <Route path="/responses/:formId" element={<ViewResponses />} />
      </Routes>
    </Router>
  );
}

export default App;
