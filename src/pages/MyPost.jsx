import Sidebar from "../Components/Sidebar";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import CardPostEdit from "../Components/CardPostEdit";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPostsByUserID } from "../redux/modules/posts";


const MyPost = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const session = JSON.parse(sessionStorage.getItem("data_user"))

    const { posts, isLoading } = useSelector(state => state.posts)

    useEffect(() => {
        dispatch(getPostsByUserID(session.id));
    }, [dispatch, session.id])

    const toHomePage = (e) => {
        e.preventDefault()
        navigate('/')
    }
    
    return (
        <Sidebar>
            <Container style={{ cursor: 'pointer' }} className='px-0'>
                <div className="px-3">
                    <header className="d-flex align-items-center px-3">
                        <FontAwesomeIcon icon={faArrowLeft} onClick={toHomePage} />
                        <h4 className="mx-4">My Post</h4>
                    </header>
                    <section>
                        {isLoading ? 
                        <div>Loading....</div> : 
                        posts.map(post => (
                            // <CardPost key={post.id} post={post} />
                            <CardPostEdit key={post.id} post={post} />
                        ))}
                    </section>
                </div>
            </Container>
        </Sidebar>
    );
}

export default MyPost;