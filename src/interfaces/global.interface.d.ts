interface SuccessResponse {
    status: string;
    message: string;
}

interface DefaultFormValues {
    [key: string]: any;
}

interface DefaultEditFormValues {
    id: string;
    data: DefaultFormValues;
}
