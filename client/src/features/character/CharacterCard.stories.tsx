import { CharacterCard } from './CharacterCard';
import {
  Story,
  Meta,
} from '@storybook/react/dist/ts3.9/client/preview/types-6-0';
import { testRootState } from '../../test/utils/testRootState';
import { RootState } from 'typesafe-actions';
import { TestAppWrapper } from '../../test/utils/TestAppWrapper';

const meta: Meta = {
  title: 'Features/CharacterCard',
  component: CharacterCard,
  argTypes: {
    characterId: { control: { type: null } },
  },
};

export default meta;

interface CharacterCardStoriesProp {
  name: string;
  requiredSleepTime: number;
}

export const CharacterCardStory: Story<CharacterCardStoriesProp> = ({
  name,
  requiredSleepTime,
}) => {
  const state: RootState = {
    ...testRootState,
    party: {
      characters: {
        'character-id': {
          id: 'character-id',
          name,
          requiredSleepTime,
        },
      },
      order: ['character-id'],
    },
  };

  return (
    <TestAppWrapper state={state}>
      <CharacterCard characterId="character-id" />
    </TestAppWrapper>
  );
};

CharacterCardStory.args = {
  name: 'Frodo',
  requiredSleepTime: 6 * 60,
};

CharacterCardStory.argTypes = {
  requiredSleepTime: {
    control: { type: 'range', min: 0, max: 720, step: 30 },
  },
};
