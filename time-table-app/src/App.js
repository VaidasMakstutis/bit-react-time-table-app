import "./App.css";
import Works from "./Components/Works";
import Header from "./Components/Header";
import WorkById from "./Components/WorkById";
import CompanyById from "./Components/CompanyById";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Reset from "./Components/Reset";
import { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CompaniesTable from "./Components/CompaniesTable";

function App() {
  const [message, setMessage] = useState(false);

  const handlerSetMessage = status => {
    if (status) {
      setMessage("Įrašas pridėtas!");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 5000);
  }, [message]);

  return (
    <div className="App">
      <Router>
        <Header />
        {message && <Alert variant="success">{message}</Alert>}
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/reset" element={<Reset />}/>
          <Route path="/works" element={<Works status={handlerSetMessage} />} />
          <Route path="/companies" element={<CompaniesTable />} />
          <Route path="/work/:id" element={<WorkById />} />
          <Route path="/company/:id" element={<CompanyById />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
