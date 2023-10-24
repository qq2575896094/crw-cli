import axios from 'axios'
import qs from 'qs'
import { pathToRegexp } from 'path-to-regexp'

const instance = axios.create({
    baseURL: '',
    timeout: 0,
    method: 'get',
    responseType: 'json',
    paramsSerializer(params) {
        return qs.stringify(params, { indices: false })
    },
})

// 请求拦截器
instance.interceptors.request.use((config) => ({
    ...config,
    // cancelToken: new axios.CancelToken() // 取消请求
}), (error) => Promise.reject(error))

// 响应拦截器
instance.interceptors.response.use((response) => response, (error) => Promise.reject(error))

/**
 * 获取请求url
 * @param url
 * @param params
 */
const getUrl = (url, params) => {
    let nUrl = url
    const nParams = { ...params }
    const sParams = []

    const outputKeys = []
    pathToRegexp(nUrl, outputKeys)
    outputKeys.forEach((item) => {
        if (nParams[item.name] === undefined) nParams[item.name] = ''
    })

    Object.keys(nParams).forEach((key) => {
        const reg1 = new RegExp(`${key}\\?`, 'gm')
        const reg2 = new RegExp(`${key}`, 'gm')

        if (reg1.test(nUrl) || reg2.test(nUrl)) {
            nUrl = nUrl.replace(reg1, nParams[key]).replace(reg2, nParams[key])
        } else {
            sParams.push(`${key}=${nParams[key]}`)
        }
    })

    return { nUrl, nParams, sParams }
}

// 网络
const okHttp = (url, {
    method = 'GET',
    headers = {},
    contentType = 'application/json; charset=UTF-8',
    params = {},
    data = {},
    // hasLoading = true,
    // extra
}) => {
    // 设置请求header
    instance.defaults.headers = {
        ...instance.defaults.headers,
        ...headers,
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': contentType,
    }

    const { nUrl, nParams, sParams } = getUrl(url, params)

    // TODO: 处理loading

    // 处理method
    const ajaxMethod = method.toLowerCase()
    switch (ajaxMethod) {
    case 'get':
        return instance.get(nUrl, { params: nParams })
    case 'post':
        return instance.post(nUrl, data, { params: sParams.length > 0 ? sParams : {} })
    case 'put':
        return instance.put(nUrl, data, { params: sParams.length > 0 ? sParams : {} })
    case 'delete':
        return instance.delete(nUrl, { params: nParams, data })
    case 'patch':
        return instance.patch(nUrl, data, { params: sParams.length > 0 ? sParams : {} })
    default: {
        return Promise.resolve({
            statusCode: 300,
            message: 'ajax method params error!'
        })
    }
    }
}

export default okHttp
