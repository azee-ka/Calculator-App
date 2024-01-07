import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import PrivateRoute from './PrivateRoute';
import ErrorBoundary from './ErrorBoundary';
import { useAuthContext } from './utils/context/authentication';
import Layout from './struct/layout/layout';

import Access from './access/access';
import RegisterForm from './access/register/register';
import LoginForm from './access/login/login';

import Calculator from './app/calculator/calculator';

function AppContent() {
    const { authState } = useAuthContext();
    const [redirect, setRedirect] = useState(false);
    const [isAuthReady, setIsAuthReady] = useState(false);

    useEffect(() => {
        // Check if authentication state is ready
        setIsAuthReady(true);
    }, [authState]);

    const publicRoutes = [
        {
            name: 'Access',
            path: '/',
            element: (<Access />),
            key: 'Access',
        },
        {
            name: 'Access',
            path: '/access',
            element: (<Access />),
            key: 'Access-1',
        },
        {
            name: 'Login',
            path: '/access/login',
            element: (<LoginForm />),
            key: 'Login',
        },
        {
            name: 'Register',
            path: '/access/register',
            element: (<RegisterForm />),
            key: 'Register',
        },
    ]

    const privateRoutes = [
        {
            name: 'Calculator',
            path: '/',
            element: <Calculator />,
            key: 'Home',
        },
        {
            name: 'Calculator',
            path: '/calculator',
            element: <Calculator />,
            key: 'Calculator',
        },
        {
            name: 'Calculator',
            path: '/calculator/:expression',
            element: <Calculator />,
            key: 'Calculator-expression',
        }
    ]

    const routes = authState.isAuthenticated ? privateRoutes : publicRoutes;

    // useEffect(() => {
    //     // Check if the user is unauthenticated and trying to access a private route
    //     const isUnauthorizedAccess = !authState.isAuthenticated && privateRoutes.some(route => window.location.pathname.startsWith(route.path));

    //     // Only set redirect if the access is still unauthorized
    //     if (isUnauthorizedAccess) {
    //         setRedirect(true);
    //     } else {
    //         setRedirect(false);
    //     }
    // }, [authState.isAuthenticated, privateRoutes]);

    return (
        <ErrorBoundary>
            <div className='App'>
                <Router>
                {/* {(authState.isAuthenticated === false && privateRoutes.find((route) => route.path === window.location.pathname) !== undefined) && (
                        <Navigate to={'/access/login'} />
                    // ) : (
                    //     <Navigate to={'/calculator'} />
                    )} */}

                    <Routes>
                        {routes.map(({ path, element, pageName, key }) => (
                            <Route
                                key={key}
                                path={path}
                                element={
                                    <Layout
                                        key={key}
                                        className={`${path.substring(1)}`}
                                        pageName={pageName}
                                    >
                                        {element}
                                    </Layout>
                                }
                            />
                        ))}
                    </Routes>
                    {isAuthReady && !authState.isAuthenticated && (
                            // <Route
                            //     path="/access/login"
                                // element={
                                    <Navigate to={"/access/login"} />
                                // } // Redirect to the login page
                            // />
                        )}
                </Router>

            </div>
        </ErrorBoundary>

    );
}

export default AppContent;
