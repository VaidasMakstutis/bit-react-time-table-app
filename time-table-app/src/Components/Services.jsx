import services from "../Data/services";
import Service from "./Service";

function Services() {
    return (
        <>
            {services.map(i =><Service key={i.id} service={i.service} />)}
        </>

    )
}

export default Services;