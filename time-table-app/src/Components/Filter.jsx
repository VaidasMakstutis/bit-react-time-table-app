import { Form } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import React from "react";
import Companies from "./Companies";
import Services from "./Services";
import { useEffect } from "react";
import { useGlobalContext } from "../context/WorksContext";

function Filter(props) {

const {handleFilter, filter, worksFiltered} = useGlobalContext();

  const handleChange = e => {
      handleFilter({
          ...filter,
      [e.target.name]: e.target.value
      })
  }

  useEffect(()=>{
    if(!worksFiltered.length) {
      handleFilter({});
    }
  }, [worksFiltered]);

  const resetFilterHandler = () => {
    handleFilter({});
  };

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