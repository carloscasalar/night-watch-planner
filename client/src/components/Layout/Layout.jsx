import React from 'react';
import PropTypes from 'prop-types';
import './Layout.less';

const layout = props => (
  <main className="Content">
    {props.children}
  </main>
);

layout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default layout;
