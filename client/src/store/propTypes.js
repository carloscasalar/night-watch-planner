import PropTypes from 'prop-types';

export const characterType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  requiredSleepTime: PropTypes.number.isRequired,
});

export const charactersType = PropTypes.arrayOf(characterType);

export const partyType = PropTypes.shape({
  characters: charactersType.isRequired,
  isEmpty: PropTypes.bool.isRequired,
  names: PropTypes.arrayOf(PropTypes.string).isRequired,
});

export const uiType = PropTypes.shape({
  waitingForPlan: PropTypes.bool.isRequired,
});

export const configType = PropTypes.shape({
  maxTotalTimeSpent: PropTypes.number.isRequired,
});

export const forbiddenNamesType = PropTypes.arrayOf(PropTypes.string);
