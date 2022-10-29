import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const SERVERH = process.env.REACT_APP_SERVER_H;
// const SERVERM = process.env.REACT_APP_SERVER_M;

// const BASE_URL = SERVERM;
const BASE_URLM = "https://sparta-tim.shop";
// const BASE_URLM = 'http://3.39.237.124'

const initialState = {
  user: [],
  isLoading: false,
  isSuccess: false,
  error: [],
};

//회원가입
export const signup = createAsyncThunk(
  "/members/signup",
  async (payload, thunkAPI) => {
    // console.log(payload);
    try {
      const response = await axios.post(
        `${BASE_URLM}/members/signup`,
        {
          email: payload.email,
          nickname: payload.nickname,
          password: payload.password,
          content: payload.content,
          imgUrl:
            "https://firebasestorage.googleapis.com/v0/b/fir-ec6e2.appspot.com/o/images%2Fundefined?alt=media&token=ba20ef8c-11d5-44af-8838-8b6a1201f3ce",
        }
      );
      // window.alert("회원가입 성공");
      // window.location.replace("/");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.data);
    }
  }
);

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {},
  extraReducers: {
    [signup.pending]: (state, action) => {
      state.isLoading = true;
    },
    [signup.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    [signup.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

//로그인
export const login = createAsyncThunk(
  "members/login",
  async (payload, thunkAPI) => {
    try {
      const response = await axios
        .post(`${BASE_URLM}/members/login`, payload)
        .then((response) => {

          const userInfo = {
            access_token: response.headers.access_token,
            userId: response.data.data.id,
            nickname: response.data.data.nickname,
            profileImg: response.data.data.imgUrl,
            expire: Date.now() + 86400000
          }
          const userInfoString = JSON.stringify(userInfo)
          window.localStorage.setItem('userInfo', userInfoString)

          window.location.reload();
        });
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending]: (state) => {
      state.isLoading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

//카카오톡 로그인-->주소만 잠시 현우님걸로 해둠(변경예정),id저장 수정필요
export const kakaoLogin = createAsyncThunk(
  "members/kakaoLogin",
  async (payload, thunkAPI) => {
    try {
      const response = await axios
        .get(`${BASE_URLM}/oauth/kakao/callback?code=${payload}`)
        .then((response) => {
          // console.log(response);
          const userInfo = {
            access_token: response.headers.access_token,
            userId: response.data.id,
            nickname: response.data.nickname,
            profileImg: response.data.imgUrl,
            expire: Date.now() + 86400000
          }
          const userInfoString = JSON.stringify(userInfo)
          window.localStorage.setItem('userInfo', userInfoString)
        });
      window.location.replace("/");
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.data);
    }
  }
);

export const kakaoLoginSlice = createSlice({
  name: "kakaoLogin",
  initialState,
  reducers: {},
  extraReducers: {
    [kakaoLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [kakaoLogin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    },
    [kakaoLogin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

//크루 좋아요
export const likeCrew = createAsyncThunk(
  "post/like-crew",
  async (payload, thunkAPI) => {
    try {
      const response = await axios
        .post(`${BASE_URLM}/crews/${payload}/like`, null, {
          headers: {
            Authorization: JSON.parse(window.localStorage.getItem("userInfo")).access_token,
          },
        })
        .then((response) => {
          // console.log(response);
        });
      window.alert("좋아요 완료");
      // console.log(response.data);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.data);
    }
  }
);

//크루 좋아요취소
export const unLikeCrew = createAsyncThunk(
  "post/like-crew",
  async (payload, thunkAPI) => {
    try {
      const response = await axios
        .delete(`${BASE_URLM}/crews/${payload}/like`, {
          headers: {
            Authorization: JSON.parse(window.localStorage.getItem("userInfo")).access_token,
          },
        })
        .then((response) => {
          // console.log(response);
        });
      window.alert("좋아요 취소 완료");
      // console.log(response.data);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [likeCrew.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [likeCrew.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [likeCrew.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

//크루 탈퇴
export const withdrawCrew = createAsyncThunk(
  "delete/withdrawCrew",
  async (payload, thunkAPI) => {
    try {
      const response = await axios
        .delete(`${BASE_URLM}/crews/${payload.id}/members`, {
          headers: {
            Authorization: JSON.parse(window.localStorage.getItem("userInfo")).access_token,
          },
        })
        .then((response) => {
          // console.log(response);
        });
      window.alert("탈퇴 완료");
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.data);
    }
  }
);

export default { userSlice, signupSlice, loginSlice, kakaoLoginSlice }.reducer;