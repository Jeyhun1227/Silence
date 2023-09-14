import PropTypes from "prop-types";
import { useMemo } from "react";

import { CssBaseline } from "@mui/material";
import { createTheme, StyledEngineProvider, ThemeProvider as MUIThemeProvider } from "@mui/material/styles";

import palette from "./palette";
import typography from "./typography";
import shadows from "./shadows";
import customShadows from "./customShadows";
import componentsOverride from "./overrides";
import GlobalStyles from "./globalStyles";

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default function ThemeProvider({ children }) {
  const themeOptions = useMemo(
    () => ({
      palette: palette("light"),
      typography,
      shape: { borderRadius: 10 },
      shadows: shadows("light"),
      customShadows: customShadows("light"),
    }),
    []
  );

  const theme = createTheme(themeOptions);

  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
