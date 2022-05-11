import { Card, Container } from "@mui/material";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser } from "../features/user/userSlice";
import LoadingScreen from "../components/LoadingScreen";
import ProfileCover from "../features/user/ProfileCover";
import Profile from "../features/user/Profile";
const ProfilePage = () => {
  const params = useParams();
  const userId = params.userId;
  const { selectedUser, isLoading } = useSelector(
    (state) => state.user,
    shallowEqual
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, userId]);
  return (
    <Container>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Card sx={{ mb: 3, height: 280, position: "relative" }}>
            {selectedUser && <ProfileCover profile={selectedUser} />}
          </Card>
          {selectedUser && <Profile profile={selectedUser} />}
        </>
      )}
    </Container>
  );
};

export default ProfilePage;
