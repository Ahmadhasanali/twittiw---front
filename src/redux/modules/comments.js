import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const token = JSON.parse(sessionStorage.getItem("token_user"))

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
            const { data } = await axios.get(url + `post/${payload}/comment`)
            return thunkApi.fulfillWithValue(data['data'])
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
)

export const createComment = createAsyncThunk(
    'createComments',
    async (payload, thunkApi) => {
        try {
            await axios.post(url+`post/${payload.postId}/comment`, {comment :payload.comment}, {headers:{authorization: `Bearer ${token}`}})
            const { data } = await axios.get(url + `post/${payload.postId}/comment`)
            return thunkApi.fulfillWithValue(data['data'])
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)

export const deleteComment = createAsyncThunk(
    'deleteComments',
    async (payload, thunkApi) => {
        try {
            await axios.post(url+'comment/'+payload.commentId, null, {headers:{authorization: `Bearer ${token}`}})
            const { data } = await axios.get(url + `post/${payload.postId}/comment`)
            return thunkApi.fulfillWithValue(data['data'])
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