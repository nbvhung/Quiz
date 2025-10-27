import Login from "../pages/Login";
import LayoutDefault from "../Layout/LayoutDefault";
import Home from "../pages/Home";
import Register from "../pages/Register";
import PrivateRoutes from "../components/PrivateRoutes";
import Answers from "../pages/Answers";
import Quiz from "../pages/Quiz";
import Result from "../pages/Result";
import Topic from "../pages/Topic";
import Error404 from "../pages/Error404";

export const routes = [
    {
        path: '/',
        element: <LayoutDefault />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            },
            {
                element: <PrivateRoutes />,
                children: [
                    {
                        path: 'answers',
                        element: <Answers />
                    },
                    {
                        path: 'quiz',
                        element: <Quiz />
                    },
                    {
                        path: 'result',
                        element: <Result />
                    },
                    {
                        path: 'topic',
                        element: <Topic />
                    }
                ]
            },
            {
                path: '*',
                element: <Error404 />
            }
        ]
    }
];