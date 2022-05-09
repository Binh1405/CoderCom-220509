import { Grid, Stack } from "@mui/material";
import React from "react";
import useAuth from "../../hooks/useAuth";
import PostForm from "../post/PostForm";
import PostList from "../post/PostList";
import ProfileAbout from "./ProfileAbout";
import ProfileScorecard from "./ProfileScorecard";
import ProfileSocialInfo from "./ProfileSocialInfo";

const Profile = ({ profile }) => {
  const { user } = useAuth();
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <ProfileScorecard profile={profile}></ProfileScorecard>
          <ProfileAbout profile={profile}></ProfileAbout>
          <ProfileSocialInfo profile={profile}></ProfileSocialInfo>
        </Stack>
      </Grid>
      <Grid item xs={12} md={8}>
        {/* <Stack spacing={3}>
          {user._id === profile._id && <PostForm />}

          <PostList />
        </Stack> */}
        <PostForm />
        <PostList userId={profile._id} />
      </Grid>
    </Grid>
  );
};

export default Profile;
