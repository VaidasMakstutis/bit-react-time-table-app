import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import * as userServices from "../services/userServices";

function User() {
  const [userData, setUserData] = useState({});
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/");
    userServices.getUserData(user, setUserData);
  }, [user, loading, userData]);

  return (
    <Navbar.Collapse>
      {user && (
        <NavDropdown title={userData.name}>
          <NavDropdown.Item>{userData.email}</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={logout}>Atsijungti</NavDropdown.Item>
        </NavDropdown>
      )}
    </Navbar.Collapse>
  );
}

export default User;
