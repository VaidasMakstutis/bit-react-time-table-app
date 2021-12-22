const workValidation = (values) => {
    const errors = {}
    if(!values.date) {
        errors.date = "Privaloma pasirinkti data"
    }
    if(!values.company) {
        errors.company = "Privaloma pasirinkti kompanija"
    }
    if(!values.service) {
        errors.service = "Privaloma pasirinkti kompanija"
    }
    if(!values.description) {
        errors.description = "Privaloma ivesti suteiktos paslaugos aprasyma"
    }
    if(!values.startTime) {
        errors.startTime = "Privaloma nurodyti laika nuo"
    }
    if(!values.endTime) {
        errors.endTime = "Privaloma nurodyti laika iki"
    }

    return errors;
}

export default workValidation;