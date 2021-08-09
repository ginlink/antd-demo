import React, { memo } from 'react'
import Icon from '@ant-design/icons'
import { ReactComponent as svg } from 'assets/img/sider/swap.svg'

function Swap() {
  return <Icon component={svg} />
}

export default memo(Swap)
