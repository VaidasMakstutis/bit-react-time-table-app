import { Form } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import React from "react";
import Companies from "./Companies";
import Services from "./Services";
import { useState } from "react";

function Filter(props) {
  const [filter, setFilter] = useState({});

  const handleFilter = e => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value
    })
  }

  const submitFilter = e => {
    e.preventDefault();
    props.setFilter(filter);
  };

  return (
    <Card>
      <Card.Body>
        <Form onSubmit={submitFilter}>
          <Form.Group>
            <Form.Label>Pasirinkite įmonę:</Form.Label>
            <Form.Select name="company" onChange={handleFilter}>
            <option>...</option>
              <Companies />
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Pasirinkite paslaugą:</Form.Label>
            <Form.Select name="service" onChange={handleFilter}>
            <option>...</option>
              <Services />
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Button type="submit" variant="primary">Filtruoti</Button>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Filter;
