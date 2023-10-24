import { configureStore, combineReducers } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import globalReducer from '../reducer'

const round = (num) => Math.round(num * 100) / 100

const monitorReducerEnhancer = (createStore) => (reducer, initialState, enhancer) => {
    const monitoredReducer = (state, action) => {
        const start = performance.now()
        const newState = reducer(state, action)
        const end = performance.now()

        const diff = round(end - start)

        console.log(`${action.type} process time: ${diff}ms`)

        return newState
    }

    return createStore(monitoredReducer, initialState, enhancer)
}

const isProd = process.env.NODE_ENV === 'production'

const importAllReducer = () => {
    const reducers = {}
    const requireContext = require.context('@pages', true, /([a-zA-Z]+)\/reducer\/index\.js$/)
    requireContext.keys().forEach((key) => {
        const context = requireContext(key)

        const { name, reducer } = context.default

        reducers[name] = reducer
    })

    return reducers
}

const reducers = importAllReducer()

export default configureStore({
    reducer: combineReducers({
        ...reducers,
        global: globalReducer,
    }),
    devTools: !isProd,
    enhancers: [monitorReducerEnhancer],
    middleware: (getDefaultMiddleware) => {
        if (isProd) return getDefaultMiddleware()
        return getDefaultMiddleware().concat(logger)
    },
})
