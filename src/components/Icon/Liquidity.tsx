import React, { memo } from 'react'
import Icon from '@ant-design/icons'
import { ReactComponent as svg } from 'assets/img/sider/liquidity.svg'

function Liquidity() {
  return <Icon component={svg} />
}

export default memo(Liquidity)
