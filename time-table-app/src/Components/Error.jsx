import { Alert } from "react-bootstrap";

const Error = (props) => {
    return (
        <Alert variant="danger">
            <li>
                {props.error}
            </li>
        </Alert>
    )
}

export default Error;