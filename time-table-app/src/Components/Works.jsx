import { Card } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import AddWork from "./Form/AddWork";
import React, {useState} from "react";

function Works () {
    const [addWork, setAddWork] = useState(false);

    const addWorkHandler = () => {
        setAddWork(true);
    }

    const closeFormHandler = () => {
        setAddWork(false);
    }

    return (
        <>
        {addWork && <AddWork /> }
        <Card>
            <Card.Header>
                { (addWork) ?  <Button className="btn btn-primary" onClick={closeFormHandler}>Atšaukti</Button>:
                <Button className="btn btn-primary" onClick={addWorkHandler}>Pridėti</Button>}
                </Card.Header> 
            <Card.Header><h3>Darbų sąrašas:</h3></Card.Header>
            <Card.Body>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Klientas</th>
                            <th>Suteikta paslauga</th>
                            <th>Aprašymas</th>
                            <th>Trukmė</th>
                        </tr>
                    </thead>
                </Table>
            </Card.Body>
        </Card>
        </>
    )
}

export default Works;