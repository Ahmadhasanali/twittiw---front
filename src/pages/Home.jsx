import React, { useEffect } from 'react';
import { useState } from 'react';
import { Container, Form, InputGroup, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import CardPost from '../Components/CardPost';
import Sidebar from '../Components/Sidebar';
import useInput from '../hooks/useInput';
import { createPost, getPosts } from '../redux/modules/posts';
import ButtonAction from '../Components/ButtonAction';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { posts, isLoading } = useSelector(state => state.posts)
    const [post, handlePostChange, setPost] = useInput();
    const [search, setSearch] = useState('')

    const handleSubmit = event => {
        event.preventDefault();
        if (!post) {
            return;
        }
        makePost();
    }

    const session = JSON.parse(sessionStorage.getItem("data_user"))

    const makePost = async () => {
        dispatch(createPost({ post, userId: session.id, name: session.name, username: session.username }))
        setPost('')
    }

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch])

    return (
        <React.Fragment>
            <Sidebar setSearch={setSearch}>
                <header>
                    <h3 className='ps-4'>Home</h3>
                    <input
                        type="text"
                        name="tweet"
                        id="tweet"
                        placeholder="What's happening?"
                        className='new-tweet'
                        maxLength={60}
                        value={post}
                        onChange={handlePostChange}
                        disabled={!session}
                    />
                    <p className='ps-4'> {post.length} / 60</p>
                    <div><button className='btn-tw add-tweet' onClick={handleSubmit}>Tweet</button></div>
                </header>
                {!isLoading ? posts.filter(item => {
                    return item.post.toLowerCase() === '' ? item.post : item.post.toLowerCase().includes(search.toLowerCase())
                }).map(post => (
                    <CardPost key={post.id} post={post} />
                )) : <div>Loading....</div>}
            </Sidebar>    
            {
                session ?
                    <div></div>
                    :
                    <Navbar className='color-tw' variant="dark" fixed="bottom">
                        <Container>
                            <Navbar.Brand>
                                <span style={{fontWeight: '700', fontSize: '24px'}}>Don’t miss what’s happening</span><br/>
                                <span style={{fontSize: '16px'}}>People on Twitter are the first to know.</span> 
                            </Navbar.Brand>
                            <Nav className="justify-content-end" style={{ width: "100%" }}>
                                <button className="btn-login float-right" onClick={() => {
                                    navigate('/login')
                                }}>Log in</button>
                                <button className="btn-signup float-right" onClick={() => {
                                    navigate('/register')
                                }}>Sign up</button>
                            </Nav>
                        </Container>
                    </Navbar>
            }
        </React.Fragment>
        
    )
}

export default Home;