import React, {useContext} from 'react';
import {Link, useNavigate} from "react-router-dom";
import classes from './Navbar.module.css'
import logoutImg from './../../../images/logout.svg'
import logo from './../../../images/logo.svg'
import NavButton from "../button/NavButton";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser, selectLoggedIn, selectUserData} from "../../../features/auth/authSlice";
import AuthService from "../../../features/auth/auth.service";
import {saveTokens} from "../../../features/_helpers_/commands";
import {USER_DATA_KEY, USER_LOGGED_IN_KEY} from "../../../features/_helpers_/constants";

const Navbar = () => {
    const navigate = useNavigate();
    const buttons = [
        {title: 'По модулям', path: '/units'},
        {title: 'По технике', path: '/about'}
    ]

    const dispatch = useDispatch()


    const logout = async event => {
        AuthService.logout()
            .then(data => {
                dispatch(logoutUser())
            })
    }

    return (
        <div className={["d-flex flex-row align-items-center justify-content-between w-100 sticky-top", classes.navbar].join(" ")}>
            <div className={"col-1"}>
                <img className={classes.logo} src={logo}/>
            </div>

            <div className={[classes.navbar__links, "col-10 d-flex justify-content-center"].join(" ")}>
                {buttons.map(button =>
                    <Link to={button.path} key={button.title}>
                        <NavButton button={button}/>
                    </Link>
                )}
            </div>

            <div className={"col-1"}>
                <button onClick={logout} className={classes.logout__btn}>
                    <img className={classes.logout__img} src={logoutImg}/>
                </button>
            </div>

        </div>
    );
};

export default Navbar;