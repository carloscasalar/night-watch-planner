import { FC, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFormattedCharacter } from './getFormattedCharacter';
import { RootState } from '../../app/store/rootStore';
import { Icon } from '../../common/components/icon/Icon';
import { increaseCharacterSleepTimeAction } from './increaseCharacterSleepTimeAction';
import { CounterControl } from '../../common/components/counterControl/CounterControl';
import { updateCharacterNameAction } from './updateCharacterNameAction';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

const MINUTES_INCREMENT = 30;

export interface CharacterCardProps {
  characterId: string;
}

export const CharacterCard: FC<CharacterCardProps> = ({ characterId }) => {
  const dispatch = useDispatch();
  const character = useSelector((state: RootState) =>
    getFormattedCharacter(state, characterId),
  );

  const increaseSleepTime = () =>
    dispatch(
      increaseCharacterSleepTimeAction({
        characterId,
        minutes: MINUTES_INCREMENT,
      }),
    );

  const decreaseSleepTime = () =>
    dispatch(
      increaseCharacterSleepTimeAction({
        characterId,
        minutes: -MINUTES_INCREMENT,
      }),
    );

  const domParser = useMemo(() => new DOMParser(), []);

  const handleCharacterNameChange = ({
    target: { value },
  }: ContentEditableEvent) => {
    const doc = domParser.parseFromString(value, 'text/html');
    const name = doc.body.textContent || '';

    dispatch(
      updateCharacterNameAction({
        characterId,
        name,
      }),
    );
  };

  return (
    character && (
      <div className="flex items-center border-gray-200 border p-4 rounded-lg shadow-lg">
        <Icon
          name="barbarian"
          className="w-16 h-16 rounded-full mr-4 text-black"
        />
        <div className="flex-grow">
          <ContentEditable
            html={character?.name}
            tagName="h2"
            className="text-gray-900 title-font font-medium text-xl cursor-text"
            onChange={handleCharacterNameChange}
          />
          <div className="flex items-center space-x-4 text-gray-700 text-lg">
            <CounterControl
              icon="sleep-time"
              size="small"
              label="Sleep time"
              value={character?.requiredSleepTime}
              increase={increaseSleepTime}
              decrease={decreaseSleepTime}
            />
          </div>
        </div>
      </div>
    )
  );
};
