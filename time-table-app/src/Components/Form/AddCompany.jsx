import { Card } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useState } from "react";

function AddCompany(props) {

const [companyInfo, setCompanyInfo] = useState({
    company: "",
    director: "",
    address: "",
});

const handleChange = (e) => {
  setCompanyInfo({
    ...companyInfo,
    [e.target.name]:e.target.value,
  })
}

const handleSubmit = (e) => {
  e.preventDefault();
  props.setCompanies(companyInfo);
};

  return (
    <div className="form">
      <Card className="w-50">
        <Card.Header>Pridėkite naują įmonę</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Įveskite įmonės pavadinimą:</Form.Label>
              <Form.Control type="text" name="company" onChange={handleChange} value={companyInfo.company} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Įveskite įmonės vadovą:</Form.Label>
              <Form.Control type="text" name="director" onChange={handleChange} value={companyInfo.director} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Įveskite įmonės adresą:</Form.Label>
              <Form.Control type="text" name="address" onChange={handleChange} value={companyInfo.address} required />
            </Form.Group>
            <Button type="submit" variant="primary" className="button">
              Saugoti
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AddCompany;
