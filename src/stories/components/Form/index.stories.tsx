import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useForm, FormProvider } from 'react-hook-form';
import { breakpoints } from '../../../core/generalStyle';
import InputBox from '../../../components/Form/InputBox';
import DayPickSelect from '../../../components/Form/DayPickSelect';
import Submit from '../../../components/Form/Submit';

const StyledForm = styled.form`
  display: flex;
  flex-direction:column;
  margin: auto;
  ${breakpoints('max-width', 'px', [
    { 1200: 800 },
    { 800: 600 },
    { 600: 400 },
    { 450: 300 }
  ])}
`;

const FormTest = ({ ...props }) => {
  const methods = useForm();
  const [avoidSubmit, setAvoidSubmit] = useState(true);
  const { formState, handleSubmit } = methods;

  useEffect(() => {
    console.log(formState.errors);
    if (Object.keys(formState.errors)?.length === 0) {
      setAvoidSubmit(false);
    } else {
      setAvoidSubmit(true);
    }
  }, [formState]);
  const onSubmit = (data: any) => console.log(data);
  return (
    <FormProvider {...methods} {...props}>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <InputBox
          name="text"
          labelText="Text box:"
          rules={{ required: true }}
          error={formState?.errors?.text}
          errorMessage="input format is not correct."
        />
        <DayPickSelect
          name="startDate"
          labelText="start date"
          placeHolderText="select date"
          error={formState?.errors?.startDate}
          errorMessage="input format is not correct."
          rules={{ required: true }}
        />
        <Submit disabled={avoidSubmit} value="submit" />
      </StyledForm>
    </FormProvider>
  );
};

export default {
  title: 'Components/Form',
  component: FormTest,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  }
} as ComponentMeta<typeof FormTest>;

const FormTestStory: ComponentStory<typeof FormTest> = (args) => (
  <FormTest {...args} />
);
export const form = FormTestStory.bind({});
