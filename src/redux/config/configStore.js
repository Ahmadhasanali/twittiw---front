import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../modules/posts";
import commentsReducer from "../modules/comments";
import likesReducer from "../modules/likes";


const store =configureStore({
    reducer:{
        posts:postsReducer,
        comments:commentsReducer,
        likes:likesReducer,
    },
    devTools: process.env.NODE_ENV === 'development'
})

export default store;
