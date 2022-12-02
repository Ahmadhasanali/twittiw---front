import Sidebar from "../Components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getPostsByUserID } from "../redux/modules/posts";
import CardPost from "../Components/CardPost";
import { Form, Modal } from "react-bootstrap";
import ButtonAction from "../Components/ButtonAction";
import axios from "axios";

let url;
process.env.NODE_ENV == 'development' ? 
    url = process.env.REACT_APP_DEV_API_URL
    :
    url = process.env.REACT_APP_API_URL

const Profile = () => {
    const dispatch = useDispatch()
    const session = JSON.parse(sessionStorage.getItem("data_user"))
    const [show, setShow] = useState(false);
    const [name, setName] = useState(`${session.name}`);
    const [username, setUsername] = useState(`${session.username}`)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleNewName = event => {
        setName(event.target.value)
    }

    const handleNewUsername = event => {
        setUsername(event.target.value)
    }

    const handlePatchReq = event => {
        event.preventDefault();
        if (!name) {
            return
        }
        patchName();
        setShow(false)
    }

    const patchName = async () => {
        await axios.patch(url+'users/'+session.id, { name: name, username: username });
        const user = await axios.get(`${url}users?email=${session.email}`)
        sessionStorage.setItem('data_user', JSON.stringify(user.data[0]))
        dispatch(getPostsByUserID(session.id));
    }

    const { posts, isLoading } = useSelector(state => state.posts)

    useEffect(() => {
        dispatch(getPostsByUserID(session.id));
    }, [dispatch, session.id])

    return (
        <Sidebar>
            <section className="user-info">
                <section className="user-bio">
                    <h2>{session.name}</h2>
                    <p className="username">@{session.username}</p>
                    <p className="bio">Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, possimus.</p>
                </section>
                <button onClick={handleShow} className="btn-tw btn-edit-profile">Edit Profile</button>
            </section>
            {/* <section className="user-menu">
                <p>Tweets</p>
            </section> */}
            <section className="notif-menu">
                <div>Tweet</div>
                <div>Tweets & replies</div>
                <div>Media</div>
                <div>Likes</div>
            </section>
            <section className="user-tweets">
                {isLoading ?
                    <div>Loading....</div> :
                    posts.map(post => (
                        // <CardPost key={post.id} post={post} />
                        <CardPost key={post.id} post={post} />
                    ))}
            </section>

            <Modal show={show} onHide={handleClose} className="modal-edit-profile">
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={handleNewName}
                            />
                            <Form.Control
                                type="text"
                                className="mt-3"
                                placeholder="Username"
                                value={username}
                                onChange={handleNewUsername}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonAction variant={"secondary"} onClick={handleClose} text={"Close"} />
                    <ButtonAction variant={"primary"} onClick={handlePatchReq} text={"Save Changes"} />
                </Modal.Footer>
            </Modal>
        </Sidebar>
        // <Sidebar>
        //     <Container style={{ cursor: 'pointer' }} className='px-0'>
        //         <div className="px-3">
        //             <header className="d-flex align-items-center px-3">
        //                 <FontAwesomeIcon icon={faArrowLeft} onClick={toHomePage} />
        //                 <h4 className="mx-4">My Post</h4>
        //             </header>
        //             <section>
        //                 {postFilter.map(post => (
        //                     // <CardPost key={post.id} post={post} />
        //                     <CardPostEdit key={post.id} post={post} />
        //                 ))}
        //             </section>
        //         </div>
        //     </Container>
        // </Sidebar>
    );
}

export default Profile;