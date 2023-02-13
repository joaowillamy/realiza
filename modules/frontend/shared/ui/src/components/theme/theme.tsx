import { ChakraBaseProvider, extendBaseTheme } from '@chakra-ui/react';
import chakraTheme from '@chakra-ui/theme';
import React from 'react';

export type ThemeProps = {
  children: React.ReactNode;
};
type ChakraTheme = typeof chakraTheme;
const theme = extendBaseTheme({
  ...chakraTheme,
  components: { ...chakraTheme.components },
}) as ChakraTheme;

export interface BaseTheme {
  theme?: ChakraTheme;
}

export const Theme: React.FC<ThemeProps> = ({ children }) => {
  return <ChakraBaseProvider theme={theme}>{children}</ChakraBaseProvider>;
};

export default Theme;
