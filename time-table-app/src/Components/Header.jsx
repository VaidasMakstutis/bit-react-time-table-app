import {Navbar} from "react-bootstrap";
import {Container} from "react-bootstrap";
import User from "./User";

function Header() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">TimeTable App</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
          </Navbar.Collapse>
          <User />
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
