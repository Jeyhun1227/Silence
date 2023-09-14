import { useTheme, useMediaQuery } from "@mui/material";

export const useResponsive = () => {
  const theme = useTheme();
  const tab = useMediaQuery(theme.breakpoints.down("lg"), { noSsr: true });
  const mobile = useMediaQuery(theme.breakpoints.down("md"), { noSsr: true });

  return { mobile, tab };
};
