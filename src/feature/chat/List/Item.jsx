import React from 'react';

import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import { CustomAvatar } from 'components/custom-avatar';
import { Divider, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { UnreadLabel } from './styled';

const Item = ({ name, unreadCount, receiverId }) => {
  const router = useRouter();

  const handleRedirect = () => router.push(`/chat/private/${receiverId}`);

  return (
    <div>
      <ListItem alignItems="flex-start" disablePadding>
        <ListItemButton onClick={handleRedirect} disableRipple>
          <ListItemAvatar>
            <CustomAvatar name={name} alt={name} />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography component="span" variant="subtitle2" color="text.primary">
                  {name}
                </Typography>
                {unreadCount > 0 && <UnreadLabel>{unreadCount}</UnreadLabel>}{' '}
              </Stack>
            }
            secondary={
              <React.Fragment>
                <Typography component="span" variant="caption" color="text.secondary"></Typography>
              </React.Fragment>
            }
          />
        </ListItemButton>
      </ListItem>
      <Divider component="li" />
    </div>
  );
};

export default Item;
