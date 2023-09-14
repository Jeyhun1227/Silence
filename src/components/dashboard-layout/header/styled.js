import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material';

export const ToolBar = styled(Toolbar)``;
export const Search = styled('div')`
  display: flex;
  align-items: center;
  padding: ${(props) => props.theme.spacing(1)};
  flex-grow: 1;
  border-radius: ${(props) => `${props.theme.shape.borderRadius}px`};
`;

export const Indicator = styled('div')`
  height: 10px;
  width: 10px;
  background-color: ${(props) => props.theme.palette.primary.main};
  border-radius: 5px;
`;

export const AvatarContainer = styled('div')`
  height: 40px;
  width: 40px;
  background-color: ${(props) => props.theme.palette.primary.main};
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
