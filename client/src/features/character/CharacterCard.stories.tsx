import { type StoryObj, type Meta } from '@storybook/react'
import { type FC } from 'react'

import { CharacterCard } from './CharacterCard'
import { type RootState } from '../../app/store/rootStore'
import { testRootState } from '../../test/testRootState'
import { TestAppWrapper } from '../../test/TestAppWrapper'

interface CharacterCardStoriesProp {
  name: string
  requiredSleepTime: number
}

const CharacterCardTemplate: FC<CharacterCardStoriesProp> = ({
  name,
  requiredSleepTime
}) => {
  const state: RootState = {
    ...testRootState,
    party: {
      characters: {
        'character-id': {
          id: 'character-id',
          name,
          requiredSleepTime
        }
      },
      order: ['character-id']
    }
  }
  return (
    <TestAppWrapper state={state}>
      <CharacterCard characterId="character-id" />
    </TestAppWrapper>
  )
}

const meta = {
  title: 'Features/CharacterCard',
  component: CharacterCardTemplate,
  argTypes: {
    requiredSleepTime: {
      control: { type: 'range', min: 0, max: 720, step: 30 }
    }
  }
} satisfies Meta<typeof CharacterCardTemplate>
export default meta

type Story = StoryObj<typeof CharacterCardTemplate>
export const CharacterCardStory: Story = {
  render: ({ name, requiredSleepTime }) => (
    <CharacterCardTemplate
      name={name}
      requiredSleepTime={requiredSleepTime}
    />
  ),
  args: {
    name: 'Frodo',
    requiredSleepTime: 6 * 60
  }
}
