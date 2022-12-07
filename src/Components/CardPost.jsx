import {
  faComment,
  faHeart,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import {
  faRetweet,
  faHeart as fasHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { Card } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePost } from "../redux/modules/posts";
import { cancelLikes, createLikes, getLikes } from "../redux/modules/likes";
import Avatar from "react-avatar";

const CardPost = ({ post }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toDetailPost = (postId) => {
    navigate(`/post/${postId}`);
  };

  const removePost = (postId) => {
    dispatch(deletePost({ postId: postId, userId: post.userId }));
  };

  const dataUser = JSON.parse(sessionStorage.getItem("data_user"));
  useEffect(() => {
    if (dataUser) {
      dispatch(getLikes({ userId: dataUser.userId, postId: post.postId }));
    }
  }, [dispatch]);

  const { likes } = useSelector((state) => state.likes);
  // const { countLikes } = useSelector(state => state.likes)
  // console.log(likes)

  let giveLike;
  let undoLike;
  if (dataUser) {
    giveLike = (postId) => {
      // console.log(postId)
      dispatch(createLikes({ postId: postId, userId: +dataUser.userId }));
    };
    undoLike = (id) => {
      // console.log(id)
      dispatch(cancelLikes({ id: +id }));
    };
  }
  console.log(likes);

  return (
    <section className="card-tweet" style={{ cursor: "pointer" }}>
      <Avatar
        color={Avatar.getRandomColor(["red", "green", "blue"])}
        name="Alii"
        round
        size="40px"
        style={{ marginRight: "10px" }}
      />
      {post.user.fullName}
      <span className="username"> @{post.user.nickName}</span>
      <p style={{ marginLeft: "50px" }} onClick={() => toDetailPost(post.id)}>
        {post.content}
      </p>
      <div className="like-rt-reply">
        <FontAwesomeIcon className="icon" icon={faComment} />
        <FontAwesomeIcon className="icon" icon={faRetweet} />
        {dataUser ? (
          likes.status === true && likes.postId === post.postId ? (
            <div style={{ margin: 0, display: "flex", alignItem: "center" }}>
              <FontAwesomeIcon
                className="icon"
                icon={fasHeart}
                  onClick={() => giveLike(likes.postId)}
                style={{ color: "pink" }}
              />
              <p style={{ marginLeft: "5px", marginTop: "-3px" }}>
                {post.likes}
              </p>
            </div>
          ) : (
            // console.log("sudah LIKE", likes)
            <div style={{ margin: 0, display: "flex", alignItem: "center" }}>
              <FontAwesomeIcon
                className="icon"
                icon={faHeart}
                  onClick={() => giveLike(likes.postId)}
              />
              <p style={{ marginLeft: "5px", marginTop: "-3px" }}>
                {post.likes}
              </p>
            </div>
          )
        ) : (
          // console.log(post.id,"belum di like")
          <FontAwesomeIcon className="icon" icon={faHeart} />
        )}
        {/* {
                    dataUser ? 
                        (likes.filter(like => like.postId === +post.id)).length > 0 ?
                            likes.filter(like => like.postId === +post.id)
                                .map(like => 
                                    like.postId === +post.id ?
                                        <FontAwesomeIcon key={like.id} className="icon" icon={faHeart} onClick={() => undoLike(like.id)} style={{color: 'pink'}} />
                                    : ''
                                )
                            // console.log("sudah LIKE", likes)
                            :
                            <FontAwesomeIcon className="icon" icon={faHeart} onClick={() => giveLike(+post.id)}/>
                            // console.log(post.id,"belum di like")
                        :
                        <FontAwesomeIcon className="icon" icon={faHeart} />
                } */}
        {dataUser && post.userId === dataUser.id ? (
          <FontAwesomeIcon
            className="icon"
            onClick={() => removePost(post.id)}
            icon={faTrashCan}
          />
        ) : (
          ""
        )}
      </div>

      {/* <Card style={{ cursor: 'pointer' }} border="light" className='my-2' bg='dark' key='dark' text='white' onClick={() => toDetailPost(post.post.id)}>
                <CardHeader>{post.post.name}</CardHeader>
                <Card.Body className='border-light border-top'>
                    {post.post.post}
                </Card.Body>
            </Card> */}
    </section>
  );
};

export default CardPost;
