import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import AddWork from "./Form/AddWork";
import AddCompany from "./Form/AddCompany";
import CompaniesTable from "./CompaniesTable";
import React, { useEffect, useState, useMemo } from "react";
import Filter from "./Filter";
import WorkTable from "./WorkTable";
import * as worksServices from "../services/worksServices";
import * as companyServices from "../services/companyServices";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/WorksContext";
import { filterWorks } from "../actions/WorksActions";

function Works(props) {

  const {worksItems, worksFiltered, filter, isOpen, handleForm} = useGlobalContext();

  const [addWork, setAddWork] = useState(false);
  const [addCompany, setAddCompany] = useState(false);
  const [works, setWorks] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [companiesTable, setCompaniesTable] = useState(false);
  const [workId, setWorkId] = useState("");
  const [sortBy, setSortBy] = useState("COMPANY_ASC");

  const [user, error, loading] = useAuthState(auth);
  const navigate = useNavigate();

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
    worksServices.addWork(data);
    setWorks([...works, data]);
    closeFormHandler();
    props.status(true);
  };

  const onUpdateWorkHandler = (id, data) => {
    worksServices.updateWork(id, data);
    setWorkId("");
  };

  const addCompanyHandler = () => {
    setAddCompany(true);
  };

  const closeCompanyForm = () => {
    setAddCompany(false);
  };

  const handleAddCompany = data => {
    companyServices.addCompany(data);
    closeCompanyForm();
    props.status(true);
  };

  const showCompaniesTable = () => {
    setCompaniesTable(true);
  };
  const closeCompaniesTable = () => {
    setCompaniesTable(false);
  };

  const sortByCompanyHandler = () => {
    setSortBy(prevState => {
      return prevState === "COMPANY_DESC" ? "COMPANY_ASC" : "COMPANY_DESC";
    });
  };

  const sortByServiceHandler = () => {
    setSortBy(prevState => {
      return prevState === "SERVICE_DESC" ? "SERVICE_ASC" : "SERVICE_DESC";
    });
  };

  useEffect(() => {
    if (!user) navigate("/");
    user && worksServices.getAllWorks(setWorks, user);
    companyServices.getAllCompanies(companies => setCompanies(companies));
  }, []);

  console.log('State filter:', filter);
  console.log('State worksfiltered:', worksFiltered);

  return (
    <>
      {addCompany && <AddCompany setCompanies={handleAddCompany}/>}
      {companiesTable && <CompaniesTable companies={companies}/>}
      {(isOpen) && <AddWork setWorks={handleAddWork} update={workId} onUpdateWorkHandler={onUpdateWorkHandler} />}
      <Card>
        <Card.Header>
          {isOpen ? (
            <Button className="btn btn-primary button" onClick={()=>{handleForm(false)}}>
              Atšaukti
            </Button>
          ) : (
            <Button className="btn btn-primary button" onClick={()=>{handleForm(true)}}>
              Pridėti naują darbą
            </Button>
          )}
          {addCompany ? (
            <Button className="btn btn-danger button" onClick={closeCompanyForm}>
              Atšaukti
            </Button>
          ) : (
            <Button className="btn btn-primary button" onClick={addCompanyHandler}>
              Pridėti naują įmonę
            </Button>
          )}
          {companiesTable ? (
            <Button className="btn btn-danger button" onClick={closeCompaniesTable}>
              Uždaryti
            </Button>
          ) : (
            <Button className="btn btn-secondary button" onClick={showCompaniesTable}>
              Įmonių sąrašas
            </Button>
          )}
        </Card.Header>
        <Card.Header>
          <Card.Body>
            <button variant="primary" className="btn btn-secondary sort" onClick={sortByCompanyHandler}>
              Rūšiuoti pagal įmonę ↓ ↑
            </button>
            <button variant="primary" className="btn btn-secondary sort" onClick={sortByServiceHandler}>
              Rūšiuoti pagal paslaugą ↓ ↑
            </button>
          </Card.Body>
        </Card.Header>
        <Card.Header>
          <Filter />
        </Card.Header>
        <Card.Header>
          <h3>Darbų sąrašas:</h3>
        </Card.Header>
        <Card.Body>
          {(Object.keys(worksFiltered).length) ?
            <WorkTable data={worksFiltered} />
            :
            <WorkTable data={worksItems} />
          }
        </Card.Body>
      </Card>
    </>
  );
}

export default Works;
