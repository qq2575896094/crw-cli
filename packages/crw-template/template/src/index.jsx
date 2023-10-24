import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import AppRoot from '@framework/layout/app-root'

import store from '@framework/store'

import './css/index.scss'

createRoot(document.getElementById('root'))
    .render(
        <React.StrictMode>
            <Provider store={store}>
                <AppRoot />
            </Provider>
        </React.StrictMode>,
    )
