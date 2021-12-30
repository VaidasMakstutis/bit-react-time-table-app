import { Card } from "react-bootstrap";
import React from "react";
import * as services from "../services/worksServices";
import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

function WorkById() {

    const [work, setWork] = useState({});
    const {id} = useParams();

    useEffect(()=> {
        services.showById(item=>setWork(item), id)
    },[id])

    return (
        <Card>
            <Card.Header>{work.date}</Card.Header>
            <Card.Body>
                <Card.Title>{work.company}</Card.Title>
                <Card.Text>
                    {work.description}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default WorkById;