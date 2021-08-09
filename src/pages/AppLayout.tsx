import { Layout as Layoutd, Menu as Menud } from 'antd'
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons'
import React, { memo, useCallback, useState } from 'react'
import styled, { css } from 'styled-components/macro'
import logoSrc from '../assets/img/logo.jpg'
import Icon from 'components/Icon'
import { NavLink } from 'react-router-dom'
import SubMenud from 'antd/lib/menu/SubMenu'
import { t } from 'utils/screen-adaptiton'

const Layout = styled(Layoutd)`
  height: 100vh;
`
const Header = styled(Layoutd.Header)`
  background-color: ${(props: { theme: { white: any } }) => props.theme.white};
`
const Sider = styled(Layoutd.Sider)`
  flex: 0 0 240px !important;
  max-width: 240px !important;
  min-width: 240px !important;
  width: 240px !important;

  ${css`
    background-color: ${(props: { theme: { white: any } }) => props.theme.white};
  `}

  padding: 24px 24px 18px;
`

const Content = styled(Layoutd.Content)`
  ${css`
    background-color: ${(props) => props.theme.white};
  `}
`

const ContentLayout = styled(Layoutd)(...t``)

const Logo = styled.div`
  width: 102px;
  height: 40px;
  margin-left: 8px;

  svg {
    width: 102px;
    height: 40px;
  }
`

const Menu = styled(Menud)`
  border-right: none;
  background-color: ${(props: { theme: { white: any } }) => props.theme.white};

  color: ${(props: { theme: { primaryText2: any } }) => props.theme.primaryText2};

  margin-top: 28px;

  & > li {
    /* background-color: red; */
    /* background-color: rgba(0, 118, 255, 0.05); */
    background-color: unset;
    border-radius: 24px;

    svg {
      width: 20px;
      height: 20px;
    }

    &:hover svg {
      g {
        filter: none;
        stroke: ${(props: { theme: { primary4: any } }) => props.theme.primary4};
      }
      path {
        stroke: ${(props: { theme: { primary4: any } }) => props.theme.primary4};
      }
    }
    &:hover a {
      color: ${(props: { theme: { primary1: any } }) => props.theme.primary1};
    }
    &::after {
      border: none;
    }
  }

  .ant-menu-item-selected,
  .ant-menu-submenu-selected {
    background-color: ${(props: { theme: { primary2: any } }) => props.theme.primary2} !important;

    svg {
      /* background-color: red; */
      /* stroke: ${(props: { theme: { primary1: any } }) => props.theme.primary1}; */
    }

    svg {
      g {
        filter: none;
        stroke: ${(props: { theme: { primary1: any } }) => props.theme.primary1};
      }
      path {
        stroke: ${(props: { theme: { primary1: any } }) => props.theme.primary1};
      }
    }

    a {
      color: ${(props: { theme: { primary1: any } }) => props.theme.primary1};
    }
  }

  .ant-menu-item-selected::after {
    content: none;
  }
`
const SubMenu = styled(SubMenud)(...t``)

function AppLayout({ children }: { children: any }) {
  const [collapsed, setCollapsed] = useState<boolean>(false)

  const toggle = useCallback(() => {
    setCollapsed((prev) => !prev)
  }, [])

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {/* <Header>header</Header> */}
        <Logo>
          <Icon.Logo />
        </Logo>
        <Menu mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<Icon.Home />}>
            <NavLink to="/home">Home</NavLink>
          </Menu.Item>
          <Menu.Item key="2" icon={<Icon.Swap />}>
            <NavLink to="/swap">Swap</NavLink>
          </Menu.Item>
          <Menu.Item key="3" icon={<Icon.Liquidity />}>
            <NavLink to="/liquidity">Liquidity</NavLink>
          </Menu.Item>

          <SubMenu key="sub1" icon={<UserOutlined />} title="User">
            <Menu.Item key="4">Tom</Menu.Item>
            <Menu.Item key="5">Bill</Menu.Item>
            <Menu.Item key="6">Alex</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <ContentLayout>
        {/* <Header className="site-layout-background" style={{ padding: 20 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
          </Header> */}

        <Content>{children}</Content>
      </ContentLayout>
    </Layout>
  )
}

export default memo(AppLayout)
