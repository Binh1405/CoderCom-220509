import { IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";

const PostReaction = ({ post }) => {
  const handleClick = (emoji) => {
    console.log("click", emoji);
  };
  return (
    <Stack direction="row" alignItem="center">
      <IconButton onClick={() => handleClick("like")}>
        <ThumbUpIcon sx={{ fontSize: 20, color: "primary.main" }} />
      </IconButton>
      <Typography variant="h6" mr={1}>
        {post?.reactions?.like}
      </Typography>
      <IconButton onClick={() => handleClick("dislike")}>
        <ThumbDownOffAltIcon sx={{ fontSize: 20, color: "error.main" }} />
      </IconButton>
      <Typography variant="h6" mr={1}>
        {" "}
        {post?.reactions?.dislike}
      </Typography>
    </Stack>
  );
};

export default PostReaction;
