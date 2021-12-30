import React from "react";
import { Link } from "react-router-dom";

function CompanyInfo(props) {

    const getCompanyIdHandler = () => {
        props.delete(props.companyId)
    }

    return (
        <tr>
            <td>{props.company}</td>
            <td>{props.director}</td>
            <td>{props.address}</td>
            <td><button className="btn btn-danger button" onClick={getCompanyIdHandler}>Šalinti</button></td>
            <td><Link className="btn btn-primary" key={props.companyId} to={`/company/${props.companyId}`}>Plačiau</Link></td>
        </tr>
    )
}

export default CompanyInfo;