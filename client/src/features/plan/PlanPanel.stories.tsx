import {
  Story,
  Meta,
} from '@storybook/react/dist/ts3.9/client/preview/types-6-0';
import { PlanPanel } from './PlanPanel';
import { RootState } from 'typesafe-actions';
import { testRootState } from '../../test/utils/testRootState';
import { TestAppWrapper } from '../../test/utils/TestAppWrapper';

const meta: Meta = {
  title: 'Features/PlanPanel',
  component: PlanPanel,
};

export default meta;

export const PlanPanelLoadingStory: Story = () => {
  const state: RootState = {
    ...testRootState,
    plan: {
      ...testRootState.plan,
      fetchState: 'loading',
    },
  };

  return (
    <TestAppWrapper state={state}>
      <PlanPanel />
    </TestAppWrapper>
  );
};

export const PlanPanelUnloadedStory: Story = () => {
  const state: RootState = {
    ...testRootState,
    plan: {
      ...testRootState.plan,
      fetchState: 'unloaded',
    },
  };

  return (
    <TestAppWrapper state={state}>
      <PlanPanel />
    </TestAppWrapper>
  );
};

interface PlanPanelErrorStoryProps {
  message: string;
}

export const PlanPanelErrorStory: Story<PlanPanelErrorStoryProps> = ({
  message,
}) => {
  const state: RootState = {
    ...testRootState,
    plan: {
      ...testRootState.plan,
      fetchState: 'error',
      message,
    },
  };

  return (
    <TestAppWrapper state={state}>
      <PlanPanel />
    </TestAppWrapper>
  );
};

PlanPanelErrorStory.args = {
  message: 'Some unexpected error',
};
