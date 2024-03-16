import React from 'react';

import classes from './Dialog.module.css';

const Dialog = (props) => {
    return (
        <div className={`${classes.dialog} ${props.className}`}>
            <h3>{props.titleText}</h3>
            <hr />
            <p>{props.selectedItem.title}</p>
            <button onClick={() => { props.onSelection(null) }}>Close</button>
        </div>
    );
};

export default Dialog;
