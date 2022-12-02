import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Nav, Navbar } from "react-bootstrap";
import MessageContent from "../Components/MessageContent";
import Sidebar from "../Components/Sidebar";


const Message = () => {
    return (
        <Sidebar>
            <Navbar variant="dark" style={{backgroundColor: '#121213'}}>
                <Container>
                    <Navbar.Brand>
                        Messages 
                    </Navbar.Brand>
                    <Nav className="justify-content-end" style={{ width: "100%" }}>
                        <FontAwesomeIcon icon={faGear} style={{ margin: "auto 5px" }}/>
                        <FontAwesomeIcon icon={faEnvelope} style={{ margin: "auto 5px" }}/>
                    </Nav>
                </Container>
            </Navbar>
            <div className="search-container" style={{ margin: "auto 10px" }}>
                <form>
                    <input type="text" name="search" id="search" placeholder="Search Direct Messages" style={{textAlign: 'center'}}/>
                </form>
            </div>
            <MessageContent name={"Mohammed Salah"} username={"mo_salah"} date={"Nov 10, 2022"} message={"Allahu Akbar"} />
            <MessageContent name={"Jhonny Sins"} username={"sins69"} date={"Oct 26, 2022"} message={"hello guys"} />
            <MessageContent name={"Hatsune Miku"} username={"mikuchan"} date={"Oct 7, 2022"} message={"Love you so much"} />
            <MessageContent name={"Bala Bala Nikmat"} username={"balabaa"} date={"Oct 3, 2022"} message={"Gorengannya kaka"} />
        </Sidebar>
    );
}

export default Message;