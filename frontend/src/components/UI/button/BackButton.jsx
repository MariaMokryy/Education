import React from 'react';
import classes from "./Buttons.module.css";
import arrow from "../../../images/arrow.svg";

const BackButton = ({children, ...props}) => {
    return (
        <button {...props} className={[classes.backButton, "d-flex justify-content-center align-items-center pe-2 m-0"].join(' ')}>
            <img className={classes.leftArrow} src={arrow}/>
        </button>
    );
};

export default BackButton;