import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const SERVERH = process.env.REACT_APP_SERVER_H;
// const SERVERM = process.env.REACT_APP_SERVER_M;
// const BASE_URLM = "https://01192mg.shop";
// const BASE_URLM = "http://sparta-tim.shop";
const BASE_URLM = "http://54.180.31.108";


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
          Authorization: window.localStorage.getItem("access_token"),
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
          `https://sparta-tim.shop/crews/${payload.id}`,
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
              Authorization: window.localStorage.getItem("access_token"),
            },
          }
        )
        .then((response) => {
          console.log(response);
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
            Authorization: window.localStorage.getItem("access_token"),
          },
        })
        .then((response) => {
          console.log(response);
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
      const response = await axios.get(
        `http://54.180.31.108/crews/${payload}`,
        {
          headers: {
            Authorization: window.localStorage.getItem("access_token"),
          },
        }
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
        `http://sparta-tim.shop/crews/${payload}/members`,
        null,
        {
          headers: {
            Authorization: window.localStorage.getItem("access_token"),
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
      const data = await axios.get(
        `http://sparta-tim.shop/crews/${payload}/members`,
        {
          headers: {
            Authorization: window.localStorage.getItem("access_token"),
          },
        }
      );
      console.log(data.data);
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
          `http://sparta-tim.shop/crews/${payload.crewId}/members/${payload.memberId}?permit=true`,
          null,
          {
            headers: {
              Authorization: window.localStorage.getItem("access_token"),
            },
          }
        )
        .then((response) => {
          console.log(response);
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
    try {
      console.log(payload);
      const response = await axios.post(
        `https://sparta-tim.shop/notices/${payload.id}`,
        {
          content: payload.content,
          date: payload.date,
          place: payload.place,
        },
        {
          headers: {
            Authorization: window.localStorage.getItem("access_token"),
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
  "put/editCrew",
  async (payload, thunkAPI) => {
    try {
      const response = await axios
        .put(
          `https://sparta-tim.shop/notices/${payload.id}`,
          {
            name: payload.name,
            content: payload.content,
            imgUrl: payload.imgUrl,
          },
          {
            headers: {
              Authorization: window.localStorage.getItem("access_token"),
            },
          }
        )
        .then((response) => {
          console.log(response);
        });
      window.alert("등록완료!");
      window.location.reload();
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.data);
    }
  }
);

//크루 공지사항 삭제-->확인
// export const deleteCrewNotice = createAsyncThunk(
//   "delete/CrewNotice",
//   async (payload, thunkAPI) => {
//     try {
//       const response = await axios
//         .delete(`${BASE_URLM}/notices/${payload}`, {
//           headers: {
//             Authorization: window.localStorage.getItem("access_token"),
//           },
//         })
//         .then((response) => {
//           console.log(response);
//         });
//       return thunkAPI.fulfillWithValue(response.data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.data);
//     }
//   }
// );

//크루 사진 CRUD
/////////////////////////////////////////////////////////////////////

//크루 사진 등록--> 확인
export const addCrewPhoto = createAsyncThunk(
  "add/CrewPhoto",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const response = await axios
        .post(
          `${BASE_URLM}/crews/${payload.id}/posts`,
          {
            imgList: payload.imgUrl,
          },
          {
            headers: {
              Authorization: window.localStorage.getItem("access_token"),
            },
          }
        )
        .then((response) => {
          console.log(response);
        });
      // window.location.replace("/crews");
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
      console.log(response.data);
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
    console.log(payload);
    try {
      const response = await axios
        .delete(`http://sparta-tim.shop/crews/posts/${payload}`, {
          headers: {
            Authorization: window.localStorage.getItem("access_token"),
          },
        })
        .then((response) => {
          console.log(response);
        });
      window.alert("사진 삭제 완료");
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.data);
    }
  }
);

export const crewSlice = createSlice({
  name: "crew",
  initialState,
  reducers: {
    expelCrew(state, action) {
      const id = action.payload;
      state.crewDetail.data.memberList =
        state.crewDetail.data.memberList.filter((crew) => crew.id !== id);
    },
    acceptCrew(state, action) {
      const id = action.payload;
      console.log(id);
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
      state.crewDetail.data.noticeList = [
        ...state.crewDetail.data.noticeList,
        action.payload,
      ];
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

export const { expelCrew, acceptCrew, deleteCrewNotice, addCrewNotice } =
  crewSlice.actions;
export default { crewSlice }.reducer;
