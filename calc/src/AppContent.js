import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import { useAuthContext } from './utils/context/authentication';
import Layout from './struct/layout/layout';

import Access from './access/access';
import RegisterForm from './access/register/register';
import LoginForm from './access/login/login';

function AppContent() {
    const { authState } = useAuthContext();

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
            key: 'Access',
        },
        {
            name: 'Login',
            path: '/access/login',
            element: (<LoginForm />),
            key: 'Login',
            hasSmallSidebar: false,
            hasLargeSidebar: false,
        },
        {
            name: 'Register',
            path: '/access/register',
            element: (<RegisterForm />),
            key: 'Register',
            hasSmallSidebar: false,
            hasLargeSidebar: false,
        },
    ]

    const privateRoutes = [
        
    ]

    const routes = publicRoutes;



    return (
        <div className='App'>
            <Router>
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
            </Router>
        </div>
    );
}

export default AppContent;
