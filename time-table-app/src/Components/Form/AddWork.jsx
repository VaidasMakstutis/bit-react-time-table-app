import { Card, FormControl } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FloatingLabel } from "react-bootstrap";
import Services from "../Services";
import Companies from '../Companies';

function AddWork() {
  return (
    <>
      <Card>
        <Card.Header>Pridėkite darbą:</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Pasirinkite datą:</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            <Form.Group>
              <Form.Select aria label="Default select example">
              <option value="Pasirinkite įmonę"></option>
              <Services />
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Select aria label="Default select example">
              <option value="Pasirinkite paslaugą"></option>
              <Companies />
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <FloatingLabel controlId="floatingTextarea2" label="">
                <Form.Control as="textarea" placeholder="Palikite komentarą" style={{ height: "100px" }} />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nuo:</Form.Label>
              <Form.Control type="time"></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Iki:</Form.Label>
              <Form.Control type="time"></Form.Control>
            </Form.Group>
            <Form.Group>
              <Button type="submit" variant="primary">
                Saugoti
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default AddWork;
