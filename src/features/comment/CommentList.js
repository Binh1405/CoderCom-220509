import { Pagination, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { COMMENTS_PER_POST } from "../../app/config";
import { getComments } from "./commentSlice";
import LoadingScreen from "../../components/LoadingScreen";
import CommentCard from "./CommentCard";

const CommentList = ({ postId }) => {
  const {
    commentsByPost,
    commentsById,
    totalComments,
    isLoading,
    currentPage,
  } = useSelector(
    (state) => ({
      commentsByPost: state.comment.commentsByPost[postId],
      totalComments: state.comment.totalCommentByPost[postId],
      currentPage: state.comment.currentPageByPost[postId] || 1,
      commentsById: state.comment.commentsById,
      isLoading: state.comment.isLoading,
    }),
    shallowEqual
  );
  let renderComments;
  if (commentsByPost) {
    const comments = commentsByPost.map((commentId) => commentsById[commentId]);
    renderComments = (
      <Stack spacing={1.5}>
        {comments.map((comment) => (
          <CommentCard key={comment._id} comment={comment} />
        ))}
      </Stack>
    );
  } else if (isLoading) {
    renderComments = <LoadingScreen />;
  }
  const totalPages = Math.ceil(totalComments / COMMENTS_PER_POST);
  const dispatch = useDispatch();
  useEffect(() => {
    if (postId) dispatch(getComments({ postId }));
  }, [postId, dispatch]);
  return (
    <Stack spacing={1.5}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle" sx={{ color: "text.secondary" }}>
          {totalComments > 1
            ? `${totalComments} comments`
            : totalComments === 1
            ? `${totalComments} comment`
            : "No comment"}
        </Typography>
        {totalComments > COMMENTS_PER_POST && (
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(e, page) => dispatch(getComments({ postId, page }))}
          />
        )}
      </Stack>
      {renderComments}
    </Stack>
  );
};

export default CommentList;
