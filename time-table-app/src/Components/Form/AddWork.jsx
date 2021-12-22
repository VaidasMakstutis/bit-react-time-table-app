import { Card } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FloatingLabel } from "react-bootstrap";
import Services from "../Services";
import Companies from '../Companies';
import { useEffect, useState } from "react";
import * as services from "../../services/worksServices";
import * as userServices from "../../services/authServices";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/authServices";
import { useGlobalContext } from "../../context/WorksContext";
import Error from "../Error";
import { useParams } from "react-router-dom";


function AddWork(props) {

  const [user, loading, error] = useAuthState(auth);
  const {id} = useParams();
  const {work, errors, handleAddWorkData, workValidation, addWorkToFirestore} = useGlobalContext();

  const [items, setItems] = useState({
      date: "",
      company: "",
      service: "",
      description: "",
      startTime: "",
      endTime: "",
  });

  useEffect(()=> {
    try {
      services.showById(data => handleAddWorkData(data), id);
    }catch(error){
      console.log(error);
    }
  }, [id])

  const handleChange = (e) => {
    handleAddWorkData({[e.target.name]:e.target.value})
  }

  useEffect(()=> {
    setItems(prevState => {
      return {
        ...prevState,
        uid: user.uid
      };
    });
  }, [user]);


  const handleSubmit = (e) => {
    e.preventDefault();
    workValidation(work);
    window.scrollTo(0, 0)
    if(Object.keys(errors).length !== 0){
      addWorkToFirestore(work);
    } 
  };

  const updateHandler = () => {
    props.onUpdateWorkHandler(items, props.update);
  }

  useEffect(()=>{
    if(user) {
      handleAddWorkData({uid:user.uid})
    }
  },[user])

  console.log('from work', work);
  console.log('validation errors', errors);
  console.log('Update id', id);

  return (
    <div className="form">
      <Card className="w-50">
        <Card.Header>
          {
            errors && Object.keys(errors).map((key)=>(
              <Error error={errors[key]} />
            ))
          }
        </Card.Header>
        <Card.Header>Pridėkite naują darbą</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Pasirinkite datą:</Form.Label>
              <Form.Control type="date" name="date" onChange={handleChange} value={work.date} />
            </Form.Group>
            <Form.Group>
            <Form.Label>Pasirinkite įmonę:</Form.Label>
              <Form.Select aria label="Default select example" name="company" onChange={handleChange} value={work.company}>
              <option>...</option>
              <Companies />
              </Form.Select>
            </Form.Group>
            <Form.Group>
            <Form.Label>Pasirinkite paslaugą:</Form.Label>
              <Form.Select aria label="Default select example" name="service" onChange={handleChange} value={work.service}>
              <option>...</option>
              <Services />
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <FloatingLabel controlId="floatingTextarea2" label="Atlikto darbo aprašymas">
                <Form.Control as="textarea" style={{ height: "100px" }} name="description" onChange={handleChange} value={work.description}/>
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nuo:</Form.Label>
              <Form.Control type="time" name="startTime" onChange={handleChange} value={work.startTime}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Iki:</Form.Label>
              <Form.Control type="time" name="endTime" onChange={handleChange} value={work.endTime}></Form.Control>
            </Form.Group>
            <Form.Group>
              {(id) ?
              <Button type="button" onClick={updateHandler} variant="primary">Atnaujinti</Button>
              :
              <Button type="submit" variant="primary">Saugoti</Button> 
              }
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AddWork;
