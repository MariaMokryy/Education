import React from 'react';
import {Route} from "react-router-dom";
import {Navigate, Routes} from 'react-router';
import {employeeRoutes, publicRoutes, supervisorRoutes} from "../router/routes";
import {selectLoggedIn, selectUserData} from '../features/auth/authSlice'
import {useSelector} from "react-redux";

const AppRouter = () => {

    const isLoggedIn = useSelector(selectLoggedIn)
    const role = useSelector(selectUserData).role

    return (
        isLoggedIn
            ?

            <Routes>
                {['admin', 'supervisor'].includes(role) ?
                    supervisorRoutes.map(route =>
                        <Route
                            key={route.path}
                            path={route.path}
                            element={route.component}
                            exact={route.exact}
                        />)
                    :
                    employeeRoutes.map(route =>
                            <Route
                                key={route.path}
                                path={route.path}
                                element={route.component}
                                exact={route.exact}
                            />
                    )
                }

                <Route path='*' element={<Navigate to='/units'/>}/>
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

                <Route path='*' element={<Navigate to='/login'/>}/>
            </Routes>
    );
};

export default AppRouter;