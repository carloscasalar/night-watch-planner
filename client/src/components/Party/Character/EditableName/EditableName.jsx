import React from 'react';
import './EditableName.less';

const editableName = (props) => {
    return (
        <div className="EditableName">
            {props.nameText}
        </div>
    );
};

export default editableName;