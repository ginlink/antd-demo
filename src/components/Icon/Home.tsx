import React, { memo } from 'react'
import Icon from '@ant-design/icons'
import { ReactComponent as HomeSvg } from 'assets/img/sider/home.svg'

function Home() {
  return <Icon component={HomeSvg} />
}

export default memo(Home)
