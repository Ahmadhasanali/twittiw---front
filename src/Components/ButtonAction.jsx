import { Button } from "react-bootstrap";

const ButtonAction = ({variant,text,onClick,className,disabled,children}) => {
    return (
        <Button variant={variant} className={className} onClick={onClick} disabled={disabled} type="submit">{children}{text}</Button>
    )   
}

export default ButtonAction;