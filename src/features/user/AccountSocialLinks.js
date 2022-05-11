import React from "react";
import { Stack, Card, InputAdornment } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useForm } from "react-hook-form";
import { FormProvider, FTextField } from "../../components/form";
import { LoadingButton } from "@mui/lab";
import useAuth from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "./userSlice";

const SOCIAL_LINKS = [
  {
    value: "linkedinLink",
    icon: <LinkedInIcon sx={{ fontSize: 30 }} />,
  },
  {
    value: "githubLink",
    icon: <GitHubIcon sx={{ fontSize: 30 }} />,
  },
  {
    value: "twitterLink",
    icon: <TwitterIcon sx={{ fontSize: 30 }} />,
  },
  {
    value: "facebookLink",
    icon: <FacebookIcon sx={{ fontSize: 30 }} />,
  },
];

function AccountSocialLinks() {
  const isLoading = useSelector((state) => state.user.isLoading);
  const { user } = useAuth();
  const defaultValues = {
    linkedinLink: user?.linkedinLink || "",
    githubLink: user?.instagramLink || "",
    facebookLink: user?.facebookLink || "",
    twitterLink: user?.twitterLink || "",
  };

  const methods = useForm({ defaultValues });
  const {
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;
  const update = watch();
  console.log("update", update);
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    dispatch(updateUserProfile({ userId: user._id, ...data }));
  };
  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end">
          {SOCIAL_LINKS.map((link) => (
            <FTextField
              name={link.value}
              key={link.value}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">{link.icon}</InputAdornment>
                ),
              }}
            />
          ))}
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting || isLoading}
          >
            Save Changes
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Card>
  );
}

export default AccountSocialLinks;
