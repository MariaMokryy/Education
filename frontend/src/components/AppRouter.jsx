import React from 'react';
import {Route} from "react-router-dom";
import {Navigate, Routes} from 'react-router';
import {employeeRoutes, publicRoutes} from "../router/routes";
import {selectLoggedIn} from '../features/auth/authSlice'
import {useSelector} from "react-redux";

const AppRouter = () => {

    const isLoggedIn = useSelector(selectLoggedIn)

    return (
        isLoggedIn
            ?
            <Routes>
                {employeeRoutes.map(route =>
                    <Route
                        key={route.path}
                        path={route.path}
                        element={route.component}
                        exact={route.exact}
                    />
                )}
                <Route path='*' element={<Navigate to='/units' />} />
            </Routes>

            :

            <Routes>
                {publicRoutes.map(route =>
                    <Route
                        key={route.path}
                        path={route.path}
                        element={route.component}
                        exact={route.exact}
                    />
                )}
                <Route path='*' element={<Navigate to='/login' />} />
            </Routes>
    );
};

export default AppRouter;