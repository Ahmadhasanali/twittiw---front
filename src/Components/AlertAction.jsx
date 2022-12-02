import { Alert } from "react-bootstrap";

const AlertAction = ({variant,message,onClose}) => {
    // tesss
    return (
        <Alert variant={variant} onClose={onClose} dismissible>{message}</Alert>
    )   
}

export default AlertAction;