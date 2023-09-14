import { Box, Stack, Typography } from "@mui/material";
import Button from "components/Button";
import Item from "./item";
import New from "./new";
import useToggle from "hooks/useToggle";
import { useLiveStreams } from "./hooks/use-live-streams";
import { useUser } from "feature/auth/context";
import roles from "constants/roles";

const LiveStream = () => {
  const [showNewLiveStream, toggleNewLiveStream] = useToggle(false);
  const user = useUser();
  const isAdmin = user?.role === roles.ADMIN;
  const liveStreamsQuery = useLiveStreams();

  return (
    <Box maxWidth="md" marginX="auto" width="100%">
      <New open={showNewLiveStream} onClose={toggleNewLiveStream} />
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 5 }}>
        <Typography variant="h5" fontWeight="bold">
          Live stream
        </Typography>
        {isAdmin && <Button onClick={toggleNewLiveStream}>Add new</Button>}
      </Stack>

      <Stack spacing={2}>
        {liveStreamsQuery.data?.map((liveStream) => (
          <Item id={liveStream.id} data={liveStream} />
        ))}
      </Stack>
    </Box>
  );
};

export default LiveStream;
