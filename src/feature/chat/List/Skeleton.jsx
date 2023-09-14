import MuiSkeleton from "@mui/material/Skeleton";
import { Divider, Stack } from "@mui/material";
const Skeleton = () => {
  return (
    <>
      {[...Array(10)].map((_, key) => (
        <div key={key}>
          <Stack direction="row" spacing={2} sx={{ px: 2, py: 1 }}>
            <MuiSkeleton variant="circular" height={40} width={40} />
            <div>
              <MuiSkeleton height={20} width={160} />
              <MuiSkeleton height={20} width={80} />
            </div>
          </Stack>
          <Divider />
        </div>
      ))}
    </>
  );
};

export default Skeleton;
