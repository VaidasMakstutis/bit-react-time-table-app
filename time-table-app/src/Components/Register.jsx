import { Form, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { register, auth } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

function Register() {

const [userName, setUserName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [user, error, loading] = useAuthState(auth);
const navigate = useNavigate();

useEffect(()=>{
  if(loading) return
  if(user) navigate("works")
}, [user, loading])

const submitHandler = (e) => {
  e.preventDefault();
  if(!userName) alert('Įveskite savo vardą')
  register(userName, email, password)
}

  return (
    <>
      <h2 className="mt-3 text-center">Sukurkite paskyrą</h2>
      <Form className="mx-auto col-sm-6" onSubmit={submitHandler}>
        <Form.Group>
          <Form.Control type="text" placeholder="Įveskite savo vardą"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
           />
        </Form.Group>
        <Form.Group>
          <Form.Control type="email" placeholder="Įveskite savo el.paštą"
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control type="password" placeholder="Įveskite savo slaptažodį"
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">Registracija</Button>
      </Form>
    </>
  );
}

export default Register;