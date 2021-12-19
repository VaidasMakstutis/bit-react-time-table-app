import { Card } from "react-bootstrap";
import React from "react";
import * as services from "../services/companyServices";
import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

function CompanyById() {

    const [company, setCompany] = useState({});
    const {companyId} = useParams();

    useEffect(()=> {
        services.showCompanyById(company=>setCompany(company), companyId)
    },[companyId])

    return (
        <Card>
            <Card.Header>{company.company}</Card.Header>
            <Card.Body>
                <Card.Title>{company.director}</Card.Title>
                <Card.Text>
                    {company.address}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default CompanyById;