import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

import Login from '@pages/login/main'
import AppLayout from '@framework/layout/app-layout'

// 获取routes下面的所有的路由
const routers = []
const routeContext = require.context('./routes', false, /\.jsx$/)

routeContext.keys().forEach((key) => {
    const context = routeContext(key)
    const routes = context.default || context

    routers.push(...routes)
})

const rootRouters = [
    {
        path: '/',
        element: <Navigate to="/login" />,
    },
    {
        path: '/login',
        element: <Login />, // Helper.lazyLoad(React.lazy(() => import('@pages/login')))
        meta: {
            requireAuth: false,
            title: '登录页',
            key: 'login'
        }
    },
    {
        path: '/app',
        element: <AppLayout />,
        meta: {
            requireAuth: true,
            title: '',
            key: 'app',
        },
        children: [
            ...routers,
        ],
    },
    {
        path: '*',
        element: <Navigate to="/app/404" />,
    },
]

export default () => createBrowserRouter(rootRouters)
