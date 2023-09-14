import { Box, Stack, Typography } from '@mui/material';
import Item from './Item';

const Home = () => {
  return (
    <Box>
      <Stack sx={{ mb: 5 }}>
        <Typography variant="h5" fontWeight="bold">
          Welcome
        </Typography>
      </Stack>

      <Stack spacing={5}>
        <Item
          link="https://player.vimeo.com/video/812293319?h=cde4529bb7"
          title="Welcome To Tinnitus Pal!"
          description={
            <>
              Hello! <br />
              I'm so glad to have you here. In this first video, I introduce you to the Tinnitus Pal
              system, and I explain how long it may take to reach silence.
              <br />
            </>
          }
        />
      </Stack>
    </Box>
  );
};

export default Home;
