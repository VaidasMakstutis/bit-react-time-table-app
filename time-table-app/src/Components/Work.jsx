import React from "react";
import { useContext } from "react";
// import { WorkContext } from "./Works";
import { Link } from "react-router-dom";

function Work(props) {

  // const {workId, setWorkId} = useContext(WorkContext);
    
  const diff = (start, end) => {
    start = props.startTime;
    end = props.endTime;
    start = start.split(":");
    end = end.split(":");
    const startDate = new Date(0, 0, 0, start[0], start[1], 0);
    const endDate = new Date(0, 0, 0, end[0], end[1], 0);
    let diff = endDate.getTime() - startDate.getTime();
    let hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    const minutes = Math.floor(diff / 1000 / 60);
    // console.log(startDate);
    return (hours < 9 ? "0" : "") + hours + ":" + (minutes < 9 ? "0" : "") + minutes;
  };

  const getIdHandler = () => {
      props.delete(props.id);
  }

  // const getIdUpdateHandler = () => {
  //     setWorkId(props.id);
  // }

  return (
    <tr>
      <td>{props.date}</td>
      <td>{props.company}</td>
      <td>{props.service}</td>
      <td>{diff(props.startTime, props.endTime)}</td>
      <td><Link className="btn btn-primary" to={`/work/update/${props.id}`}>Redaguoti</Link></td>
      <td><button className="btn btn-danger" onClick={getIdHandler}>Šalinti</button></td>
      <td><Link className="btn btn-primary" key={props.id} to={`/work/${props.id}`}>Plačiau</Link></td>
    </tr>
  );
}

export default Work;
