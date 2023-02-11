import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { WrapperAuth } from './WrapperAuth';

const Story: ComponentMeta<typeof WrapperAuth> = {
  component: WrapperAuth,
  title: 'WrapperAuth',
};
export default Story;

const Template: ComponentStory<typeof WrapperAuth> = (args) => <WrapperAuth {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'title',
  describe: 'desc',
};
