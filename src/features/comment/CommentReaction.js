import { IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { useDispatch } from "react-redux";
import {
  deleteCommentReaction,
  getComments,
  sendCommentReaction,
} from "./commentSlice";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import useAuth from "../../hooks/useAuth";

const CommentReaction = ({ comment, postId }) => {
  const currentUser = useAuth();
  const userId = currentUser.user._id;
  const dispatch = useDispatch();
  const handleClick = (emoji) => {
    dispatch(sendCommentReaction({ commentId: comment._id, emoji }));
  };
  const handleDelete = () => {
    dispatch(deleteCommentReaction({ commentId: comment._id }));
    dispatch(getComments(postId));
  };
  return (
    <Stack direction="row" alignItems="center">
      <IconButton
        onClick={() => handleClick("like")}
        sx={{ color: "primary.main" }}
      >
        <ThumbUpOffAltIcon sx={{ fontSize: 20 }} />
      </IconButton>
      <Typography variant="body2" mr={1}>
        {comment?.reactions?.like}
      </Typography>
      <IconButton
        onClick={() => handleClick("dislike")}
        sx={{ color: "error.main" }}
      >
        <ThumbDownAltIcon sx={{ fontSize: 20 }} />
      </IconButton>
      <Typography variant="body2">{comment?.reactions?.dislike}</Typography>
      {userId === comment.author._id && (
        <IconButton onClick={handleDelete} sx={{ color: "secondary.main" }}>
          <ClearRoundedIcon />
        </IconButton>
      )}
    </Stack>
  );
};

export default CommentReaction;
