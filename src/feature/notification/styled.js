import { styled } from '@mui/material';

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
