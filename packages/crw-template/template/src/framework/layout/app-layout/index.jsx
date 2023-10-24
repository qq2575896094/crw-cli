import React, { memo, useEffect, useCallback } from 'react'
import { Layout, Drawer } from 'antd'

import { useSelector, useDispatch } from 'react-redux'

import './scss/index.scss'
import { getUserInfoAction } from '@pages/login/api'

import { globalAction } from '@framework/reducer'
import AppHeader from '../app-header'
import AppFooter from '../app-footer'
import AppSlider from '../app-slider'
import AppSetting from '../app-setting'

function App() {
    const appSlider = useSelector((state) => state.global.appSlider)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserInfoAction())
    }, [])

    const toggleAppSlider = useCallback(() => {
        dispatch(globalAction.updateAppSlider(false))
    }, [])

    return (
        <Layout stylename="app-container">
            <Layout>
                <AppHeader systemName="WELCOME" />
                <Layout>
                    <AppSlider />
                    <Layout>
                        <Layout.Content>
                            content
                        </Layout.Content>
                        <AppFooter />
                    </Layout>
                </Layout>
            </Layout>
            <Drawer
                destroyOnClose
                visible={appSlider}
                size="458px"
                footer={false}
                header="页面配置"
                onClose={toggleAppSlider}
            >
                <AppSetting />
            </Drawer>
        </Layout>
    )
}

export default memo(App)
