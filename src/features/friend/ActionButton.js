import { Button, Stack } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import {
  cancelRequest,
  sendFriendRequests,
  declineRequest,
  removeFriend,
  acceptRequest,
} from "./friendSlice";

const ActionButton = ({ currentUserId, targetUserId, friendship, sx }) => {
  const dispatch = useDispatch();
  if (currentUserId === targetUserId) return null;

  const btnSendFriendRequest = (
    <Button
      sx={{ fontSize: "0.6rem", ...sx }}
      size="small"
      variant="contained"
      onClick={() => dispatch(sendFriendRequests(targetUserId))}
    >
      Send Request
    </Button>
  );
  if (!friendship) return btnSendFriendRequest;
  const btnUnfriend = (
    <Button
      sx={{ fontSize: "0.6rem", ...sx }}
      size="small"
      variant="contained"
      color="error"
      onClick={() => dispatch(removeFriend(targetUserId))}
    >
      Unfriend
    </Button>
  );
  const btnResend = (
    <Button
      sx={{ fontSize: "0.6rem", ...sx }}
      size="small"
      variant="contained"
      onClick={() => dispatch(sendFriendRequests(targetUserId))}
    >
      {friendship.from === currentUserId ? "Resend" : "Send"} Request
    </Button>
  );

  const btnCancelRequest = (
    <Button
      sx={{ fontSize: "0.6rem", ...sx }}
      size="small"
      variant="contained"
      color="error"
      onClick={() => dispatch(cancelRequest(targetUserId))}
    >
      {" "}
      Cancel Request
    </Button>
  );

  const btnGroupReact = (
    <Stack direction="row" spacing={1}>
      <Button
        sx={{ fontSize: "0.6rem", ...sx }}
        size="small"
        variant="contained"
        color="success"
        onClick={() => dispatch(acceptRequest(targetUserId))}
      >
        Accept
      </Button>
      <Button
        size="small"
        variant="outlined"
        color="error"
        onClick={() => dispatch(declineRequest(targetUserId))}
      >
        Decline
      </Button>
    </Stack>
  );
  if (friendship.status === "accepted") {
    return btnUnfriend;
  }
  if (friendship.status === "decline") {
    return btnResend;
  }
  if (friendship.status === "pending") {
    const { from, to } = friendship;
    if (from === currentUserId && to === targetUserId) {
      return btnCancelRequest;
    } else if (from === targetUserId && to === currentUserId) {
      return btnGroupReact;
    }
  }
  return btnSendFriendRequest;
};

export default ActionButton;
