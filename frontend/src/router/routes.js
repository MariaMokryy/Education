import Login from "../pages/Login";
import About from "../pages/About";
import UnitsProgress from "../pages/employee/UnitsProgress";


// export const privateRoutes = [
//     {path: '/about', component: <About/>, exact: true},
//     {path: '/posts', component: <Posts/>, exact: true},
//     {path: '/posts/:id', component: <PostIdPage/>, exact: true},
//
// ]

export const employeeRoutes = [
    {path: '/about', component: <About/>, exact: true},
    {path: '/units', component: <UnitsProgress/>, exact: true}

]

export const supervisorRoutes = [
    {path: '/about', component: <About/>, exact: true}
]


export const publicRoutes = [
    {path: '/login', component: <Login/>, exact: true},
]