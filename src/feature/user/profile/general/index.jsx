import { Grid } from "@mui/material";
import Info from "./Info";
import { useProfile } from "../hooks/use-profile";
import Avatar from "./Avatar";

const General = () => {
  const { profileQuery } = useProfile();

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={3}>
        {!profileQuery.isLoading && <Avatar avatar={profileQuery.data?.avatar} />}
      </Grid>
      <Grid item xs={12} md={9}>
        {!profileQuery.isLoading && <Info initialValues={profileQuery.data} />}
      </Grid>
    </Grid>
  );
};
export default General;