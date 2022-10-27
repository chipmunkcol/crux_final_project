import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URLM = "https://sparta-tim.shop";
// const BASE_URLM = 'http://3.39.237.124'

const initialState = {
  crewDetail: [],
  crewApplication: [],
  crewPhotos: [],
  isLoading: false,
  isSuccess: false,
  error: null,
};

//크루 CRUD
/////////////////////////////////////////////////////////////////////

//크루 생성->확인
export const createCrew = createAsyncThunk(
  "post/createCrew",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URLM}/crews`, payload, {
        headers: {
          Authorization: JSON.parse(window.localStorage.getItem("userInfo")).access_token,
        },
      });
      window.location.replace("/crews");
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.data);
    }
  }
);

//크루 수정->확인
export const editCrew = createAsyncThunk(
  "put/editCrew",
  async (payload, thunkAPI) => {
    try {
      const response = await axios
        .put(
          `${BASE_URLM}/crews/${payload.id}`,
          {
            name: payload.name,
            content: payload.content,
            imgUrl: payload.imgUrl,
            mainActivityGym: payload.mainActivityGym,
            mainActivityArea: payload.mainActivityArea,
            keywords: payload.keywords,
          },
          {
            headers: {
              Authorization: JSON.parse(window.localStorage.getItem("userInfo")).access_token,
            },
          }
        )
        .then((response) => {
          // console.log(response);
        });
      window.location.replace(`/crews/${payload.id}`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.data);
    }
  }
);

//크루 삭제->확인
export const deleteCrew = createAsyncThunk(
  "delete/createCrew",
  async (payload, thunkAPI) => {
    try {
      const response = await axios
        .delete(`${BASE_URLM}/crews/${payload}`, {
          headers: {
            Authorization: JSON.parse(window.localStorage.getItem("userInfo")).access_token,
          },
        })
        .then((response) => {
          // console.log(response);
        });
      window.location.replace("/crews");
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.data);
    }
  }
);

//크루 상세정보->확인
export const getCrewDetail = createAsyncThunk(
  "getCrewDetail",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URLM}/crews/${payload}`, 
      // {
      //   headers: {
      //     Authorization: JSON.parse(window.localStorage.getItem("userInfo")).access_token,
      //   },
      // }
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//크루 가입신청 & 목록 조회 & 가입 승인 & 추방
/////////////////////////////////////////////////////////////////////

//크루 가입신청-->확인
export const joinCrew = createAsyncThunk(
  "post/joinCrew",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BASE_URLM}/crews/${payload}/members`,
        null,
        {
          headers: {
            Authorization: JSON.parse(window.localStorage.getItem("userInfo")).access_token,
          },
        }
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.data);
    }
  }
);

//크루 가입 신청 목록 확인-->확인
export const getApplicationList = createAsyncThunk(
  "get/getApplicationList",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`${BASE_URLM}/crews/${payload}/members`, {
        headers: {
          Authorization: JSON.parse(window.localStorage.getItem("userInfo")).access_token,
        },
      });
      // console.log(data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

//크루 가입 승인-->확인
export const permitCrew = createAsyncThunk(
  "post/permitCrew",
  async (payload, thunkAPI) => {
    try {
      const response = await axios
        .post(
          `${BASE_URLM}/crews/${payload.crewId}/members/${payload.memberId}?permit=true`,
          null,
          {
            headers: {
              Authorization: JSON.parse(window.localStorage.getItem("userInfo")).access_token,
            },
          }
        )
        .then((response) => {
          // console.log(response);
        });
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.data);
    }
  }
);

//크루 공지사항 CRUD
/////////////////////////////////////////////////////////////////////

//크루 공지사항 생성 --> 확인, 누구나 다 쓸 수 있는거라고 했는데 크루장만 쓰기 가능한듯?
export const createCrewNotice = createAsyncThunk(
  "post/createCrew",
  async (payload, thunkAPI) => {
    console.log(payload)
    try {
      const response = await axios.post(
        `${BASE_URLM}/notices/${payload.id}`,
        {
          content: payload.content,
          date: payload.date,
          place: payload.place,
        },
        {
          headers: {
            Authorization: JSON.parse(window.localStorage.getItem("userInfo")).access_token,
          },
        }
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.data);
    }
  }
);

//크루 공지사항 수정
export const editCrewNotice = createAsyncThunk(
  "put/editCrewNotice",
  async (payload, thunkAPI) => {
    console.log(payload)
    try {
      const response = await axios.put(
        `${BASE_URLM}/notices/${payload.id}`,
        {
          content: payload.content,
          date: payload.date,
          place: payload.place,
        },
        {
          headers: {
            Authorization: JSON.parse(window.localStorage.getItem("userInfo")).access_token,
          },
        }
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.data);
    }
  }
);

//크루 사진 CRUD
/////////////////////////////////////////////////////////////////////

//크루 사진 등록--> 확인
export const addCrewPhoto = createAsyncThunk(
  "add/CrewPhoto",
  async (payload, thunkAPI) => {
    // console.log(payload);
    try {
      const response = await axios.post(
        `${BASE_URLM}/crews/${payload.id}/posts`,
        {
          imgList: payload.imgUrl,
        },
        {
          headers: {
            Authorization: JSON.parse(window.localStorage.getItem("userInfo")).access_token,
          },
        }
      );
      // alert('등록 완료!')
      window.location.reload();
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.data);
    }
  }
);

//크루 사진 조회
export const getCrewPhoto = createAsyncThunk(
  "get/CrewPhoto",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASE_URLM}/crews/${payload}/posts?page=0&size=10`
      );
      // console.log(response.data);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

//크루 사진 삭제
export const deleteCrewPhoto = createAsyncThunk(
  "delete/CrewPhoto",
  async (payload, thunkAPI) => {
    // console.log(payload);
    try {
      const response = await axios.delete(
        `${BASE_URLM}/crews/posts/${payload}`,
        {
          headers: {
            Authorization: JSON.parse(window.localStorage.getItem("userInfo")).access_token,
          },
        }
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.data);
    }
  }
);

export const crewSlice = createSlice({
  name: "crews",
  initialState,
  reducers: {
    expelCrew(state, action) {
      const id = action.payload;
      state.crewDetail.data.memberList =
        state.crewDetail.data.memberList.filter((crew) => crew.id !== id);
    },
    addCrew(state, action) {
      // console.log(action.payload);
      state.crewDetail.data.memberList = [
        ...state.crewDetail.data.memberList,
        action.payload,
      ];
    },
    acceptCrew(state, action) {
      const id = action.payload;
      state.crewApplication.data = state.crewApplication.data.filter(
        (crew) => crew.id !== id
      );
    },
    deleteCrewNotice(state, action) {
      const id = action.payload;
      state.crewDetail.data.noticeList =
        state.crewDetail.data.noticeList.filter(
          (notice) => notice.noticeId !== id
        );
    },
    addCrewNotice(state, action) {
      // console.log(action.payload);
      state.crewDetail.data.noticeList = [
        ...state.crewDetail.data.noticeList,
        action.payload,
      ];
    },
    deleteCrewPhotos(state, action) {
      const id = action.payload;
      state.crewPhotos.data = state.crewPhotos.data.filter(
        (photo) => photo.postId !== id
      );
    },
    editNotice(state, action) {
      console.log(action.payload);
      // console.log(state.crewDetail.data.noticeList);
      // const existingNotice = state.crewDetail.data.noticeList.find(
      //   (notice) => notice.noticeId === action.payload.id
      // );
      // if (existingNotice) {
      //   existingNotice.place = action.payload.place;
      //   existingNotice.content = action.payload.content;
      //   existingNotice.date = action.payload.date;
      // }
      const a = state.crewDetail.data.noticeList.findIndex((v)=> v.noticeId === action.payload.id)
      state.crewDetail.data.noticeList[a].place = action.payload.place;
      state.crewDetail.data.noticeList[a].content = action.payload.content;
      state.crewDetail.data.noticeList[a].date = action.payload.date;

      window.alert("수정완료!");
    },
    _crewLike(state, action) {
      state.crewDetail.data.like = action.payload;
    },
    _joinCrew(state, action) {
      // console.log(action.payload)
      state.crewDetail.data.submit = action.payload;
    },
    _joinCancelCrew(state, action) {
      // console.log(action.payload)
      state.crewDetail.data.submit = action.payload;
    },
  },
  extraReducers: {
    [createCrew.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [createCrew.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.crewDetail = action.payload;
    },
    [createCrew.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getCrewDetail.pending]: (state) => {
      state.isLoading = true;
    },
    [getCrewDetail.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.crewDetail = action.payload;
    },
    [getCrewDetail.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [joinCrew.pending]: (state) => {
      state.isLoading = true;
    },
    [joinCrew.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [joinCrew.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteCrew.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteCrew.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.crewDetail = action.payload;
    },
    [deleteCrew.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [editCrew.pending]: (state) => {
      state.isLoading = true;
    },
    [editCrew.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.crewDetail = action.payload;
    },
    [editCrew.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getApplicationList.pending]: (state) => {
      state.isLoading = true;
    },
    [getApplicationList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.crewApplication = action.payload;
    },
    [getApplicationList.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getCrewPhoto.pending]: (state) => {
      state.isLoading = true;
    },
    [getCrewPhoto.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.crewPhotos = action.payload;
    },
    [getCrewPhoto.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  expelCrew,
  acceptCrew,
  deleteCrewNotice,
  addCrewNotice,
  _crewLike,
  editNotice,
  addCrewPhotos,
  addCrew,
  deleteCrewPhotos,
  _joinCrew,
  _joinCancelCrew,
} = crewSlice.actions;
export default { crewSlice }.reducer;