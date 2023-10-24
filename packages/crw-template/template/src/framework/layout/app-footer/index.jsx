import React, { memo } from 'react'
import { Layout } from 'antd'

import './scss/index.scss'

function AppFooter() {
    return (
        <Layout.Footer className="app-footer">footer</Layout.Footer>
    )
}

export default memo(AppFooter)
