import { Box, Typography, Stack } from "@mui/material";
import Button from "components/Button";
import { useRouter } from "next/router";
import GroupItem from "./GroupItem";
import { useGroupList } from "./useGroupList";
import map from "lodash/map";
import groupBy from "lodash/groupBy";

const GroupList = () => {
  const { groups, handleDecline, handleJoin } = useGroupList();
  const router = useRouter();

  const handleNewGroup = () => router.push("/groups/new");
  return (
    <Box width="100%">
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 5 }}>
        <Typography variant="h5" fontWeight="bold">
          Groups
        </Typography>
        <Button onClick={handleNewGroup}>New Group</Button>
      </Stack>

      {map(groupBy(groups, "categoryName"), (items, type) => (
        <Box key={type} mb={5}>
          <Typography variant="h5" mb={2}>
            {type}
          </Typography>
          {items?.sort((a, b) => a.id - b.id).map((group) => (
            <GroupItem
              key={group.id}
              id={group.id}
              name={group.name}
              isAccepted={group.isAccepted}
              userCount={group.userCount}
              postCount={group.postCount}
              users={group.users}
              onJoin={handleJoin}
              onDecline={handleDecline}
              type={type}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default GroupList;
