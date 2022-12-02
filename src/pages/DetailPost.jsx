import Sidebar from "../Components/Sidebar";
import { Container, Form, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faRetweet } from "@fortawesome/free-solid-svg-icons";
import { faComment, faHeart, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComments, createComment, deleteComment } from "../redux/modules/comments";
import useInput from "../hooks/useInput";
import ButtonAction from "../Components/ButtonAction";
import { getPostsByID } from "../redux/modules/posts";
import Avatar from "react-avatar";
const DetailPost = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { comments, isLoading } = useSelector(state => state.comments)
    const { id } = useParams();
    const { post } = useSelector(state => state.posts)
    const [comment, handleCommentChange, setComment] = useInput();

    const session = JSON.parse(sessionStorage.getItem('data_user'))

    const handleSubmit = event => {
        event.preventDefault();
        if (!comment) {
            return;
        }
        makeComment();
    }

    const makeComment = () => {
        dispatch(createComment({ body: comment, postId: +id, userId: session.id, userName: session.name, username: session.username }))
        setComment('')
    }

    const removeComment = (commentId) => {
        dispatch(deleteComment({ commentId: commentId, postId: +id }))
    }

    useEffect(() => {
        dispatch(getComments(+id))
        dispatch(getPostsByID(+id))
    }, [dispatch, id])

    const toHomePage = (e) => {
        e.preventDefault()
        navigate('/')
    }

    return (
        <Sidebar>
            <Container className='px-0'>
                <header className="d-flex align-items-center px-3">
                    <FontAwesomeIcon icon={faArrowLeft} onClick={toHomePage} />
                    <h4 className="mx-4">Post</h4>
                </header>
                {
                    isLoading ?
                        <div>Loading....</div>
                        :
                        <div>
                            <section className="my-4 pb-3 px-3">
                                <p className="detail-post pb-3 px-3">
                                    <Avatar color={Avatar.getRandomColor(['red', 'green', 'blue'])} name="Name" round size='40px' />
                                    <span> {post.name}<span className="username">@{post.username}</span></span>
                                    <p>{post ? post.post : ''}</p>
                                </p>
                                <div className="like-rt-reply detail-post-cta">
                                    <FontAwesomeIcon className="icon" icon={faComment} />
                                    <FontAwesomeIcon className="icon" icon={faRetweet} />
                                    <FontAwesomeIcon className="icon" icon={faHeart} />
                                </div>
                                <form className="reply-tweet">
                                    <input
                                        type="text"
                                        name="tweet"
                                        id="tweet"
                                        placeholder="Tweet Your Reply"
                                        className='new-tweet'
                                        maxLength={60}
                                        value={comment}
                                        onChange={handleCommentChange}
                                        disabled={!session}
                                    />
                                    <button className='btn-tw edit-tweet' onClick={handleSubmit}>Reply</button>
                                </form>
                                <p className='ps-4'> {comment.length} / 60</p>
                            </section>
                            <section className="px-3">
                                {comments.map(comment => (
                                    <section className="card-tweet" style={{ cursor: 'pointer' }} key={comment.id}>
                                        <Avatar color={Avatar.getRandomColor(['red', 'green', 'blue'])} name="Name" round size='40px' />
                                        <span> {comment.userName}<span className="username"> @{comment.username}</span></span>
                                        <p>{comment.body}</p>
                                        <div className="like-rt-reply">
                                            <FontAwesomeIcon className="icon" icon={faComment} />
                                            <FontAwesomeIcon className="icon" icon={faRetweet} />
                                            <FontAwesomeIcon className="icon" icon={faHeart} />
                                            {
                                                session ?
                                                    comment.userId === session.id ?
                                                        <FontAwesomeIcon className="icon" icon={faTrashCan} onClick={() => removeComment(comment.id)} text={'Delete'} /> : ''
                                                    : ''
                                            }
                                        </div>
                                    </section>
                                ))}
                            </section>
                        </div>
                }
            </Container>
        </Sidebar>
    );
}

export default DetailPost;