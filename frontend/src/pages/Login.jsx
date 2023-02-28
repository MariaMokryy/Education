import React, {useState} from 'react';
import AuthService from "../features/auth/auth.service";
import {useDispatch} from 'react-redux';
import {loginUser} from '../features/auth/authSlice'
import {saveTokens} from "../features/_helpers_/commands";
import {USER_DATA_KEY, USER_LOGGED_IN_KEY} from "../features/_helpers_/constants";
import ForwardButton from "../components/UI/button/ForwardButton";
import Input from "../components/UI/input/Input";


const Login = () => {
    const [authData, setAuthData] = useState({login: '', password: ''})
    const dispatch = useDispatch()

    const login = async event => {
        event.preventDefault()
        AuthService.login(authData.login, authData.password)
            .then(data => {
                saveTokens(data['access'], data['refresh'])
                localStorage.setItem(USER_DATA_KEY, JSON.stringify(data['user']))
                localStorage.setItem(USER_LOGGED_IN_KEY, "true")
                dispatch(loginUser(data['user']))
            })
    }

    return (
        <div className={"d-flex justify-content-center align-items-center container-100 flex-column"}>
            {/*<div className="container">*/}
            <h1 className={"text-light bold"}>Добро пожаловать!</h1>
            <div className={"col-lg-3 mt-4"}>
                <form onSubmit={login} className={"d-flex flex-column align-items-center w-100"}>
                    <Input
                        label={"Логин"}
                        id={"login"}
                        type='text'
                        value={authData.login}
                        onChange={e => setAuthData({...authData, login: e.target.value})}
                        placeholder='Введите логин'/>


                    <Input
                        type='password'
                        label={"Пароль"}
                        id="password"
                        value={authData.password}
                        onChange={e => setAuthData({...authData, password: e.target.value})}
                        placeholder='Введите пароль'
                    />
                    <div className="col-6 mt-5">
                        <ForwardButton className={"mt-3"} title={"Войти"}/>
                    </div>
                </form>
            </div>

            {/*</div>*/}

        </div>
    );
};

export default Login;