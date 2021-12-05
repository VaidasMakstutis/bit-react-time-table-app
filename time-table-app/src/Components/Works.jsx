import { Card } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import AddWork from "./Form/AddWork";
import React, { useState } from "react";
import Work from "./Work";
import Filter from "./Filter";

function Works(props) {
  const [addWork, setAddWork] = useState(false);
  const [works, setWorks] = useState([]);
  const [filteredWorks, setFilteredWorks] = useState([]);

  const addWorkHandler = () => {
    setAddWork(true);
  };

  const closeFormHandler = () => {
    setAddWork(false);
  };

  const handleAddWork = data => {
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
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Data</th>
                <th>Įmonė</th>
                <th>Paslauga</th>
                <th>Aprašymas</th>
                <th>Trukmė</th>
              </tr>
            </thead>
            <tbody>
                {
              (filteredWorks.length)?
              (filteredWorks.map((work, i) => (
                <Work
                  key={work.i}
                  date={work.date}
                  company={work.company}
                  service={work.service}
                  description={work.description}
                  startTime={work.startTime}
                  endTime={work.endTime}
                />
              )))

              :

              (works.map((work =>
                <Work
                  key={work.i}
                  date={work.date}
                  company={work.company}
                  service={work.service}
                  description={work.description}
                  startTime={work.startTime}
                  endTime={work.endTime}
                />
              )))
              }
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
}

export default Works;
