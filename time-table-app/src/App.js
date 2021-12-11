import "./App.css";
import Works from "./Components/Works";
import Header from "./Components/Header";
import WorkById from "./Components/WorkById";
import { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [message, setMessage] = useState(false);

  const handlerSetMessage = status => {
    if (status) {
      setMessage("Service has been added succesfully!");
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
          <Route path="/" element={<Works status={handlerSetMessage} />} />
          <Route path="/work/:id" element={<WorkById />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
