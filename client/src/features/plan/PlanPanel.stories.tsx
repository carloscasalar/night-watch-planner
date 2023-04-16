import {
  type StoryObj,
  type Meta
} from '@storybook/react'
import { type FC } from 'react'

import { PlanPanel } from './PlanPanel'
import { type RootState } from '../../app/store/rootStore'
import { testRootState } from '../../test/testRootState'
import { TestAppWrapper } from '../../test/TestAppWrapper'

const meta: Meta = {
  title: 'Features/PlanPanel',
  component: PlanPanel
}
export default meta

const PlanPanelLoadingTemplate: FC = () => <PlanPanel />
type PlanetLoadingStory = StoryObj<typeof PlanPanelLoadingTemplate>
const loadingState: RootState = {
  ...testRootState,
  plan: {
    ...testRootState.plan,
    fetchState: 'loading'
  }
}
export const PlanPanelLoading: PlanetLoadingStory = {
  decorators: [
    (story) => <TestAppWrapper state={loadingState}>{story()}</TestAppWrapper>
  ]
}

const PlanPanelUnloadedTemplate: FC = () => <PlanPanel />
type PlanetUnloadedStory = StoryObj<typeof PlanPanelUnloadedTemplate>
const unloadedState: RootState = {
  ...testRootState,
  plan: {
    ...testRootState.plan,
    fetchState: 'unloaded'
  }
}
export const PlanPanelUnloaded: PlanetUnloadedStory = {
  decorators: [
    (story) => <TestAppWrapper state={unloadedState}>{story()}</TestAppWrapper>
  ]
}

const PlanPanelErrorTemplate: FC<{ message: string }> = ({ message }) => {
  const errorState: RootState = {
    ...testRootState,
    plan: {
      ...testRootState.plan,
      fetchState: 'error',
      message
    }
  }
  return <TestAppWrapper state={errorState}><PlanPanel /></TestAppWrapper>
}
type PlanetErrorStory = StoryObj<typeof PlanPanelErrorTemplate>
export const PlanPanelError: PlanetErrorStory = {
  render: ({ message }) => <PlanPanelErrorTemplate message={message} />,
  args: {
    message: 'Some unexpected error'
  }
}

type Planset = 'feasible'

const plans: Record<Planset, RootState> = {
  feasible: {
    ...testRootState,
    party: {
      order: ['gandalf', 'legolas', 'gimli', 'boromir'],
      characters: {
        gandalf: {
          id: 'gandalf',
          name: 'Gandalf',
          requiredSleepTime: 8 * 60
        },
        legolas: {
          id: 'legolas',
          name: 'Legolas',
          requiredSleepTime: 4 * 60
        },
        gimli: {
          id: 'gimli',
          name: 'Gimli',
          requiredSleepTime: 8 * 60
        },
        boromir: {
          id: 'boromir',
          name: 'Boromir',
          requiredSleepTime: 8 * 60
        }
      }
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
          minutesLength: 4 * 60
        },
        second: {
          watchfulCharacters: ['boromir', 'gandalf'],
          sleepingCharacters: ['legolas', 'gimli'],
          minutesLength: 2 * 60
        },
        third: {
          watchfulCharacters: ['gimli', 'gandalf'],
          sleepingCharacters: ['legolas', 'boromir'],
          minutesLength: 3 * 60
        },
        fourth: {
          watchfulCharacters: ['legolas', 'boromir'],
          sleepingCharacters: ['gimli', 'gandalf'],
          minutesLength: 3 * 60
        }
      }
    }
  }
}

interface PlanPanelLoadedProps {
  planset: Planset
}

const PlanPanelLoadedTemplate: FC<PlanPanelLoadedProps> = ({ planset }) => {
  const loadedState: RootState = plans[planset]
  return <TestAppWrapper state={loadedState}><PlanPanel /></TestAppWrapper>
}
type PlanetLoadedStory = StoryObj<typeof PlanPanelLoadedTemplate>
export const PlanPanelLoaded: PlanetLoadedStory = {
  render: ({ planset }) => <PlanPanelLoadedTemplate planset={planset} />,
  args: {
    planset: 'feasible'
  },
  argTypes: {
    planset: {
      control: {
        options: Object.keys(plans)
      }
    }
  }
}
