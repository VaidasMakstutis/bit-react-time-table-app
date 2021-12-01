import "./App.css";
import Works from "./Components/Works";
import Header from "./Components/Header";
import { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";

function App() {

const [message, setMessage] = useState(false);

const handlerSetMessage = (status) => {
  if (status) {
    setMessage('Service has been added succesfully!');
  }
}

useEffect(() => {
  setTimeout(() => {
  setMessage('');
  }, 5000);
  }, [message]);

  return (
    <div className="App">
      <Header />
      {message && <Alert variant="success">{message}</Alert>}
      <Works status={handlerSetMessage} />
    </div>
  );
}

export default App;
