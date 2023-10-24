import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Layout } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import UserDropdown from '@components/user-dropdown'
import AppLanguage from '@components/app-language'

import './scss/index.scss'

const noop = () => {}

function AppHeader({
    collapsed,
    setCollapsed,
}) {
    const userInfo = useSelector((state) => state.userInfo)

    const dropdownList = [
        {
            label: '个人信息',
            key: 'userInfo',
            disabled: false,
            divider: false,
        },
        {
            label: '修改密码',
            key: 'changePassword',
            disabled: false,
            divider: false,
        },
        {
            label: '退出',
            key: 'logout',
            disabled: false,
            divider: true,
        },
    ]

    const userDropdownClick = ({ key }) => {
        console.log(key, 'userDropdownClick')
    }

    return (
        <Layout.Header styleName="app-header">
            <div className="logo">WELCOME</div>
            <div className="slider-collapse-btn">
                {
                    collapsed
                        ? <MenuUnfoldOutlined onClick={() => setCollapsed(false)} />
                        : <MenuFoldOutlined onClick={() => setCollapsed(true)} />
                }
            </div>
            <div className="header-menu-wrapper" />
            <div className="header-action-wrapper">
                <AppLanguage />
                <UserDropdown
                    username={userInfo.username}
                    avatar={userInfo.avatar}
                    list={dropdownList}
                    onClick={userDropdownClick}
                />
            </div>
        </Layout.Header>
    )
}

AppHeader.propTypes = {
    collapsed: PropTypes.bool,
    setCollapsed: PropTypes.func,
}

AppHeader.defaultProps = {
    collapsed: false,
    setCollapsed: noop,
}

export default memo(AppHeader)
