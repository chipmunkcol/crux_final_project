import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = `https://01192mg.shop`;
const accessToken = localStorage.getItem("access_token");

const initialState = {
  chat: [],
  isLoading: false,
  error: null,
};

//이전 채팅내용 가져오기
export const loadMessage = createAsyncThunk(
  "get/chat",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/chat/messages/${payload}`, {
        headers: {
          Authorization: JSON.parse(window.localStorage.getItem("userInfo")).access_token,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//채팅방 전체 불러오기
export const getChatRoom = createAsyncThunk(
  "get/chatroom",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/chat/rooms`, {
        headers: {
          Authorization: JSON.parse(window.localStorage.getItem("userInfo")).access_token,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const ChatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, { payload }) => {
      // console.log(payload);
      state.chat.data = [...state.chat.data, payload];
    },
  },
  extraReducers: {
    [loadMessage.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.chat = payload;
    },
    [getChatRoom.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.chatRoom = payload;
    },
  },
});

export const { addMessage } = ChatSlice.actions;
export default ChatSlice.reducer;
