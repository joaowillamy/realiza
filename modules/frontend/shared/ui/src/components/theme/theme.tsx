import { ChakraBaseProvider, extendBaseTheme } from '@chakra-ui/react'
import React from 'react';
import chakraTheme from '@chakra-ui/theme'

export type ThemeProps = {
  children: React.ReactNode;
}

const theme = extendBaseTheme({
  ...chakraTheme,
  components: { ...chakraTheme.components },
}) as typeof chakraTheme

export const Theme: React.FC<ThemeProps> = ({children}) => {
  return (
    <ChakraBaseProvider theme={theme}>
      {children}
    </ChakraBaseProvider>
  );
}

export default Theme;
