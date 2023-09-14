import { Divider, IconButton, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import GroupIcon from '@mui/icons-material/Group';
import { ChatContainer, EmptyContainer, Header } from './styled';
import dynamic from 'next/dynamic';
const ChatItem = dynamic(() => import('./ChatItem'));
const NewMessage = dynamic(() => import('./NewMessage'));
const HeaderSkeleton = dynamic(() => import('./Skeleton'), {ssr: false});
import { useResponsive } from 'hooks/useResponsive';
import { useMessages } from '../hooks/use-messages';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useUser } from 'feature/auth/context';
import { CustomAvatar } from 'components/custom-avatar';
import { useRouter } from 'next/router';
import get from 'lodash/get';
import config from '@config/index';

const ChatWindow = () => {
  const { mobile } = useResponsive();
  const router = useRouter();

  const type = get(router, 'query.query[0]');
  const id = get(router, 'query.query[1]');

  const user = useUser();

  const { messages, pagination, loadNext, chatGroup } = useMessages(type, id);

  console.log("chat group data: ", chatGroup?.data);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      {!id && (
        <EmptyContainer>
          <Typography variant="h5" color="text.secondary">
            Select a chat to continue
          </Typography>
        </EmptyContainer>
      )}

      {id && (
        <>
          <Header>
            {chatGroup.isLoading ? (
              <HeaderSkeleton />
            ) : (
              <Stack direction="row" spacing={2} alignItems="center">
                <CustomAvatar
                  name={chatGroup.data?.name}
                  src={chatGroup.data?.avatar && `${config.avatarBaseUrl}${chatGroup.data?.avatar}`}
                />
                <Typography variant="subtitle2">{chatGroup.data?.name}</Typography>
              </Stack>
            )}
            {mobile && (
              <IconButton>
                <GroupIcon />
              </IconButton>
            )}
          </Header>
          <ChatContainer id="chat-container">
            <InfiniteScroll
              scrollableTarget="chat-container"
              next={loadNext}
              style={{ display: 'flex', flexDirection: 'column-reverse' }}
              inverse={true}
              hasMore={pagination.totalPages > pagination.currentPage}
              scrollThreshold={'20px'}
              dataLength={messages.length}
            >
              {messages?.map((message) => (
                <ChatItem
                  key={message.id}
                  name={message.user?.firstName}
                  avatar={message.user?.avatar}
                  content={message.content}
                  time="8 hours ago"
                  guest={message.user?.id !== user.id}
                  media={message.media}
                />
              ))}
            </InfiniteScroll>
          </ChatContainer>
          <Divider />
          <NewMessage chatGroupId={chatGroup.data?.id} userId={user.id} />
        </>
      )}
    </Box>
  );
};

export default ChatWindow;
