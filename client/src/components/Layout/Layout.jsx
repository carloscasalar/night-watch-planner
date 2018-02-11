import React from 'react';
import './Layout.less';

const layout = (props) => (
    <main className="Content">
        {props.children}
    </main>
);

export default layout;