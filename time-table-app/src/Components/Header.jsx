import {Navbar} from "react-bootstrap";
import {Container} from "react-bootstrap";

function Header() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">TimeTable App</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text><a href="https://github.com/VaidasMakstutis" target="_blank">Github</a> Vaidas</Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
