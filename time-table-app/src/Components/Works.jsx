import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import AddWork from "./Form/AddWork";
import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import WorkTable from "./WorkTable";
import * as services from "../services";

function Works(props) {
  const [addWork, setAddWork] = useState(false);
  const [works, setWorks] = useState([]);
  const [filteredWorks, setFilteredWorks] = useState([]);
  
  useEffect(()=>{
    services.getAllWorks(setWorks);
  }, [])

  const addWorkHandler = () => {
    setAddWork(true);
  };

  const closeFormHandler = () => {
    setAddWork(false);
  };

  const handleAddWork = data => {
    services.addWork(data);
    setWorks([...works, data]);
    closeFormHandler();
    props.status(true);
  };

  const handleFilter = items => {
    const filteredItems = works.filter(item => {
      return Object.keys(items).every(filter => {
        return items[filter] === item[filter];
      });
    });
    setFilteredWorks(filteredItems);
    console.log(filteredItems);
  };

  return (
    <>
      {addWork && <AddWork setWorks={handleAddWork} />}
      <Card>
        <Card.Header>
          {addWork ? (
            <Button className="btn btn-primary" onClick={closeFormHandler}>
              Atšaukti
            </Button>
          ) : (
            <Button className="btn btn-primary" onClick={addWorkHandler}>
              Pridėti
            </Button>
          )}
        </Card.Header>
        <Card.Header>
          <Filter setFilter={handleFilter} />
        </Card.Header>
        <Card.Header>
          <h3>Darbų sąrašas:</h3>
        </Card.Header>
        <Card.Body>
          <WorkTable data={(works.length) ? works : filteredWorks} />
        </Card.Body>
      </Card>
    </>
  );
}

export default Works;