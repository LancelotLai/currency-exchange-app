import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ErrorDescription } from '../../../../components/Error';

const ErrorDescriptionTest = ({ text, ...props }:any) => (
  <ErrorDescription {...props}>
    {text}
  </ErrorDescription>
);

export default {
  title: 'Components/Error/ErrorDescription',
  component: ErrorDescriptionTest,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  }
} as ComponentMeta<typeof ErrorDescriptionTest>;

const ErrorDescriptionStory: ComponentStory<typeof ErrorDescriptionTest> = (args) => (
  <ErrorDescriptionTest {...args} />
);

export const errorDescription = ErrorDescriptionStory.bind({});
errorDescription.args = {
  text: 'I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.I am texting the description. I am texting the description.',
};
