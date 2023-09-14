import { Divider, Tab, Tabs, Typography } from "@mui/material";
import { CustomAvatar } from "components/custom-avatar";
import { AvatarContainer, CoverContainer, NameContainer } from "./styled";
import CoverPhoto from "./CoverPhoto";
import { useRouter } from "next/router";
const Cover = ({ name, category, avatar, cover, activeTab, onChangeTab }) => {
  const router = useRouter();
  const { id: groupId } = router.query;
  return (
    <CoverContainer>
      <AvatarContainer>
        <CustomAvatar
          src={avatar}
          name={name}
          sx={{
            width: { xs: 100, md: 120 },
            height: { xs: 100, md: 120 },
            fontSize: 42,
          }}
        />
        <NameContainer>
          <Typography variant="h5" fontWeight={600}>
            {name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {category}
          </Typography>
        </NameContainer>
      </AvatarContainer>

      <CoverPhoto groupId={groupId} cover={cover} />

      <Divider />
      <Tabs
        value={activeTab}
        onChange={onChangeTab}
        sx={{
          "& .MuiTabs-flexContainer": {
            pl: 5,
            mt: 12,
          },
        }}
      >
        <Tab value="posts" label="Posts" />
        <Tab value="members" label="Members" />
      </Tabs>
    </CoverContainer>
  );
};

export default Cover;