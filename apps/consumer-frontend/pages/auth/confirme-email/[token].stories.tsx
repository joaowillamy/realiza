import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ConfirmeEmail } from './[token]';

const Story: ComponentMeta<typeof ConfirmeEmail> = {
  component: ConfirmeEmail,
  title: 'ConfirmeEmail',
};
export default Story;

const Template: ComponentStory<typeof ConfirmeEmail> = (args) => <ConfirmeEmail {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
