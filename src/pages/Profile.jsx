import Sidebar from "../Components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getPosts, getPostsByUserID } from "../redux/modules/posts";
import CardPost from "../Components/CardPost";
import { Form, Modal } from "react-bootstrap";
import ButtonAction from "../Components/ButtonAction";
import axios from "axios";
import { useLocation } from "react-router-dom";

let url;
process.env.NODE_ENV == 'development' ?
    url = process.env.REACT_APP_DEV_API_URL
    :
    url = process.env.REACT_APP_API_URL

const Profile = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const session = JSON.parse(sessionStorage.getItem("data_user"))
    const token = JSON.parse(sessionStorage.getItem('token_user'))
    const [show, setShow] = useState(false);
    const [name, setName] = useState(`${session.fullName}`);
    const [bio, setBio] = useState(`${session.bio}`);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleNewName = event => {
        setName(event.target.value)
    }
    const handleNewBio = event => {
        setBio(event.target.value)
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
        await axios.post(url + 'user/edit', { fullName: name }, { headers: { authorization: `Bearer ${token}` } });
        const user = await axios.get(url+'user/me', {headers:{authorization: `Bearer ${token}`}})
        console.log(user.data.data);
        sessionStorage.setItem('data_user', JSON.stringify(user.data.data))
        dispatch(getPosts({ urlNow: location.pathname, userId: session.userId }));
    }

    const { posts, isLoading } = useSelector(state => state.posts)
    // console.log(posts);

    useEffect(() => {
        dispatch(getPosts({ urlNow: location.pathname, userId: session.userId }));
    }, [dispatch, session.id])

    return (
        <Sidebar>
            <section className="user-info">
                <section className="user-bio">
                    <h2>{session.fullName}</h2>
                    <p className="username">@{session.nickName}</p>
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
                        <CardPost key={post.postId} post={post} />
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
                            /><Form.Control
                                type="text"
                                placeholder="Bio"
                                value={bio}
                                onChange={handleNewBio}
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