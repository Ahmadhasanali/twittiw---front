import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    //push
    comments: [],
    isLoading: false,
    error: null,
}

let url;
process.env.NODE_ENV == 'development' ? 
    url = process.env.REACT_APP_DEV_API_URL
    :
    url = process.env.REACT_APP_API_URL

export const getComments = createAsyncThunk(
    'getComments',
    async (payload, thunkApi) => {
        try {
            const { data } = await axios.get(url + 'comments?_sort=id&_order=DESC')
            const comments = data.filter(comment => comment.postId === payload)
            return thunkApi.fulfillWithValue(comments)
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
)

export const createComment = createAsyncThunk(
    'createComments',
    async (payload, thunkApi) => {
        try {
            await axios.post(url+'comments', payload)
            const { data } =  await axios.get(url + 'comments?_sort=id&_order=DESC')
            const comments = data.filter(comment => comment.postId === payload.postId)
            return thunkApi.fulfillWithValue(comments)
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)

export const deleteComment = createAsyncThunk(
    'deleteComments',
    async (payload, thunkApi) => {
        try {
            await axios.delete(url+'comments/'+payload.commentId)
            const { data } =  await axios.get(url + 'comments?_sort=id&_order=DESC')
            const comments = data.filter(comment => comment.postId === payload.postId)
            return thunkApi.fulfillWithValue(comments)
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)

const comments = createSlice({
    name: 'comments',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getComments.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getComments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.comments = action.payload;
                state.error = null;
            })
            .addCase(getComments.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(createComment.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.comments = action.payload;
                state.error = null;
            })
            .addCase(createComment.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(deleteComment.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.comments = action.payload;
                state.error = null;
            })
            .addCase(deleteComment.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    },
});


export default comments.reducer;