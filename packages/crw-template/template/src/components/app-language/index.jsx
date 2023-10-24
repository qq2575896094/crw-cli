import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dropdown, Menu } from 'antd'
import CustomIcon from '@components/custom-icon'
import { globalAction } from '@framework/reducer'
import { LANGUAGES } from '@/language/loader'

import './scss/index.scss'

const languageIconMap = {
    'en-US': 'icon-zhongyingwenyingwen',
    'zh-CN': 'icon-a-zhongyingwenzhongwen'
}

function AppLanguage() {
    const language = useSelector((state) => state.global.language)
    const dispatch = useDispatch()

    const changeLanguage = ({ key }) => dispatch(globalAction.updateLanguage(key))

    const menuItems = React.useMemo(() => {
        const items = LANGUAGES.map(({ name, value }) => ({
            label: name,
            key: value
        }))
        return <Menu items={items} onClick={changeLanguage} selectedKeys={[language]} />
    }, [language])

    return (
        <Dropdown overlay={menuItems} placement="bottom">
            <div className="language-dropdown">
                {
                    language && (<CustomIcon type={languageIconMap[language]} />)
                }
            </div>
        </Dropdown>
    )
}

export default AppLanguage
