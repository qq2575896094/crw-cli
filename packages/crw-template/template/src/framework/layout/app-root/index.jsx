import React, { memo } from 'react'
import { RouterProvider } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import i18next from 'i18next'
import { I18nextProvider } from 'react-i18next'
import { globalAction } from '@framework/reducer'

import getRouter from '@/routers'
import ErrorBoundary from '@components/error-boundary'

import i18n from '@/language/loader'

function Root() {
    const [antdLanguageData, setAntdLanguageData] = React.useState(null)
    const language = useSelector((state) => state.global.appLanguage)
    const dispatch = useDispatch()

    // 获取当前浏览器的语言
    const getBrowserLanguage = () => (navigator.language ? navigator.language : navigator.userLanguage)

    // 切换语言包
    const changeLanguage = () => {
        const lng = language || getBrowserLanguage()
        i18next.changeLanguage(lng).then(() => {
            // eslint-disable-next-line global-require,import/no-dynamic-require
            setAntdLanguageData(require(`antd/es/locale/${lng.replace('-', '_')}.js`).default)
            if (!language) dispatch(globalAction.updateLanguage(lng))
        })
    }

    React.useEffect(() => {
        changeLanguage()
    }, [language])

    return (
        <ConfigProvider locale={antdLanguageData}>
            <I18nextProvider i18n={i18n}>
                <RouterProvider router={getRouter()} fallbackElement={<ErrorBoundary />} />
            </I18nextProvider>
        </ConfigProvider>
    )
}

export default memo(Root)
