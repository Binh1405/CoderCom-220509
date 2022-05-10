import { IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { useDispatch } from "react-redux";
import { sendCommentReaction } from "./commentSlice";

const CommentReaction = ({ comment }) => {
  const dispatch = useDispatch();
  const handleClick = (emoji) => {
    dispatch(sendCommentReaction({ commentId: comment._id, emoji }));
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
    </Stack>
  );
};

export default CommentReaction;
