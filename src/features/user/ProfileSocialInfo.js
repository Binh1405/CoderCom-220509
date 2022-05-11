import React from "react";
import { Link, Card, CardHeader, Stack, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

const IconStyle = styled(Box)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));
const ProfileSocialInfo = ({ profile }) => {
  const { facebookLink, instagramLink, linkedinLink, twitterLink } = profile;
  const SOCIAL_LINKS = [
    {
      name: "LinkedIn",
      icon: (
        <IconStyle color="#006097">
          <LinkedInIcon />
        </IconStyle>
      ),
      href: linkedinLink,
    },
    {
      name: "Github",
      icon: (
        <IconStyle color="#333">
          <GitHubIcon />
        </IconStyle>
      ),
      href: instagramLink,
    },
    {
      name: "Facebook",
      icon: (
        <IconStyle color="#1C9CEA">
          <FacebookIcon />
        </IconStyle>
      ),
      href: facebookLink,
    },
    {
      name: "Twitter",
      icon: (
        <IconStyle color="#1877F2">
          <TwitterIcon />
        </IconStyle>
      ),
      href: twitterLink,
    },
  ];
  return (
    <Card>
      <CardHeader title="Socail" />
      <Stack spacing={2} sx={{ p: 3 }}>
        {SOCIAL_LINKS.map((link) => (
          <Stack key={link.name} direction="row" alignItems="center">
            {link.icon}
            <Link component="span" variant="body2" color="text.primary" noWrap>
              {link.href}
            </Link>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
};

export default ProfileSocialInfo;
