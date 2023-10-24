import React from 'react'
import { Dropdown } from 'antd'
import CustomIcon from '@components/custom-icon'

function AppTheme() {
    return (
        <div className="user-dropdown">
            <Dropdown>
                <CustomIcon type="icon-dengluren" />
                icon-zhongyingwenyingwen
                icon-a-zhongyingwenzhongwen
            </Dropdown>
        </div>
    )
}

export default AppTheme
