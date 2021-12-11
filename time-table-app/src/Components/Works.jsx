import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import AddWork from "./Form/AddWork";
import React, { useEffect, useState, useMemo } from "react";
import Filter from "./Filter";
import WorkTable from "./WorkTable";
import * as services from "../services";

export const WorkContext = React.createContext({});

function Works(props) {
  const [addWork, setAddWork] = useState(false);
  const [works, setWorks] = useState([]);
  const [filteredWorks, setFilteredWorks] = useState([]);
  const [workId, setWorkId] = useState("");
  const [sortBy, setSortBy] = useState("COMPANY_ASC");

  const value = useMemo(
    () => ({
      workId,
      setWorkId
    }),
    [workId]
  );

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

  const onUpdateWorkHandler = (id, data) => {
    services.updateWork(id, data);
    setWorkId("");
  };

  const handleFilter = items => {
    const filteredItems = works.filter(item => {
      return Object.keys(items).every(filter => {
        return items[filter] === item[filter];
      });
    });
    setFilteredWorks(filteredItems);
    // console.log(filteredItems);
  };

  const sortByCompanyHandler = () => {
    setSortBy(prevState => {
      return prevState === "COMPANY_DESC" ? "COMPANY_ASC" : "COMPANY_DESC";
    });
  }

  const sortByServiceHandler = () => {
    setSortBy(prevState => {
      return prevState === "SERVICE_DESC" ? "SERVICE_ASC" : "SERVICE_DESC";
    });
  }

  useEffect(() => {
    services.getAllWorks(setWorks, sortBy);
  }, [sortBy]);

  return (
    <>
      {(addWork || workId) && <AddWork setWorks={handleAddWork} update={workId} onUpdateWorkHandler={onUpdateWorkHandler} />}
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
          <Card.Body>
            <Filter handleFilter={handleFilter} />
          </Card.Body>
        </Card.Header>
        <Card.Header>
          <Card.Body>
            <button variant="primary" className="btn btn-secondary sort" onClick={sortByCompanyHandler}>Rūšiuoti pagal įmonę ↓ ↑</button>
            <button variant="primary" className="btn btn-secondary sort" onClick={sortByServiceHandler}>Rūšiuoti pagal paslaugą ↓ ↑</button>
          </Card.Body>
        </Card.Header>
        <Card.Header>
          <h3>Darbų sąrašas:</h3>
        </Card.Header>
        <Card.Body>
          <WorkContext.Provider value={value}>
            <WorkTable sortByCompanyHandler={sortByCompanyHandler} sortByServiceHandler={sortByServiceHandler} data={filteredWorks.length ? filteredWorks : works} />
          </WorkContext.Provider>
        </Card.Body>
      </Card>
    </>
  );
}

export default Works;
