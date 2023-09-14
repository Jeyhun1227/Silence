import { Box, Stack, Typography } from "@mui/material";
import Item from "./Item";

const Content = () => {
  return (
    <Box>
      <Stack sx={{ mb: 5 }}>
        <Typography variant="h5" fontWeight="bold">
          Content
        </Typography>
      </Stack>

      <Stack spacing={5}>
        <Item
          link="https://player.vimeo.com/video/812293319?h=cde4529bb7"
          title="Welcome To Tinnitus Pal!"
          description={
            <>
              Hello! <br />
              I'm so glad to have you here. In this first video, I introduce you to the Tinnitus Pal system, and I
              explain how long it may take to reach silence.
              <br />
            </>
          }
        />

        <Item
          link="https://player.vimeo.com/video/812298755?h=73dcfdbb71"
          title="The Basics Of Beating Tinnitus (Part 1)"
          description={
            <>
              In this video, I explain what you should be removing from your daily life. It is a common assumption for
              believe to believe that they must 'add something' to their life in order to silence their tinnitus.
              Perhaps a medication, supplement, or treatment.
              <br />
              <br />I believe what must be added comes later, and that first, those with tinnitus must seek to remove
              the causes of their issues. <br />
              <br />
              Enjoy the video!
            </>
          }
        />

        <Item
          link="https://player.vimeo.com/video/812313547?h=28c6adb464"
          title="The Basics Of Beating Tinnitus (Part 2)"
          description={
            <>
              In this video, I explain what I believe should be added to a person's life. This comes after the steps in
              the previous video have been implemented. Again, these steps must be implemented slowly, safely, and
              consistently. They may not always be easy, but they are in fact worthwhile!
              <br />
              <br />
              Remember, always consult with your doctor before implementing anything shown inside of Tinnitus Pal.
            </>
          }
        />
      </Stack>
    </Box>
  );
};

export default Content;
