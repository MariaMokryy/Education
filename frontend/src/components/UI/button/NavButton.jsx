import React from 'react';
import classes from './Buttons.module.css'

const NavButton = (props) => {

    return (
        <button className={classes.navigation__btn}>
            <p className="p-0 m-0 h5">{props.button.title}</p>
        </button>
    );
};

export default NavButton;