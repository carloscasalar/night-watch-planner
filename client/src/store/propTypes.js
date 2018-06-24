import PropTypes from 'prop-types';

export const characterType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  requiredSleepTime: PropTypes.number.isRequired,
});

export const partyType = PropTypes.shape({
  characters: PropTypes.arrayOf(characterType).isRequired,
  isEmpty: PropTypes.bool.isRequired,
  names: PropTypes.arrayOf(PropTypes.string).isRequired,
});

export const forbiddenNamesType = PropTypes.arrayOf(PropTypes.string);
