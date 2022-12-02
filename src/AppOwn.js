
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { __getPosts } from './redux/modules/posts';
import { __getComments } from './redux/modules/comments';

const postUrl = 'http://localhost:3001/posts/';
const commentUrl = 'http://localhost:3001/comments/';
function App() {
  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.posts);
  const { comments } = useSelector(state => state.comments);

  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [selectedId, setSelectedId] = useState(0);


  const handlePost = event => {
    event.preventDefault();
    if (!title) {
      return;
    }
    createPost();
  }
  const handleComment = event => {
    event.preventDefault();
    if (!title) {
      return;
    }
    createComment();
  }

  const handleChangePost = event => {
    setTitle(event.target.value);
  }
  const handleChangeComment = event => {
    setComment(event.target.value);
  }

  const createComment = async() => {
    await axios.post(commentUrl, {body: comment, id:selectedId})
    dispatch(__getComments());
  }

  const createPost = async() => {
    await axios.post(postUrl, {title});
    dispatch(__getPosts());
    setTitle('');
  }

  const deleteItem =  async (todoId) =>{
    await axios.delete(postUrl + todoId)
    dispatch(__getPosts());
  }

  useEffect(() => {
    dispatch(__getPosts());
    dispatch(__getComments());
  }, [dispatch])

  return (
    <div>
      <h1>Test</h1>
      <form onSubmit={handlePost}>
      <input 
        value={title} 
        onChange={handleChangePost} 
        required />
      <button type='submit'>Create new item</button>
      </form>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <ul>
            {comments.map(comment => (
              <li key={comment.id}>{comment.body}</li>
            ))}
            </ul>
            <span onClick={()=> setSelectedId(post.id)}>{post.title}</span>
            <button onClick={() => deleteItem(post.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleComment}>
          <input 
          value={comment}
          onChange={handleChangeComment}
          required
          />
          <button type='submit' disabled={!selectedId || !comment}>Patch this item</button>
      </form>
    </div>
  );
}

export default App;
