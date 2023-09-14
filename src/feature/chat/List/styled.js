import { styled } from '@mui/material';

export const Container = styled('div')`
  border-right: 1px solid;
  border-right-color: ${(props) => props.theme.palette.grey[200]};
  display: flex;
  flex-direction: column;
  min-width: 300px;
  height: 100%;

  ${(props) => props.theme.breakpoints.up('lg')} {
    min-width: 300px;
  }
`;
export const SearchContainer = styled('div')`
  padding: ${(props) => props.theme.spacing(2)};
`;
export const ListContainer = styled('div')`
  overflow-y: auto;
`;
export const SectionTitle = styled('div')`
  padding: ${(props) => props.theme.spacing(1, 2)};
  background-color: ${(props) => props.theme.palette.grey[200]};
`;

export const NotFoundContainer = styled('div')`
  padding: ${(props) => props.theme.spacing(5, 2)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UnreadLabel = styled('div')`
  font-size: 10px;
  background-color: ${(props) => props.theme.palette.primary.main};
  border-radius: 20px;
  font-weight: 500;
  color: #ffffff;
  display: flex;
  padding: 2px 4px;
  min-width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
`;
