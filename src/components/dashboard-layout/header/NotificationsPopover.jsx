import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { Badge, Box, List, Typography, Divider, IconButton, Button, Stack } from '@mui/material';
const MenuPopover = dynamic(() => import('components/menu-popover/MenuPopover'));
const Scrollbar = dynamic(() => import('components/scrollbar'), {ssr: false});
const NotificationItem = dynamic(() => import('feature/notification/NotificationItem'));
import { useNotifications } from './hooks/use-notifications';
import { useRouter } from 'next/router';

const NotificationsPopover = () => {
  const [openPopover, setOpenPopover] = useState(null);
  const router = useRouter();
  const { unreadCount, notificationQuery, readAllMutation, readMutation } = useNotifications();

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
    readAllMutation.mutate();
  }
  const handleClosePopover = () => setOpenPopover(null);
  const handleReadAll = () => readAllMutation.mutate();
  const handleShowAll = () => {
    router.push('/notification');
    handleClosePopover();
  };
  const handleRead = (id) => {
    readMutation.mutate(id);
    handleClosePopover();
  };

  return (
    <div>
      <IconButton onClick={handleOpenPopover}>
        <Badge color="error" badgeContent={unreadCount}>
          <NotificationsNoneOutlinedIcon color="primary" />
        </Badge>
      </IconButton>
      <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ width: 340, p: 0 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ py: 2, px: 2.5 }}
        >
          <Typography variant="subtitle1">Notifications</Typography>
          {unreadCount > 0 && (
            <Button variant="text" onClick={handleReadAll} size="small">
              Mark All As Read
            </Button>
          )}
        </Stack>
        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 360, sm: 460, overflow: 'auto' } }}>
          <List disablePadding>
            {notificationQuery.data?.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onRead={handleRead}
              />
            ))}
          </List>
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth variant="text" onClick={handleShowAll}>
            See All Notifications
          </Button>
        </Box>
      </MenuPopover>
    </div>
  );
};

export default NotificationsPopover;
