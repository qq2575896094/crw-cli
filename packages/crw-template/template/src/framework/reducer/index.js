import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    appLanguage: '', // 当前系统语言
    appTheme: '', // 当前系统主题
    appSlider: false, // 侧边栏
}

const reducers = {
    /**
     * 更新系统主题
     * @param state
     * @param action
     */
    updateTheme: (state, action) => ({
        ...state,
        appTheme: action.payload,
    }),

    /**
     * 更新系统语言
     * @param state
     * @param action
     */
    updateLanguage: (state, action) => ({
        ...state,
        appLanguage: action.payload,
    }),
    /**
     * 更新系统侧边栏
     * @param state
     * @param action
     * @returns {*&{appSlider}}
     */
    updateAppSlider: (state, action) => ({
        ...state,
        appSlider: action.payload
    })
}

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers,
})

export const globalAction = globalSlice.actions

export default globalSlice.reducer
