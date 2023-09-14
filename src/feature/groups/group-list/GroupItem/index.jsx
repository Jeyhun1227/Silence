import { Stack, Typography } from "@mui/material";
import Button from "components/Button";
import { CustomAvatar, CustomAvatarGroup } from "components/custom-avatar";
import { useRouter } from "next/router";
import { Container, DetailsContainer, UserContainer } from "./styled";
import config from "@config/index";

const GroupItem = ({ name, id, isAccepted, onJoin, onDecline, users, userCount, postCount, type }) => {
  const router = useRouter();
  const handleSelect = () => isAccepted && router.push(`groups/${id}`);

  return (
    <Container role="button" onClick={handleSelect}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <CustomAvatar src="" name={name} />
        <Typography>{name}</Typography>
      </Stack>
      {!isAccepted ? (
        <Stack direction="row" spacing={2}>
          <Button size="small" color="success" onClick={() => onJoin(id)}>
            Join
          </Button>
          <Button size="small" color="error" onClick={() => onDecline(id)}>
            Decline
          </Button>
        </Stack>
      ) : (
        <DetailsContainer>
          <UserContainer>
            <CustomAvatarGroup max={5}>
              {users?.map((user, key) => (
                (user.firstName !== "Ram" && user.firstName !== "Nolan" || type === "Private") &&
                <CustomAvatar
                  key={key}
                  name={user.firstName}
                  src={user.avatar && `${config.avatarBaseUrl}${user.avatar}`}
                  alt="avatar"
                />
              ))}
            </CustomAvatarGroup>
            <Typography variant="subtitle1">{(type === 'Private') ? userCount : userCount - 2} members</Typography>
          </UserContainer>
          <span>
            <Typography variant="subtitle1" display="inline">
              {postCount}&nbsp;
            </Typography>
            <Typography variant="subtitle1" display="inline">
              posts
            </Typography>
          </span>
        </DetailsContainer>
      )}
    </Container>
  );
};

export default GroupItem;
