import React from 'react';
import classes from './Buttons.module.css'
import arrow from './../../../images/arrow.svg'

const ForwardButton = ({title, ...props}) => {
    return (
        <button {...props} className={[classes.forwardButton, props.className].join(" ")}>
            {title}
            <img className={classes.rightArrow} src={arrow}/>
        </button>
    );
};

export default ForwardButton;