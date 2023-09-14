import { useState } from 'react';
import MuiList from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import useMediaQuery from '@mui/material/useMediaQuery';

import Divider from '@mui/material/Divider';
import { TextField, Typography, useTheme } from '@mui/material';
import { useSearch } from '../hooks/use-search';
import Item from './Item';
import {
  Container,
  ListContainer,
  NotFoundContainer,
  SearchContainer,
  SectionTitle,
} from './styled';
import Skeleton from './Skeleton';
import isEmpty from 'lodash/isEmpty';

const List = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));

  const [searchText, setSearchText] = useState('');

  const { data, isLoading } = useSearch(searchText);

  const handleChangeSearch = (e) => setSearchText(e.target.value);

  const drawer = (
    <Container>
      <SearchContainer>
        <TextField
          size="small"
          fullWidth
          placeholder="Enter user name or email"
          onChange={handleChangeSearch}
        />
      </SearchContainer>
      <Divider component="div" />
      <ListContainer>
        {isLoading ? (
          <Skeleton />
        ) : (
          <MuiList disablePadding>
            {!isEmpty(data?.groups) && searchText && (
              <SectionTitle>
                <Typography variant="subtitle1">Chat</Typography>
              </SectionTitle>
            )}
            {data?.groups?.map((group) => (
              <Item
                name={group.name}
                unreadCount={group.unreadCount}
                receiverId={group.receiverId}
              />
            ))}
            {!isEmpty(data?.users) && searchText && (
              <SectionTitle>
                <Typography variant="subtitle1">Users</Typography>
              </SectionTitle>
            )}
            {data?.users?.map((user) => (
              <Item name={user.firstName} receiverId={user.id} />
            ))}
          </MuiList>
        )}

        {!isLoading && isEmpty(data?.groups) && isEmpty(data?.users) && searchText && (
          <NotFoundContainer>
            <Typography>No user or chat found</Typography>
          </NotFoundContainer>
        )}
      </ListContainer>
    </Container>
  );

  return <>{mobile ? <Drawer open={false}>{drawer}</Drawer> : <>{drawer}</>}</>;
};

export default List;
