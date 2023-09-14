import { Skeleton } from "@mui/material";

const Skelton = () => {
  return (
    <div>
      <Skeleton height={40} />
      <Skeleton height={20} width={120} />
      <Skeleton height={20} width={80} />
    </div>
  );
};

export default Skelton;
