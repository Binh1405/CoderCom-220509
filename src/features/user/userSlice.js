import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";
import { cloudinaryUpload } from "../../utils/cloudinary";

const initialState = {
  isLoading: false,
  error: null,
  updatedProfile: null,
  selectedUser: null,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getUserSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      console.log("get user", action.payload);
      state.selectedUser = action.payload;
    },
    updateUserProfileSuccess(state, action) {
      state.isLoading = false;
      state.hasError = null;
      state.updatedProfile = action.payload;
    },
  },
});

export const getUser = (userId) => async (dispatch) => {
  console.log("currentUserId", userId);
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/users/${userId}`);
    console.log("current user", response);
    dispatch(slice.actions.getUserSuccess(response.data.data));
    toast.success("Get user success");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};
export const updateUserProfile =
  ({
    userId,
    name,
    avatarUrl,
    coverUrl,
    aboutMe,
    city,
    country,
    company,
    jobTitle,
    facebookLink,
    instagramLink,
    linkedinLink,
    twitterLink,
    friendCount,
    postCount,
  }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const data = {
        name,
        avatarUrl,
        coverUrl,
        aboutMe,
        city,
        country,
        company,
        jobTitle,
        facebookLink,
        instagramLink,
        linkedinLink,
        twitterLink,
        friendCount,
        postCount,
      };
      if (avatarUrl instanceof File) {
        const imageUrl = await cloudinaryUpload(avatarUrl);
        data.avatarUrl = imageUrl;
      }
      const response = await apiService.put(`/users/${userId}`, data);
      dispatch(slice.actions.updateUserProfileSuccess(response.data.data));
      toast.success("Update user profile successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export default slice.reducer;
