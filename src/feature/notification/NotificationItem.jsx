import {
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@mui/material';
import { CustomAvatar } from 'components/custom-avatar';
import notificationType from 'constants/notification-type';
import { formatToNow } from 'utils/date-formatter';
import config from '@config/index';
import { useRouter } from 'next/router';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { AvatarContainer, Indicator } from './styled';

const NotificationItem = ({ notification, onRead }) => {
  const { type, read, url, createdAt, notifier } = notification;

  const router = useRouter();

  const handleClick = () => {
    onRead(notification.id);
    router.push(url || '#');
  };

  return (
    <ListItemButton sx={{ py: 1 }} onClick={handleClick}>
      <ListItemAvatar>{getAvatar(type, notifier)}</ListItemAvatar>
      <ListItemText
        disableTypography
        primary={formatNotification(type, notifier)}
        secondary={
          <Typography variant="caption" color="text.secondary">
            {formatToNow(createdAt)}
          </Typography>
        }
      />
      {!read && (
        <ListItemSecondaryAction>
          <Indicator />
        </ListItemSecondaryAction>
      )}
    </ListItemButton>
  );
};

export default NotificationItem;

const getAvatar = (type, notifier) => {
  if (type === notificationType.NEW_LIVE_STREAM) {
    return (
      <AvatarContainer>
        <OndemandVideoIcon sx={{ color: '#ffffff' }} />
      </AvatarContainer>
    );
  }
  else {
    return (
      <CustomAvatar
        name={notifier?.firstName}
        src={notifier?.avatar && `${config.avatarBaseUrl}${notifier.avatar}`}
        alt="avatar"
      />
    );
  }
};

const formatNotification = (type, notifier) => {
  if (type === notificationType.MENTION_IN_COMMENT) {
    return (
      <Typography variant="body2">
        <Typography component="span" variant="body2" fontWeight={600}>
          {notifier.firstName} {notifier.lastName}
        </Typography>
        &nbsp;mention you in a comment
      </Typography>
    );
  } else if (type === notificationType.MENTION_IN_POST) {
    return (
      <Typography variant="body2">
        <Typography component="span" variant="body2" fontWeight={600}>
          {notifier.firstName} {notifier.lastName}
        </Typography>
        &nbsp;mention you in a post
      </Typography>
    );
  } else if (type === notificationType.NEW_LIVE_STREAM) {
    return (
      <Typography variant="body2">
        New&nbsp;
        <Typography component="span" variant="body2" fontWeight={600}>
          Live stream
        </Typography>
        &nbsp;is added
      </Typography>
    );
  } else if (type === notificationType.COMMENT_OWN_POST) {
    return (
      <Typography variant="body2">
        <Typography component="span" variant="body2" fontWeight={600}>
          {notifier.firstName} {notifier.lastName}
        </Typography>
        &nbsp; commented on your post
      </Typography>
    );
  } else if (type === notificationType.INVITE_TO_GROUP) {
    return (
      <Typography variant="body2">
        <Typography component="span" variant="body2" fontWeight={600}>
          {notifier.firstName} {notifier.lastName}
        </Typography>
        &nbsp; has invited you to a private group
      </Typography>
    );
  }
};
