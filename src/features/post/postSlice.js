import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { POST_PER_PAGE } from "../../app/config";
import { cloudinaryUpload } from "../../utils/cloudinary";
const initialState = {
  isLoading: false,
  error: null,
  posts: [],
  totalPosts: Number,
  postsById: {},
  currentPagePosts: [],
};

const slice = createSlice({
  name: "post",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createPostSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newPost = action.payload;
      state.postsById[newPost._id] = newPost;
      state.currentPagePosts.unshift(newPost._id);
    },
    getPostSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { count, posts } = action.payload;
      console.log("posts", posts);
      // if (state.currentPagePosts.length % POST_PER_PAGE === 0)
      //   state.currentPagePosts.pop();
      posts.forEach((post) => {
        state.postsById[post._id] = post;
        if (!state.currentPagePosts.includes(post._id))
          state.currentPagePosts.push(post._id);
      });
      state.totalPosts = count;
    },
    sendPostReactionSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { postId, reactions } = action.payload;
      state.postsById[postId].reactions = reactions;
    },
    resetPosts(state, action) {
      state.postsById = {};
      state.currentPagePosts = [];
    },
    deleteSinglePostSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { postId } = action.payload;
      state.currentPagePosts = state.currentPagePosts.filter((post) => {
        if (post !== postId) return true;
        return false;
      });
    },
    updateSinglePostSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const createPost =
  ({ content, image }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const imageUrl = await cloudinaryUpload(image);
      const response = await apiService.post("/posts", {
        content,
        image: imageUrl,
      });
      dispatch(slice.actions.createPostSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const getPosts =
  ({ userId, page, limit = POST_PER_PAGE }) =>
  async (dispatch) => {
    console.log("userId of current user", userId);
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      const response = await apiService.get(`/posts/user/${userId}`, {
        params,
      });
      console.log("posts of current user", response);
      if (page === 1) dispatch(slice.actions.resetPosts());
      dispatch(slice.actions.getPostSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const sendPostReaction =
  ({ postId, emoji }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post(`/reactions`, {
        targetType: "Post",
        targetId: postId,
        emoji,
      });
      dispatch(
        slice.actions.sendPostReactionSuccess({
          reactions: response.data.data,
          postId,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const deleteSinglePost =
  ({ postId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.delete(`/posts/${postId}`);
      console.log("response", response);
      dispatch(
        slice.actions.deleteSinglePostSuccess({
          deletedPost: response.data.data,
          postId,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const updateSinglePost =
  ({ postId, content, image }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/posts/${postId}`, {
        content,
        image,
      });
      console.log("updated post", response);
      dispatch(slice.actions.updateSinglePostSuccess(response.data.data));
      toast.success("update post success");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
export default slice.reducer;
