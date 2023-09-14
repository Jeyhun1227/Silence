import MenuPopover from "components/menu-popover/MenuPopover";
import { useUser } from "./use-user";
import { Divider, Stack, Typography } from "@mui/material";
import Skelton from "./Skelton";
const UserInfo = ({ open, onClose, userId }) => {
  const userQuery = useUser(userId, open);

  const user = userQuery.data?.user;
  const symptoms = userQuery.data?.symptoms;

  return (
    <MenuPopover open={open} onClose={onClose} arrow="top-center" sx={{ minWidth: 250, maxWidth: 450 }}>
      {userQuery.isLoading && <Skelton />}
      {userQuery.data && (
        <>
          <Stack spacing={1} sx={{ p: 1 }}>
            <Typography variant="h5" color="primary">
              {user?.name}
            </Typography>
            {!user?.hideLocationAge && (
              <>
                <Typography variant="caption">from {user?.location}</Typography>
                <Typography variant="caption">{user?.age} years old</Typography>
                <Divider />
              </>
            )}
          </Stack>
          <Stack spacing={2} sx={{ p: 1 }}>
            {symptoms?.map((symptom) => (
              <div>
                <Typography variant="body2" fontWeight={500}>
                  {symptom.name} &nbsp;
                  <Typography variant="caption" color="text.secondary">
                    {symptom?.value?.value
                      ? `${symptom?.value?.value}%`
                      : `L ${symptom?.value?.left}%, R ${symptom?.value?.right}%`}
                  </Typography>
                </Typography>
                <Typography variant="caption" color="text.disabled">
                  {symptom?.causes.join(", ")}
                </Typography>
              </div>
            ))}
          </Stack>
        </>
      )}
    </MenuPopover>
  );
};

export default UserInfo;
