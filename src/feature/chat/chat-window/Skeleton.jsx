import { Skeleton as MuiSkeleton } from "@mui/material";
import { Stack } from "@mui/system";

const HeaderSkeleton = () => {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <MuiSkeleton variant="circular" height={40} width={40} />
      <div>
        <MuiSkeleton height={20} width={180} />
        <MuiSkeleton height={20} width={100} />
      </div>
    </Stack>
  );
};

export default HeaderSkeleton;
