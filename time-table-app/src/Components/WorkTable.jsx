import { Table } from "react-bootstrap";
import Work from "./Work";
import * as services from "../services/worksServices";
import { useGlobalContext } from "../context/WorksContext";

function WorkTable(props) {

  const { worksNew, worksFiltered } = useGlobalContext();
  
  const deleteItemHandler = id => {
    services.deleteWork(id);
  };

  return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Data</th>
            <th>Įmonė</th>
            <th>Paslauga</th>
            <th>Trukmė</th>
            <th>Redaguoti</th>
            <th>Šalinti</th>
            <th>Plačiau</th>
          </tr>
        </thead>
        <tbody>
        {props.data.length
            ? props.data.map((work, i) => (
                <Work
                  key={i}
                  id={work.id}
                  date={work.date}
                  company={work.company}
                  service={work.service}
                  startTime={work.startTime}
                  endTime={work.endTime}
                  delete={deleteItemHandler}
                />
              ))
            : null}
        </tbody>
      </Table>
  );
}

export default WorkTable;