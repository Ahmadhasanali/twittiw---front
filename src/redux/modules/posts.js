import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const token = JSON.parse(sessionStorage.getItem("token_user"))

const initialState = {
    posts: [],
    isLoadingPost: false,
    error: null,
    post: {},
    postInfoUser: {}
}

let url;
process.env.NODE_ENV == 'development' ? 
    url = process.env.REACT_APP_DEV_API_URL
    :
    url = process.env.REACT_APP_API_URL

export const getPosts = createAsyncThunk(
    'getPosts',
    async (payload, thunkApi) => {
        try {
            if (payload.urlNow === '/') {
                const { data } = await axios.get(url + `posts`)
                return thunkApi.fulfillWithValue(data['data'])
            }
            if (payload.urlNow === '/profile') {
                const { data } = await axios.get(url + `posts/me`, {headers:{authorization: `Bearer ${token}`}})
                return thunkApi.fulfillWithValue(data['data'])
            }
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
)

export const getPostsByID = createAsyncThunk(
    'getPostByID',
    async (payload, thunkApi) => {
        try {
            const { data } = await axios.get(url + `post/${payload}`)
            // console.log(data['data'], 'from thunk');
            return thunkApi.fulfillWithValue(data['data'])
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)

export const getPostsByUserID = createAsyncThunk(
    'getPostsByUserID',
    async (payload, thunkApi) => {
        try {
            const { data } = await axios.get(url + 'posts?_sort=id&_order=DESC')
            const filter = data.filter(item => item.userId === +payload)
            return thunkApi.fulfillWithValue(filter)
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)

export const createPost = createAsyncThunk(
    'createPost',
    async (payload, thunkApi) => {
        try {
            await axios.post(url+'post/', {content: payload.post }, {headers:{authorization: `Bearer ${token}`}})
            const { data } = await axios.get(url + 'posts')
            return thunkApi.fulfillWithValue(data['data'])
        } catch (error) {
            console.log(error.message);
            return thunkApi.rejectWithValue(error)
        }
    }
)

export const deletePost = createAsyncThunk(
    'deletePost',
    async (payload, thunkApi) => {
        try {
            await axios.post(url+'post/'+ payload.postId, null , {headers:{authorization: `Bearer ${token}`}})
            const { data } = await axios.get(url + 'posts')
            if (payload.urlNow === '/') {
                return thunkApi.fulfillWithValue(data['data'])
            }
            if (payload.urlNow === '/profile') {
                const filter = data['data'].filter(item=> item.userId === payload.userId)
                return thunkApi.fulfillWithValue(filter)
            }
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)

const posts = createSlice({
    name: 'posts',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPosts.pending, (state, action) => {
                state.isLoadingPost = true;
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.isLoadingPost = false;
                state.posts = action.payload;
                // state.posts.concat(action.payload);
                state.error = null;
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.isLoadingPost = false;
                state.error = action.payload;
            })
            .addCase(getPostsByID.pending, (state, action) => {
                state.isLoadingPost = true;
            })
            .addCase(getPostsByID.fulfilled, (state, action) => {
                state.isLoadingPost = false;
                state.post = action.payload;
                state.postInfoUser = action.payload.user;
                state.error = null;
            })
            .addCase(getPostsByID.rejected, (state, action) => {
                state.isLoadingPost = false;
                state.error = action.payload;
            })
            .addCase(getPostsByUserID.pending, (state, action) => {
                state.isLoadingPost = true;
            })
            .addCase(getPostsByUserID.fulfilled, (state, action) => {
                state.isLoadingPost = false;
                state.posts = action.payload;
                state.error = null;
            })
            .addCase(getPostsByUserID.rejected, (state, action) => {
                state.isLoadingPost = false;
                state.error = action.payload;
            })
            .addCase(createPost.pending, (state, action) => {
                state.isLoadingPost = true;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.isLoadingPost = false;
                state.posts = action.payload;
                state.error = null;
            })
            .addCase(createPost.rejected, (state, action) => {
                state.isLoadingPost = false;
                state.error = action.payload;
            })
            .addCase(deletePost.pending, (state, action) => {
                state.isLoadingPost = true;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.isLoadingPost = false;
                state.posts = action.payload;
                state.error = null;
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.isLoadingPost = false;
                state.error = action.payload;
            })
    },
});

export const { getPostById } = posts.actions;
export default posts.reducer;