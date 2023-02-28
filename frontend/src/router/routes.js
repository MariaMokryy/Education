import Login from "../pages/Login";
import About from "../pages/About";
import EmployeeUnitsProgress from "../pages/employee/EmployeeUnitsProgress";
import SupervisorUnitsProgress from "../pages/supervisor/SupervisorUnitsProgress";


// export const privateRoutes = [
//     {path: '/about', component: <About/>, exact: true},
//     {path: '/posts', component: <Posts/>, exact: true},
//     {path: '/posts/:id', component: <PostIdPage/>, exact: true},
//
// ]

export const employeeRoutes = [
    {path: '/about', component: <About/>, exact: true},
    {path: '/units', component: <EmployeeUnitsProgress/>, exact: true}

]

export const supervisorRoutes = [
    {path: '/units', component: <SupervisorUnitsProgress/>, exact: true}
]


export const publicRoutes = [
    {path: '/login', component: <Login/>, exact: true},
]