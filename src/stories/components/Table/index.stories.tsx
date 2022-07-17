import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  StyledTh, StyledTd, StyledTr, StyledTable
} from '../../../components/Table';

const TableTest = ({
  text, trElementCount, tdElementCount, ...props
}: any) => (
  <StyledTable {...props}>
    <thead>
      <StyledTr>
        <StyledTh colSpan={Math.max(tdElementCount)}>
          {text || ''}
        </StyledTh>
      </StyledTr>
    </thead>
    <tbody>
      {+trElementCount > 0 && [...Array(trElementCount)].map((v) => (
        <StyledTr key={`trElementCount: ${v}`}>
          {+tdElementCount > 0 && [...Array(tdElementCount)].map((vv) => (
            <StyledTd key={`tdElementCount: ${vv}`}>
              {text}
            </StyledTd>
          ))}
        </StyledTr>
      ))}
    </tbody>
  </StyledTable>
);

export default {
  title: 'Components/Table',
  component: TableTest,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
  argTypes: {
    text: {
      defaultValue: 'I am texting the description.',
      control: 'text'
    },
    trElementCount: {
      defaultValue: 1,
      control: {
        type: 'number'
      }
    },
    tdElementCount: {
      defaultValue: 1,
      control: {
        type: 'number'
      }
    }
  }
} as ComponentMeta<typeof TableTest>;

const TableTestStory: ComponentStory<typeof TableTest> = (args) => (
  <TableTest {...args} />
);
export const table = TableTestStory.bind({});
