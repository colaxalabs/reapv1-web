import PropTypes from 'prop-types'
import React from 'react'
import {
  Space,
  Avatar,
  Image,
  Menu,
  Layout,
  Typography,
  Dropdown,
  Button,
} from 'antd'
import {
  GlobalOutlined,
  PlusCircleOutlined,
  ScanOutlined,
  SwapOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  EyeOutlined,
  LogoutOutlined,
  DownOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'
import { connect } from 'react-redux'
import makeBlockie from 'ethereum-blockies-base64'

// Redux actions
import { disconnectWallet, connectWallet } from '../actions'

import { Media } from './Media'

const { Header, Sider, Content } = Layout
const { Text } = Typography
const { SubMenu } = Menu



class DesktopContainer extends React.Component {

  state = {
    isCollapsed: false
  }

  toggle = () => this.setState(prevState => ({
    isCollapsed: !prevState.isCollapsed
  }))

  render() {

    const { children, walletLoaded, wallet, isMetamask, connectWallet, disconnectWallet } = this.props
    const menu = (
      <Menu>
        <Menu.Item icon={<UserOutlined />}>
          <a href='/wallet/'>
            View Profile
          </a>
        </Menu.Item>
        <Menu.Item icon={<EyeOutlined />}>
          <a href={`https://rinkeby.etherscan.io/address/${wallet.address[0]}`} target='_blank' rel='noopener noreferrer'>
            View Address on Etherscan
          </a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item icon={<LogoutOutlined />}>
          <Button type='link' onClick={(e) => {
            e.preventDefault()
            disconnectWallet()
          }}>
            Sign Out
          </Button>
        </Menu.Item>
      </Menu>
    )

    return (
      <>
        <Media greaterThan='mobile'>
          <Layout style={{ minHeight: '100vh' }}>
            <Sider
              style={{ backgroundColor: '#fff', overflow: 'auto', height: '100vh', position: 'sticky', top: 0, left: 0 }}
              breakpoint='sm'
              collapsedWidth='80'
              onCollapse={this.toggle}
              collapsible
              collapsed={this.state.isCollapsed}
              trigger={null}
            >
                <Menu mode="inline">
                  <Menu.Item
                    icon={
                      <Image
                        width={40}
                        height={30}
                        src='https://gateway.pinata.cloud/ipfs/QmNj9anTCJ644dwWAvK7V7zskJcPybWPyFTC5JGazKKKfY'
                        style={{ paddingRight: '10px' }}
                      />
                    }
                    style={{ fontSize: '32px', marginBottom: '30px', fontWeight: 'bold' }}
                  >
                    <a href='/'>
                      Reap
                    </a>
                  </Menu.Item>
                  <SubMenu key='sub1' icon={<SwapOutlined />} title='Lands'>
                    <Menu.Item key='1' icon={<PlusCircleOutlined />}>
                      <a href='/register/'>
                        Register
                      </a>
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu key='sub2' icon={<GlobalOutlined />} title='Markets'>
                    <Menu.Item key='2' icon={<ShoppingCartOutlined />}>
                      <a href='/crops/'>
                        Crops
                      </a>
                    </Menu.Item>
                  </SubMenu>
                  <Menu.Item key='3' icon={<ScanOutlined />}>
                    <a href='/trace/'>
                      Trace
                    </a>
                  </Menu.Item>
                </Menu>
              </Sider>
              <Layout className="site-layout">
                <Header className='site-layout-background' style={{ padding: 0 }}>
                  {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: this.toggle,
                  })}
                  {walletLoaded ? (
                     <Dropdown overlay={menu} className='logo'>
                       <Button style={{ padding: '17px' }} type='link' onClick={(e) => e.preventDefault()}>
                         <Space>
                          <Avatar src={makeBlockie(String(wallet.address[0]))} size={25} />
                          <Text ellipsis className='addr' copyable>{wallet.address[0]}</Text>
                          <DownOutlined />
                         </Space>
                       </Button>
                     </Dropdown>
                  ) : (
                    <Space className='logo'>
                      <Button
                        size='large'
                        type='primary'
                        onClick={isMetamask ? connectWallet : () => {
                          window.alert('You need MetaMask wallet to interact with decentralized applications(dAPP). We are redirecting you to install MetaMask.')
                          window.location.assign('https://metamask.io/download.html')
                        }}
                      >
                        Connect Wallet
                      </Button>
                    </Space>
                  )}
                </Header>
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

DesktopContainer.propTypes = {
  children: PropTypes.array,
  walletLoaded: PropTypes.bool,
  wallet: PropTypes.object,
  connectWallet: PropTypes.func,
  disconnectWallet: PropTypes.func,
  isMetamask: PropTypes.bool,
}

function mapStateToProps(state) {
  return {
    walletLoaded: state.wallet.loaded,
    wallet: state.wallet,
    isMetamask: state.wallet.isMetaMask,
  }
}

export default connect(mapStateToProps, { disconnectWallet, connectWallet })(DesktopContainer)

