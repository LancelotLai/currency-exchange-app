import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ErrorButton } from '../../../../components/Error';

const ErrorButtonTest = ({ text, ...props }:any) => (
  <ErrorButton {...props}>
    {text}
  </ErrorButton>
);

export default {
  title: 'Components/Error/ErrorButton',
  component: ErrorButtonTest,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  }
} as ComponentMeta<typeof ErrorButtonTest>;

const ErrorButtonStory: ComponentStory<typeof ErrorButtonTest> = (args) => (
  <ErrorButtonTest {...args} />
);
export const errorButton = ErrorButtonStory.bind({});

errorButton.args = {
  text: 'Back to home'
};
