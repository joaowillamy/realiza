/* eslint-disable @typescript-eslint/no-empty-interface */
import '@emotion/react';

import chakraTheme from '@chakra-ui/theme';

declare module '@emotion/react' {
  export interface Theme extends chakraTheme {}
}
