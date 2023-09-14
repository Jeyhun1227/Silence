import { Box, Card, Stack, Typography } from '@mui/material';
import { useNotifications, useRead } from './hooks/use-notifications';
import NotificationItem from './NotificationItem';
import Button from 'components/Button';

const Notification = () => {
  const notificationQuery = useNotifications();
  const readMutation = useRead();

  const handleNextPage = () => {
    notificationQuery.fetchNextPage();
  };

  const handleRead = (id) => {
    readMutation.mutate(id);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 5 }}>
        <Typography variant="h5" fontWeight="bold">
          Notifications
        </Typography>
      </Stack>

      <Stack spacing={1}>
        {notificationQuery?.data?.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page.notifications.map((notification) => (
              <Card>
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onRead={handleRead}
                />
              </Card>
            ))}
          </React.Fragment>
        ))}
        <Box display="flex" py={2} justifyContent="center">
          {notificationQuery.hasNextPage && (
            <Button
              variant="text"
              onClick={handleNextPage}
              loading={notificationQuery.isFetchingNextPage}
            >
              Load more
            </Button>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default Notification;
