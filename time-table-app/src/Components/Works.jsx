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
  const [workId, setWorkId] = useState('');
  const value = useMemo(()=>(
    {
      workId, 
      setWorkId
    }
    
  ), [workId])

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
    setWorkId('');
  }

  const handleFilter = items => {
    const filteredItems = works.filter(item => {
      return Object.keys(items).every(filter => {
        return items[filter] === item[filter];
      });
    });
    setFilteredWorks(filteredItems);
    console.log(filteredItems);
  };

  useEffect(()=>{
    services.getAllWorks(setWorks);
  }, [])

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
          <Filter handleFilter={handleFilter} />
        </Card.Header>
        <Card.Header>
          <h3>Darbų sąrašas:</h3>
        </Card.Header>
        <Card.Body>
          <WorkContext.Provider value={value}>
          <WorkTable data={(filteredWorks.length) ? filteredWorks : works } />
          </WorkContext.Provider>
        </Card.Body>
      </Card>
    </>
  );
}

export default Works;