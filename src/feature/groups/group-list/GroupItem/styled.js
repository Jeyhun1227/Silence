import { Card, styled } from "@mui/material";

export const Container = styled(Card)`
  padding: ${(props) => props.theme.spacing(3, 5, 3, 3)};
  width: 100%;
  margin-bottom: ${(props) => props.theme.spacing(2)};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${(props) => props.theme.breakpoints.down("md")} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    > *:not(:last-child) {
      margin-bottom: ${(props) => props.theme.spacing(3)};
    }
  }
`;

export const DetailsContainer = styled("div")`
  display: flex;
  align-items: center;
  > *:not(:last-child) {
    margin-right: ${(props) => props.theme.spacing(10)};
  }

  ${(props) => props.theme.breakpoints.down("md")} {
    flex-direction: column;
    align-items: flex-start;

    > *:not(:last-child) {
      margin-bottom: ${(props) => props.theme.spacing(2)};
    }
  }
`;
export const UserContainer = styled("div")`
  display: flex;
  align-items: center;
  > *:not(:last-child) {
    margin-right: ${(props) => props.theme.spacing(2)};
  }

  ${(props) => props.theme.breakpoints.down("md")} {
    flex-direction: column;
    align-items: flex-start;
    > *:not(:last-child) {
      margin-bottom: ${(props) => props.theme.spacing(1)};
    }
  }
`;
