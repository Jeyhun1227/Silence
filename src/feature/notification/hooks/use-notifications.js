import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import * as notificationApi from '@api/notification';
import { useUser } from 'feature/auth/context';

export const useNotifications = () => {
  const user = useUser();
  const notificationsQuery = useInfiniteQuery({
    queryKey: ['notifications'],
    queryFn: ({ pageParam }) => notificationApi.getNotifications(user.id, pageParam),
    select: (data) => ({ pages: data.pages.map((item) => ({ notifications: item.data })) }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  return notificationsQuery;
};

export const useRead = () => {
  const readMutation = useMutation({
    mutationFn: (id) => notificationApi.readNotification(id),
  });

  return readMutation;
};

