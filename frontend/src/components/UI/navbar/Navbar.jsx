import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import classes from './Navbar.module.css'
import logoutImg from './../../../images/logout.svg'
import logo from './../../../images/logo.svg'
import NavButton from "../button/NavButton";

const Navbar = () => {

    const buttons = [
        {title: 'По модулям', path: '/units'},
        {title: 'По технике', path: '/about'}
    ]

    return (
        <div className={[classes.navbar, "d-flex align-items-center justify-content-between w-100"].join(" ")}>
            <img className={classes.logo} src={logo}/>

            <div className={classes.navbar__links}>
                {buttons.map(button =>
                    <Link to={button.path} key={button.title}>
                        <NavButton button={button}/>
                    </Link>
                )}
            </div>

            <button className={classes.logout__btn}>
                <img className={classes.logout__img} src={logoutImg}/>
            </button>
        </div>
    );
};

export default Navbar;