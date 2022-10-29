import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const BASE_URL = 'https://sparta-tim.shop'
// const BASE_URL = 'https://01192mg.shop'

export const __getGymDetail = createAsyncThunk(
    'getGymDetail',
    async (payload, thunkAPI) => {
        try {
            // console.log(payload)
            const data = await axios.get(`${BASE_URL}/gyms/${payload}`,
            // { headers: {Authorization: JSON.parse(window.localStorage.getItem("userInfo")).access_token }}
            )
            return thunkAPI.fulfillWithValue(data.data)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const gymDetailSlice = createSlice({
    name: 'gymDetail',
    initialState:{
        gymDetail: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        _likeGym(state, action) {
            // console.log(action.payload)
            state.gymDetail.data.likeGym = action.payload
        }
    },
    extraReducers: {
        [__getGymDetail.pending]: (state) => {
            state.isLoading = true;
        },
        [__getGymDetail.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.gymDetail = action.payload;
        },
        [__getGymDetail.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})

export const { _likeGym } = gymDetailSlice.actions