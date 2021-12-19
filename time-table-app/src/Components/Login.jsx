import { Form, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Link, useNavigate} from "react-router-dom";
import { auth, signIn} from "../services/authServices";
import { useAuthState } from "react-firebase-hooks/auth";

function Login() {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [user, error, loading] = useAuthState(auth);
const navigate = useNavigate();

const submitHandler = (e) => {
    e.preventDefault();
    signIn(email, password);
}

useEffect(()=> {
    if(loading) return
    if(user) navigate("works")
}, [user, loading])

    return (
        <>
        <h2 className="mt-3 text-center">Prisijungimas</h2>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mx-auto col-sm-6">
                <Form.Control 
                type="email"
                placeholder="El.pašto adresas"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
                </Form.Group>
                <Form.Group className="mx-auto col-sm-6">
                <Form.Control 
                type="password"
                placeholder="Slaptažodis"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
                </Form.Group>
                <Button variant="primary" type="submit">Prisijungti</Button>
                <div>
                        <ul>
                            <li>Neturite paskyros? <Link to="/register"> Galite prisiregistruoti</Link></li>
                            <li>Pamiršote slaptažodį? <Link to="/reset"> Atkurkite</Link></li>
                        </ul>
                </div>
            </Form>
        </>
    )
}

export default Login;