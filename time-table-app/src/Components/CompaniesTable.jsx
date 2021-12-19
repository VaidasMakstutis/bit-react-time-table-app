import { Table } from "react-bootstrap";
import CompanyInfo from "./CompanyInfo";
import * as companyServices from "../services/companyServices";

function CompaniesTable(props) {
  const deleteCompanyHandler = companyId => {
    companyServices.deleteCompany(companyId);
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Įmonės pavadinimas</th>
          <th>Vadovas</th>
          <th>Adresas</th>
          <th>Šalinti</th>
          <th>Plačiau</th>
        </tr>
      </thead>
      <tbody>
        {props.companies.map((c, i) => {
          return (
            <CompanyInfo
              key={i}
              companyId={c.companyId}
              company={c.company}
              director={c.director}
              address={c.address}
              delete={deleteCompanyHandler}
            />
          );
        })}
      </tbody>
    </Table>
  );
}

export default CompaniesTable;