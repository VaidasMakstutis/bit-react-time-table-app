function Work(props) {
    
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

  return (
    <tr>
      <td>{props.date}</td>
      <td>{props.company}</td>
      <td>{props.service}</td>
      <td>{props.description}</td>
      <td>{diff(props.startTime, props.endTime)}</td>
      <td><a href="#/">Keisti</a></td>
      <td><a href="#/" onClick={getIdHandler}>Šalinti</a></td>
    </tr>
  );
}

export default Work;
