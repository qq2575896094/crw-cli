class OkHttp {
    static async get(url, params = {}) {
        const paramsStr = Object.entries(params).map(([k, v]) => `${k}=${v}`).join('&')
        const search = url.include('?') ? paramsStr : `?${paramsStr}`
        const nUrl = `${url}${search}`
        const result = await fetch(nUrl)
        return result
    }

    static async post(url, data = {}, headers = {}) {
        try {
            const result = await fetch(url, {
                body: JSON.stringify(data),
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    ...headers,
                },
            })
            return await result.json()
        } catch (error) {
            return Promise.reject(error)
        }
    }
}

export default ({
    url,
    method = 'GET',
    data = {},
    headers = {},
}) => {
    const fetchMethod = method.toUpperCase()
    switch (fetchMethod) {
    case 'GET':
        return OkHttp.get(url, data)
    case 'POST':
        return OkHttp.post(url, data, headers)
    default:
        return Promise.reject(new Error(`${method} method error!`))
    }
}
