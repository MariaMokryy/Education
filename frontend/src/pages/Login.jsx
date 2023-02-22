import React, {useState} from 'react';
import AuthService from "../features/auth/auth.service";
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/auth/authSlice'
import {saveTokens} from "../features/_helpers_/commands";
import {USER_DATA_KEY, USER_LOGGED_IN_KEY} from "../features/_helpers_/constants";


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
        <div>
            <h1>Страница для логина</h1>
            <form onSubmit={login}>
                <input
                    type='text'
                    value={authData.login}
                    onChange={e => setAuthData({...authData, login: e.target.value})}
                    placeholder='Введите логин'/>

                <input
                    type='password'
                    value={authData.password}
                    onChange={e => setAuthData({...authData, password: e.target.value})}
                    placeholder='Введите пароль'/>
                <button>Войти</button>
            </form>
        </div>
    );
};

export default Login;