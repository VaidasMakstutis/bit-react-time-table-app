import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { resetPassword, auth } from "../services/authServices";

function Reset() {

const [email, setEmail] = useState();
const navigate = useNavigate();
const submitHandler = (e) => {
    e.preventDefault();
    if(!email) alert('Iveskite el.pasta')
    resetPassword(email);
    navigate("/login");
}

    return (
        <>
            <h2 className="mt-3 text-center">Atstatykite slaptazodi</h2>
            <Form className="mx-auto col-sm-6" onSubmit={submitHandler}>
                <Form.Control
                    type="email"
                    placeholder="El.pasto adresas"
                    onChange={(e)=>setEmail(e.target.value)}
                    value={email}
                />
                <Button type="submit">Atstatyti</Button>
            </Form>
            <div>
                Neturite paskyros? <Link to="/register">Registracija</Link>
            </div>
        </>
    )
}

export default Reset;