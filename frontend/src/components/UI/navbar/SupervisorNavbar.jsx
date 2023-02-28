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
import DropdownButton from "../button/DropdownButton";

import {faChartColumn, faMoneyBill1, faHippo} from "@fortawesome/free-solid-svg-icons";

const SupervisorNavbar = () => {
    const navigate = useNavigate();
    const options = [
        {showing: 'courses', title: 'По курсам', icon: faMoneyBill1},
        {showing: 'modules', title: 'По модулям', icon: faChartColumn},
        {showing: 'somethingElse', title: 'По ещё чему-то', icon: faHippo}
    ]

    const dispatch = useDispatch()


    const logout = async event => {
        AuthService.logout()
            .then(data => {
                dispatch(logoutUser())
            })
    }

    return (
        <div
            className={["d-flex flex-row align-items-center justify-content-between w-100", classes.navbar].join(" ")}
            // style={{backdropFilter: "blur(2px)"}}
        >
            <div className={"col-1"}>
                <img className={classes.logo} src={logo}/>
            </div>

            <div className={[classes.navbar__links, "col-10 d-flex justify-content-center"].join(" ")}>
                <div className="col-2">
                    <DropdownButton
                        options={options}
                    />
                </div>

                    <Link to={"/units"}>
                        <NavButton button={{title: 'По технике', path: '/about'}}/>
                    </Link>
            </div>

            <div className={"col-1 d-flex justify-content-end pe-2"}>
                <button onClick={logout} className={classes.logout__btn}>
                    <img className={classes.logout__img} src={logoutImg}/>
                </button>
            </div>

        </div>
    );
};

export default SupervisorNavbar;