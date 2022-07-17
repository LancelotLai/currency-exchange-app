import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PopupContainer, PopupBackground } from '../../../components/Popup';
import { ErrorDescription } from '../../../components/Error';

const PopupTest = ({ text, turnContainerOn, ...props }: any) => (
  <PopupBackground {...props}>
    {turnContainerOn && (
    <PopupContainer>
      <ErrorDescription>
        {text}
      </ErrorDescription>
    </PopupContainer>
    )}
  </PopupBackground>
);

export default {
  title: 'Components/Popup',
  component: PopupTest,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
  argTypes: {
    text: {
      defaultValue: 'I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.',
      control: 'text'
    },
    turnContainerOn: {
      defaultValue: true,
      control: 'boolean'
    }
  }
} as ComponentMeta<typeof PopupTest>;

const PopupTestStory: ComponentStory<typeof PopupTest> = (args) => (
  <PopupTest {...args} />
);

export const popup = PopupTestStory.bind({});
