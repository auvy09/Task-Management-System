import { Navigate, createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Task from "../pages/Task";
import PrivetRoute from "./PrivetRoute";
import View from "../pages/View";
// const currentUser = false;
// const RequireAuth = ({ children }) => {
//     return currentUser ? (children) : <Navigate to='/login' />
// }

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <PrivetRoute><Home /></PrivetRoute>
            },
            {
                path: '/dashboard',
                element: <PrivetRoute><Dashboard /></PrivetRoute>
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
            {
                path: '/task',
                element: <PrivetRoute><Task /></PrivetRoute>
            },
            {
                path: '/view/:id',
                element: <PrivetRoute><View /></PrivetRoute>
            },
        ]
    }
])

export default router;