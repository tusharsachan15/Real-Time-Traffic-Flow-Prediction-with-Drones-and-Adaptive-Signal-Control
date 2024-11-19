import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import SignIn from "./Pages/SignInPage";
import SignIn from "./Pages/SignInPage";
import TestPage from "./Pages/TestPage";
import SignUp from "./Pages/SignUpPage";
import DashboardPage from "./Pages/DashboardPage";
import DronePage from "./Pages/DronePage";
import TrafficPage from "./Pages/TrafficPage";

function App() {
  return (
    <div className="App">
      {/* <ToastContainer /> */}
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<SignIn />} /> */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<DashboardPage />} />
          <Route path="/drone" element={<DronePage />} />
          <Route path="/traffic" element={<TrafficPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
