import React, { memo } from 'react'
import Icon from '@ant-design/icons'
import { ReactComponent as svg } from 'assets/img/sider/logo.svg'

function Logo() {
  return <Icon component={svg} />
}

export default memo(Logo)
