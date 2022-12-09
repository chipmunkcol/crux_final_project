import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from 'axios';
import { GetAxios } from "../../Shared/api/main";


export const __getAlam = createAsyncThunk(
    'getAlam',
    async (payload, thunkAPI) => {
        try {
            const data = await GetAxios(`notifications`)
            return thunkAPI.fulfillWithValue(data.data)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)



export const alamSlice = createSlice({
    name: 'getAlam',
    initialState:{
        alams: {
            data: [{id: 0, content: {crewId: 0, content:"test"}, status: false}],
            error: null,
            success: true,
        },
        isLoading: false,
        error: null,
    },
    reducers: {
        _addAlam(state, action) {
            // console.log(action.payload)
            state.alams.data.unshift(action.payload)
        },
        _readAlam(state, action) {
            // console.log(current(state.alams.data))
            const a = state.alams.data.findIndex((v) => v.id === action.payload)
            state.alams.data[a].status = true;
        },
        _deleteAlam(state, action) {
            const a = state.alams.data.findIndex((v) => v.id === action.payload)
            state.alams.data.splice(a,1)
        },
        _deleteAlams(state, action) {
            state.alams.data.splice(0,state.alams.data.length)
        }
    },
    extraReducers: {
        [__getAlam.pending]: (state) => {
            state.isLoading = true;
        },
        [__getAlam.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.alams = action.payload;
        },
        [__getAlam.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})

export const { _addAlam, _readAlam, _deleteAlam, _deleteAlams } = alamSlice.actions





export const __NreadAlam = createAsyncThunk(
    'NreadAlam',
    async (payload, thunkAPI) => {
        try {
            const data = await GetAxios(`notifications/count`)
            return thunkAPI.fulfillWithValue(data.data)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const NreadAlamSlice = createSlice({
    name: 'NreadAlam',
    initialState:{
        NreadAlams: {
            data: {count: 0},
            error: null,
            success: true,
        },
        isLoading2: false,
        error2: null,
    },
    reducers: {
        _minusAlam(state, action) {
            state.NreadAlams.data.count -= action.payload
        },
        _plusAlam(state, action) {
            state.NreadAlams.data.count += action.payload
        }
    },
    extraReducers: {
        [__NreadAlam.pending]: (state) => {
            state.isLoading2 = true;
        },
        [__NreadAlam.fulfilled]: (state, action) => {
            state.isLoading2 = false;
            state.NreadAlams = action.payload;
        },
        [__NreadAlam.rejected]: (state, action) => {
            state.isLoading2 = false;
            state.error2 = action.payload;
        }
    }
})

export const { _minusAlam, _plusAlam } = NreadAlamSlice.actions
// export const __deleteAlam = createAsyncThunk(
//     'deleteAlam',
//     async (notificationId, thunkAPI) => {
//         try {
//             console.log(notificationId)
//             const data = await axios.delete(`${BASE_URL}/notifications/${notificationId}`,
//             { headers: {Authorization: window.localStorage.getItem("access_token")}})
//             console.log(data.data)
//             // return thunkAPI.fulfillWithValue(data.data)
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error)
//         }
//     }
// )

// export const __deleteAlams = createAsyncThunk(
//     'deleteAlams',
//     async (payload, thunkAPI) => {
//         try {
//             const data = await axios.delete(`${BASE_URL}/notifications`,
//             { headers: {Authorization: window.localStorage.getItem("access_token")}})
//             return thunkAPI.fulfillWithValue(data.data)
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error)
//         }
//     }
// )



