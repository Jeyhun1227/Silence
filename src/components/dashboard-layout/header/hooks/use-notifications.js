import { useEffect, useState } from 'react';
import * as notificationApi from '@api/notification';
import { useUser } from 'feature/auth/context';
import { useMutation, useQuery } from '@tanstack/react-query';
export const useNotifications = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const user = useUser();

  const notificationQuery = useQuery({
    queryKey: ['recent-notifications'],
    queryFn: () => notificationApi.getRecentNotifications(user.id),
    select: (data) => data.data,
  });

  const readAllMutation = useMutation({
    mutationFn: () => notificationApi.readAllNotification(user.id),
    onSuccess: () => setUnreadCount(0),
  });

  const readMutation = useMutation({
    mutationFn: (id) => notificationApi.readNotification(id),
  });

  useEffect(() => {
    const init = async () => {
      const { count } = await notificationApi.getUnreadNotificationsCount(user.id);
      setUnreadCount(count || 0);
    };
    notificationApi.subscribeToNotifications(user.id, () => {
      setUnreadCount((state) => state + 1);
      notificationQuery.refetch();
    });
    init();

    // return () => notificationApi.unsubscribeNotifications();
  }, []);

  return { unreadCount, readMutation, notificationQuery, readAllMutation };
};
