import { faBoxArchive, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Nav, Navbar } from "react-bootstrap";
import Sidebar from "../Components/Sidebar";

const Lists = () => {
    return (
        <Sidebar>
            <Navbar variant="dark" style={{backgroundColor: '#121213'}}>
                <Container>
                    <Navbar.Brand>
                        Lists
                    </Navbar.Brand>
                    <Nav className="justify-content-end" style={{ width: "100%" }}>
                        <FontAwesomeIcon icon={faBoxArchive} style={{ margin: "auto 5px" }}/>
                        <FontAwesomeIcon icon={faEllipsis} style={{ margin: "auto 5px" }}/>
                    </Nav>
                </Container>
            </Navbar>
            <h5 style={{fontWeight: '700', margin: 'auto 10px'}}>Pinned Lists</h5>
            <div style={{align: 'center', textAlign: 'center', color: '#89949d', padding: '50px'}}>
                <span>Nothing to see here yet — pin your favorite Lists to access them quickly.</span>
            </div>
            <h5 style={{fontWeight: '700', margin: 'auto 10px'}}>Discover new Lists</h5>
            <Navbar variant="dark" style={{backgroundColor: '#121213'}}>
                <Container>
                    <Navbar.Brand>
                        <b><span style={{fontSize: '14px'}}>Sports</span></b> <br/>
                        <b><span style={{fontSize: '14px'}}>Manchester United</span></b> <span style={{color: '#89949d',fontSize: '14px'}}>@manutd</span>
                    </Navbar.Brand>
                    <Nav className="justify-content-end" style={{ width: "100%" }}>
                        <button className="float-right" style={{borderRadius: '2rem', border: 'none', backgroundColor: 'white', color: 'black', padding: '0.5rem 1rem'}}>Follow</button>
                    </Nav>
                </Container>
            </Navbar>
            <Navbar variant="dark" style={{backgroundColor: '#121213'}}>
                <Container>
                    <Navbar.Brand>
                        <b><span style={{fontSize: '14px'}}>Music</span></b> <br/>
                        <b><span style={{fontSize: '14px'}}>Ed Sheeran</span></b> <span style={{color: '#89949d',fontSize: '14px'}}>@sheeran</span>
                    </Navbar.Brand>
                    <Nav className="justify-content-end" style={{ width: "100%" }}>
                        <button className="float-right" style={{borderRadius: '2rem', border: 'none', backgroundColor: 'white', color: 'black', padding: '0.5rem 1rem'}}>Follow</button>
                    </Nav>
                </Container>
            </Navbar>
            <Navbar variant="dark" style={{backgroundColor: '#121213'}}>
                <Container>
                    <Navbar.Brand>
                        <b><span style={{fontSize: '14px'}}>Tech</span></b> <br/>
                        <b><span style={{fontSize: '14px'}}>Elon Musk</span></b> <span style={{color: '#89949d',fontSize: '14px'}}>@musk</span>
                    </Navbar.Brand>
                    <Nav className="justify-content-end" style={{ width: "100%" }}>
                        <button className="float-right" style={{borderRadius: '2rem', border: 'none', backgroundColor: 'white', color: 'black', padding: '0.5rem 1rem'}}>Follow</button>
                    </Nav>
                </Container>
            </Navbar>
            <h5 style={{fontWeight: '700', margin: '10px'}}>Your Lists</h5>
            <div style={{align: 'center', textAlign: 'center', color: '#89949d', padding: '50px'}}>
                <span>You haven't created or followed any Lists. When you do, they'll show up here.</span>
            </div>
        </Sidebar>
    );
};

export default Lists;