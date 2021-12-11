import { Card } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FloatingLabel } from "react-bootstrap";
import Services from "../Services";
import Companies from '../Companies';
import { useEffect, useState } from "react";
import * as services from "../../services";

function AddWork(props) {

  const [items, setItems] = useState({
      date: "",
      company: "",
      service: "",
      description: "",
      startTime: "",
      endTime: "",
  });

  useEffect(()=> {
    props.update && services.showById(item => setItems(item), props.update);
  }, [props.update])

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

  const updateHandler = () => {
    props.onUpdateWorkHandler(items, props.update);
  }

  return (
    <div className="form">
      <Card className="w-50">
        <Card.Header>Pridėkite naują darbą</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Pasirinkite datą:</Form.Label>
              <Form.Control type="date" name="date" onChange={handleChange} value={items.date} required />
            </Form.Group>
            <Form.Group>
            <Form.Label>Pasirinkite įmonę:</Form.Label>
              <Form.Select aria label="Default select example" name="company" onChange={handleChange} value={items.company} required>
              <option>...</option>
              <Companies />
              </Form.Select>
            </Form.Group>
            <Form.Group>
            <Form.Label>Pasirinkite paslaugą:</Form.Label>
              <Form.Select aria label="Default select example" name="service" onChange={handleChange} value={items.service} required>
              <option>...</option>
              <Services />
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <FloatingLabel controlId="floatingTextarea2" label="Atlikto darbo aprašymas">
                <Form.Control as="textarea" style={{ height: "100px" }} name="description" onChange={handleChange} value={items.description} required />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nuo:</Form.Label>
              <Form.Control type="time" name="startTime" onChange={handleChange} value={items.startTime} required></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Iki:</Form.Label>
              <Form.Control type="time" name="endTime" onChange={handleChange} value={items.endTime} required></Form.Control>
            </Form.Group>
            <Form.Group>
            {(props.update) ?
              <Button type="button" onClick={updateHandler} variant="primary">Atnaujinti</Button>
              :
              <Button type="submit" variant="primary">Saugoti</Button> 
            }
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AddWork;
