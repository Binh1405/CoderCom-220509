import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
const initialState = {
  isLoading: false,
  error: null,
  currentPageUsers: [],
  usersById: {},
  totalPages: 1,
};

const slice = createSlice({
  name: "friend",
  initialState,
  reducers: {
    startLoading(state, action) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getUsersSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { users, pages, count } = action.payload;
      users.forEach((user) => (state.usersById[user._id] = user));
      state.currentPageUsers = users.map((user) => user._id);
      state.totalUsers = count;
      state.totalPages = pages;
    },
    sendFriendRequestsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { targetUserId, ...friendship } = action.payload;
      state.usersById[targetUserId].friendship = friendship;
    },
    declineRequestSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { targetUserId, ...friendship } = action.payload;
      state.usersById[targetUserId].friendship = friendship;
    },
    acceptRequestSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { targetUserId, ...friendship } = action.payload;
      state.usersById[targetUserId].friendship = friendship;
    },
    cancelRequestSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { targetUserId } = action.payload;
      state.usersById[targetUserId].friendship = null;
    },
    removeFriendSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { targetUserId } = action.payload;
      state.usersById[targetUserId].friendship = null;
    },
  },
});

export const getUsers =
  ({ filterName, page = 1, limit = 12 }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      if (filterName) params.name = filterName;
      const response = await apiService.get(`/users`, { params });
      console.log("current user friends", response);
      dispatch(slice.actions.getUsersSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
export const sendFriendRequests = (targetUserId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.post("/friends/requests", {
      to: targetUserId,
    });
    console.log("send friend req", response);
    dispatch(
      slice.actions.sendFriendRequestsSuccess({
        ...response.data.data,
        targetUserId,
      })
    );
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const declineRequest = (targetUserId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.put(`/friends/requests/${targetUserId}`, {
      status: "declined",
    });
    console.log("decline friend req", response);
    dispatch(
      slice.actions.declineRequestSuccess({
        ...response.data.data,
        targetUserId,
      })
    );
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};
export const acceptRequest = (targetUserId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.put(`/friends/requests/${targetUserId}`, {
      status: "accepted",
    });
    console.log("accept friend req", response);
    dispatch(
      slice.actions.acceptRequestSuccess({
        ...response.data.data,
        targetUserId,
      })
    );
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};
export const cancelRequest = (targetUserId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(
      `/friends/requests/${targetUserId}`
    );
    console.log("cancel friend req", response);
    dispatch(
      slice.actions.cancelRequestSuccess({
        ...response.data.data,
        targetUserId,
      })
    );
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};
export const removeFriend = (targetUserId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(`/friends/${targetUserId}`);
    console.log("remove friend req", response);
    dispatch(
      slice.actions.removeFriendSuccess({ ...response.data.data, targetUserId })
    );
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export default slice.reducer;
