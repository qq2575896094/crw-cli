import { createAsyncThunk } from '@reduxjs/toolkit'
import OkHttp from '@/okHttp'
import { userInfoAction } from '../reducer'

const urlPrefix = '/user'

const urlMap = {
    login: `${urlPrefix}/login`,
    getUserInfo: `${urlPrefix}/getUserInfo`,
}

const typePrefix = (url) => `${url}/action`.slice(1).replaceAll('/', '_').toUpperCase()

export const loginAction = createAsyncThunk(
    typePrefix(urlMap.login),
    async (data) => await OkHttp({
        url: urlMap.login,
        method: 'POST',
        data,
    }),
)

export const getUserInfoAction = createAsyncThunk(
    typePrefix(urlMap.getUserInfo),
    async (data, { dispatch }) => {
        const response = await OkHttp({
            url: urlMap.getUserInfo,
            method: 'POST',
            data,
        })

        if (response.statusCode === 200) dispatch(userInfoAction.updateUserInfo(response.data))

        return response
    },
)
