import companies from "../Data/companies";
import Company from "./Company";

function Companies() {
    return (
        <>
            {companies.map(i =><Company key={i.code} title={i.title} />)}
        </>

    )
}

export default Companies;