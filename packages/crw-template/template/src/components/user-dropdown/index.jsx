import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown, Avatar, Menu } from 'antd'
import CustomIcon from '@components/custom-icon'

import './scss/index.scss'

const noop = () => {}

function UserDropdown({
    username,
    avatar,
    list,
    onClick,
}) {
    const menuItems = React.useMemo(() => {
        const result = []
        list.forEach(({ divider, ...other }) => {
            if (divider) {
                result.push({ type: 'divider' })
            }
            result.push(other)
        })
        return <Menu items={result} onClick={onClick} />
    }, [JSON.stringify(list)])

    return (
        <div className="user-dropdown" role="presentation">
            <Dropdown overlay={menuItems} placement="bottomRight">
                <span>
                    <span className="username">{username}</span>
                    <Avatar
                        src={avatar}
                        style={{ backgroundColor: '#87d068' }}
                        icon={<CustomIcon type="icon-dengluren" />}
                        alt={username}
                    />
                </span>
            </Dropdown>
        </div>
    )
}

UserDropdown.defaultProps = {
    username: '',
    avatar: '',
    list: [],
    onClick: noop,
}

UserDropdown.propTypes = {
    username: PropTypes.string,
    avatar: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        disabled: PropTypes.bool,
        divider: PropTypes.bool,
    })),
    onClick: PropTypes.func,
}

export default UserDropdown
