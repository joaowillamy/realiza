import { DecoratorFn } from '@storybook/react';

import { WrapperStorybook } from '../../../../../.storybook/WrapperStorybook';

export const decorators: DecoratorFn[] = [
  (story, context) => {
    return <WrapperStorybook>{story(context)}</WrapperStorybook>;
  },
];
