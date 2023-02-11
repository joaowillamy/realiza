import { DecoratorFn } from '@storybook/react';
import React from 'react';

import { WrapperStorybook } from './WrapperStorybook';

export const decorators: DecoratorFn[] = [
  (story, context) => {
    return <WrapperStorybook>{story(context)}</WrapperStorybook>;
  },
];
