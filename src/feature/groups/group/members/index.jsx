import { useMembers } from "../hooks/use-group";
import { Card, Grid, Stack, Typography } from "@mui/material";
import { CustomAvatar } from "components/custom-avatar";
import { formatName } from "utils/user";
import roles from "constants/roles";
import config from "@config/index";

const Members = () => {
  const membersQuery = useMembers();
  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <Card sx={{ p: 3 }}>
          <Stack spacing={2}>
            {membersQuery.data?.map((member, key) => (
              (member.firstName !== "Ram" && member.firstName !== "Nolan") &&
              <Stack direction="row" spacing={2} key={key}>
                <CustomAvatar
                  src={member.avatar && `${config.avatarBaseUrl}${member.avatar}`}
                  alt="avatar"
                  name={formatName(member)}
                />
                <div>
                  <Typography>{formatName(member)}</Typography>
                  <Typography variant="caption" color="text.secondary" component="div">
                    {member?.role === roles.ADMIN ? member?.role : member.groupRole}
                  </Typography>
                </div>
              </Stack>
            ))}
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Members;
