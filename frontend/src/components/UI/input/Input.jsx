import React from 'react';
import classes from "./Input.module.css";

const Input = ({...props}) => {
    return (
        <div className={["d-flex flex-column mt-2", props.className].join(" ")}>
            {props.label && <label className={classes.label} htmlFor={props.id}>{props.label}</label>}
            <input className={classes.myInput} {...props}/>
        </div>
    );
};

export default Input;