import { Card, FormControl } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FloatingLabel } from "react-bootstrap";
import Services from "../Services";
import Companies from '../Companies';
import { useState } from "react";

function AddWork(props) {

  const [items, setItems] = useState({
      date: "",
      company: "",
      service: "",
      description: "",
      startTime: "",
      endTime: "",
  });

  const handleChange = (e) => {
    setItems({
      ...items,
      [e.target.name]:e.target.value,
    })

    // console.log(e.target.name);
  }
  // console.log(items);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.setWorks(items);
  };

  return (
    <>
      <Card>
        <Card.Header>Pridėkite naują darbą</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Pasirinkite datą:</Form.Label>
              <Form.Control type="date" name="date" onChange={handleChange} value={items.date} />
            </Form.Group>
            <Form.Group>
            <Form.Label>Pasirinkite įmonę:</Form.Label>
              <Form.Select aria label="Default select example" name="company" onChange={handleChange} value={items.company}>
              <option>...</option>
              <Companies />
              </Form.Select>
            </Form.Group>
            <Form.Group>
            <Form.Label>Pasirinkite paslaugą:</Form.Label>
              <Form.Select aria label="Default select example" name="service" onChange={handleChange} value={items.service}>
              <option>...</option>
              <Services />
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <FloatingLabel controlId="floatingTextarea2" label="Atlikto darbo aprašymas">
                <Form.Control as="textarea" style={{ height: "100px" }} name="description" onChange={handleChange} value={items.description} />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nuo:</Form.Label>
              <Form.Control type="time" name="startTime" onChange={handleChange} value={items.startTime}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Iki:</Form.Label>
              <Form.Control type="time" name="endTime" onChange={handleChange} value={items.endTime}></Form.Control>
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
