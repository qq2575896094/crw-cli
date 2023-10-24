import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enUS from '@/language/en-US'
import zhCN from '@/language/zh-CN'

export const LANGUAGES = [
    { value: 'en-US', name: 'English' },
    { value: 'zh-CN', name: '简体中文' },
]

i18n.use(initReactI18next)
    .init({
        resources: {
            'en-US': { translation: enUS },
            'zh-CN': { translation: zhCN }
        },
        debug: true,
        load: 'all',
        fallbackLng: 'zh-CN',
        interpolation: {
            escapeValue: false // not needed for react as it escapes by default
        }
    })

export default i18n
