import { Form } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import React from "react";
import Companies from "./Companies";
import Services from "./Services";
import { useState, useEffect } from "react";

function Filter(props) {
  const [filter, setFilter] = useState({});

  const handleChange = e => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value
    });
  };

  const resetFilterHandler = () => {
    setFilter({});
  };

  useEffect(() => {
    props.handleFilter(filter);
  }, [filter]);

  return (
    <div className="filter">
      <Card className="w-50">
        <Card.Header>
          <h3>Duomenų filtravimas</h3>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group>
              <Form.Label>Pasirinkite įmonę:</Form.Label>
              <Form.Select name="company" onChange={handleChange}>
                <option>...</option>
                <Companies />
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Pasirinkite paslaugą:</Form.Label>
              <Form.Select name="service" onChange={handleChange}>
                <option>...</option>
                <Services />
              </Form.Select>
            </Form.Group>
            {Object.keys(filter).length !== 0 && (
              <Button type="reset" variant="primary" onClick={resetFilterHandler}>
                Valyti
              </Button>
            )}
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Filter;
