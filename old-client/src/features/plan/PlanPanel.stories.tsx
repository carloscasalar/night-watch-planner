import {
  Story,
  Meta,
} from '@storybook/react/dist/ts3.9/client/preview/types-6-0';
import { RootState } from 'typesafe-actions';
import { PlanPanel } from './PlanPanel';
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

type Planset = 'feasible';

const plans: Record<Planset, RootState> = {
  feasible: {
    ...testRootState,
    party: {
      order: ['gandalf', 'legolas', 'gimli', 'boromir'],
      characters: {
        gandalf: {
          id: 'gandalf',
          name: 'Gandalf',
          requiredSleepTime: 8 * 60,
        },
        legolas: {
          id: 'legolas',
          name: 'Legolas',
          requiredSleepTime: 4 * 60,
        },
        gimli: {
          id: 'gimli',
          name: 'Gimli',
          requiredSleepTime: 8 * 60,
        },
        boromir: {
          id: 'boromir',
          name: 'Boromir',
          requiredSleepTime: 8 * 60,
        },
      },
    },
    plan: {
      ...testRootState.plan,
      fetchState: 'loaded',
      totalTimeMinutes: 12 * 60,
      watchOrder: ['first', 'second', 'third', 'fourth'],
      watches: {
        first: {
          watchfulCharacters: ['legolas'],
          sleepingCharacters: ['gandalf', 'gimli', 'boromir'],
          minutesLength: 4 * 60,
        },
        second: {
          watchfulCharacters: ['boromir', 'gandalf'],
          sleepingCharacters: ['legolas', 'gimli'],
          minutesLength: 2 * 60,
        },
        third: {
          watchfulCharacters: ['gimli', 'gandalf'],
          sleepingCharacters: ['legolas', 'boromir'],
          minutesLength: 3 * 60,
        },
        fourth: {
          watchfulCharacters: ['legolas', 'boromir'],
          sleepingCharacters: ['gimli', 'gandalf'],
          minutesLength: 3 * 60,
        },
      },
    },
  },
};

interface PlanPanelLoadedProps {
  planset: Planset;
}

export const PlanPanelLoadedStory: Story<PlanPanelLoadedProps> = ({
  planset,
}) => {
  return (
    <TestAppWrapper state={plans[planset]}>
      <PlanPanel />
    </TestAppWrapper>
  );
};

PlanPanelLoadedStory.args = {
  planset: 'feasible',
};

PlanPanelLoadedStory.argTypes = {
  planset: {
    control: { type: 'radio', options: ['feasible'] },
  },
};
