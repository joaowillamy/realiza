/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-interface */
import '@emotion/react';

import { Theme as CustomTheme } from '@chakra-ui/react';

declare module '@emotion/react' {
  export interface Theme extends CustomTheme {}
}
