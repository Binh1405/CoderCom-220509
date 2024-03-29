import { LoadingButton } from "@mui/lab";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Profile from "../user/Profile";
import PostCard from "./PostCard";
import { getPosts } from "./postSlice";

const PostList = ({ userId }) => {
  console.log("userId", userId);
  const [page, setPage] = useState(1);
  const { currentPagePosts, postsById, totalPosts, isLoading } = useSelector(
    (state) => state.post
  );
  console.log("currentPagePosts", currentPagePosts);
  console.log("postByIds", postsById);
  const posts = currentPagePosts.map((postId) => postsById[postId]);
  console.log("posts", posts);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userId) dispatch(getPosts({ userId, page }));
  }, [userId, page, dispatch]);
  return (
    <>
      {posts?.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
      <Box sx={{ display: "flex", justifyContent: "center" }} />
      {totalPosts ? (
        <LoadingButton
          variant="outlined"
          size="small"
          loading={isLoading}
          onClick={() => setPage((page) => page + 1)}
          disabled={Boolean(totalPosts) && posts.length >= totalPosts}
        >
          Load more
        </LoadingButton>
      ) : (
        <Typography variant="h6"> No post yet </Typography>
      )}
    </>
  );
};

export default PostList;
