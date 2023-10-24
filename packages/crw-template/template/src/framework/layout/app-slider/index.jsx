import React, { memo } from 'react'
import { Layout } from 'antd'

import './scss/index.scss'

function AppSlider() {
    return (
        <Layout.Sider className="app-slider">
            <div className="logo">WELCOME</div>
        </Layout.Sider>
    )
}

export default memo(AppSlider)
