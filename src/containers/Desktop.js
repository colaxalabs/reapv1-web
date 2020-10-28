import React from 'react'
import { Menu, Layout } from 'antd'
import {
  WalletOutlined,
  CalendarOutlined,
  HourglassOutlined,
  QuestionOutlined,
  AlertOutlined,
  RocketOutlined,
  Loading3QuartersOutlined,
} from '@ant-design/icons'

import { Media } from './Media'

const { Header, Sider, Content } = Layout

class DesktopContainer extends React.Component {

  state = {
    isCollapsed: false
  }

  toggle = () => this.setState(prevState => ({
    isCollapsed: !prevState.isCollapsed
  }))

  render() {

    const { children } = this.props

    return (
      <>
        <Media greaterThan='mobile'>
          <Layout style={{ minHeight: '100vh' }}>
              <Sider breakpoint='sm' collapsedWidth='80' onCollapse={this.toggle} collapsible collapsed={this.state.isCollapsed}>
                <div className="header">Mkulima</div>
                <Menu theme="dark" mode="inline">
                  <Menu.Item icon={<QuestionOutlined />}>
                    Dormant
                  </Menu.Item>
                  <Menu.Item icon={<Loading3QuartersOutlined />}>
                    Preparation
                  </Menu.Item>
                  <Menu.Item icon={<RocketOutlined />}>
                    Planting
                  </Menu.Item>
                  <Menu.Item icon={<HourglassOutlined />}>
                    Crop Growth
                  </Menu.Item>
                  <Menu.Item icon={<AlertOutlined />}>
                    Harvesting
                  </Menu.Item>
                  <Menu.Item icon={<CalendarOutlined />}>
                    Booking
                  </Menu.Item>
                  <Menu.Item style={{ marginTop: '25px' }} icon={<WalletOutlined />}>
                    <a href='/wallet/'>
                      Wallet
                    </a>
                  </Menu.Item>
                </Menu>
              </Sider>
              <Layout className="site-layout">
                <Header className='site-layout-background' style={{ padding: 0 }} />
                <Content
                  style={{
                    margin: '24px 16px 0',
                  }}
                  >
                    {children}
                  </Content>
                </Layout>
              </Layout>
            </Media>
          </>
    )
  }
}

export default DesktopContainer

