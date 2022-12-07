import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    posts: [],
    isLoading: false,
    error: null,
    post: {},
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
            const { data } = await axios.get(url + `posts`)
            return thunkApi.fulfillWithValue(data['data'])
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
)

export const getPostsByID = createAsyncThunk(
    'getPostByID',
    async (payload, thunkApi) => {
        try {
            const { data } = await axios.get(url + 'posts?_sort=id&_order=DESC')
            const filter = data.find(item => item.id === payload)
            return thunkApi.fulfillWithValue(filter)
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
            await axios.post(url+'posts/', payload)
            const { data } = await axios.get(url + 'posts?_sort=id&_order=DESC')
            return thunkApi.fulfillWithValue(data)
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)

export const deletePost = createAsyncThunk(
    'deletePost',
    async (payload, thunkApi) => {
        try {
            await axios.delete(url+'posts/'+ payload.postId)
            const { data } = await axios.get(url + 'posts?_sort=id&_order=DESC')
            const filter = data.filter(item => item.userId === +payload.userId)
            return thunkApi.fulfillWithValue(filter)
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
                state.isLoading = true;
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.posts = action.payload;
                // state.posts.concat(action.payload);
                state.error = null;
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(getPostsByID.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getPostsByID.fulfilled, (state, action) => {
                state.isLoading = false;
                state.post = action.payload;
                state.error = null;
            })
            .addCase(getPostsByID.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(getPostsByUserID.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getPostsByUserID.fulfilled, (state, action) => {
                state.isLoading = false;
                state.posts = action.payload;
                state.error = null;
            })
            .addCase(getPostsByUserID.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(createPost.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.posts = action.payload;
                state.error = null;
            })
            .addCase(createPost.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(deletePost.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.posts = action.payload;
                state.error = null;
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    },
});

export const { getPostById } = posts.actions;
export default posts.reducer;