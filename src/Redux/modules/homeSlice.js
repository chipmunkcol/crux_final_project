import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const BASE_URL = "https://sparta-tim.shop"

export const __getCrew = createAsyncThunk(
    'getCrew',
    async (payload, thunkAPI) => {
        // console.log(payload)
        try {
            const data = await axios.get(`${BASE_URL}/crews/popular?page=0&size=4`)
            return thunkAPI.fulfillWithValue(data.data)
        } catch(err) {
            return thunkAPI.rejectWithValue(err)
        }
    }
)

export const __getGym = createAsyncThunk(
    'getGym',
    async (payload, thunkAPI) => {
        // console.log(payload)
        try {
            const data = await axios.get(`${BASE_URL}/gyms/popular?size=10`)
            return thunkAPI.fulfillWithValue(data.data)
        } catch(err) {
            return thunkAPI.rejectWithValue(err)
        }
    }
)

export const getCrewSlice = createSlice({
    name: 'getCrew',
    initialState: {
        getCrew: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: {
        [__getCrew.pending]: (state) => {
            state.isLoading = true;
        },
        [__getCrew.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.getCrew = action.payload;
        },
        [__getCrew.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})


export const getGymSlice = createSlice({
    name: 'getGym',
    initialState: {
        getGym: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: {
        [__getGym.pending]: (state) => {
            state.isLoading = true;
        },
        [__getGym.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.getGym = action.payload;
        },
        [__getGym.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})