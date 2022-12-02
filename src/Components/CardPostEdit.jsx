import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deletePost } from "../redux/modules/posts";
import ButtonAction from "./ButtonAction";


const CardPostEdit = (post) => {
    const dispatch = useDispatch()
    const session = JSON.parse(sessionStorage.getItem('data_user'))

    const removePost = (postId) => {
        dispatch(deletePost({postId: +postId, userId: +session.id}))
    }

    return (
        <Card className='my-2'>
            <Card.Body key={post.post.id}>
                <Card.Text>
                    {post.post.post}
                </Card.Text>
                <ButtonAction variant={"danger"} className={'ms-2'} onClick={() => removePost(post.post.id)} text={'Delete'}>
                    <FontAwesomeIcon icon={faTrash} className='me-2' />
                </ButtonAction>
            </Card.Body>
        </Card>
    );
}

export default CardPostEdit;