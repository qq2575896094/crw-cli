import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token: '',
    username: '',
    avatar: '',
    type: '',
    phoneNumber: '',
    realName: '',
    gender: '',
    age: 0,
}

const reducers = {
    /**
     * 更新用户信息
     * @param state
     * @param action
     */
    updateUserInfo: (state, action) => ({
        ...state,
        ...action.payload,
    }),
}

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers,
})

export const userInfoAction = userInfoSlice.actions

export default userInfoSlice
