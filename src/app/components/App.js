import React from 'react'
import {connect} from 'react-redux'
import {withState, compose} from 'recompose'
import {Header, Content, Footer, Sider, Layout} from 'shared/components/Layout'
import {Menu, Breadcrumb, Icon} from 'antd'

import {actions} from 'store'

const SubMenu = Menu.SubMenu

const SETTING_MENU_ITEMS = [
  {title: 'ערכי דוח1', type: 'profile'},
  {title: 'צוותים', type: 'setting'},
]

const MOCK_TEAMS = ['ליבה', 'הכשרות']

const MenuTitle = ({type, title}) => (
  <span>
    <Icon {...{type}}/>
    <span>{title}</span>
  </span>
)

const SiderMenu = ({onTeamClick, currentSidebarMenuItem, sidebarMenuClicked}) => (
  <Menu
      onClick={({keyPath, ...p}) => {
        console.log(p)
        sidebarMenuClicked(keyPath)
        if (keyPath[1] === 'teams') {
          onTeamClick()
        }
      }}
      theme="dark"
      defaultSelectedKeys={currentSidebarMenuItem || ['1']}
      mode="inline"
    >
    <SubMenu key="teams" title={<MenuTitle type="team" title="צוותים"/>}>
      {MOCK_TEAMS.map(t => <Menu.Item key={t}>{t}</Menu.Item>)}
    </SubMenu>
    {SETTING_MENU_ITEMS.map(({title, type}) => (
      <Menu.Item key={title}>
        <Icon {...{type}}/>
        <span>{title}</span>
      </Menu.Item>
    ))}
  </Menu>
)

const App = ({collapsed, onCollapse, currentSidebarMenuItem, sidebarMenuClicked}) => (
  <Layout>
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => onCollapse(!collapsed)}
    >
      <SiderMenu
        {...{
          onTeamClick: () => onCollapse(true),
          currentSidebarMenuItem,
          sidebarMenuClicked,
        }}
      />
    </Sider>
    <Layout>
      <Header/>
      <Content onClick={() => onCollapse(true)}>
        <Breadcrumb style={{margin: '16px 0'}}>
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{padding: 24, background: '#fff', minHeight: 360}}>
          Bill is a cat.
        </div>
      </Content>
      <Footer>
        Ant Design ©2016 Created by Ant UED
      </Footer>
    </Layout>
  </Layout>
)

const enhance = compose(
  withState('collapsed', 'onCollapse', true),
  connect(
    (({uiProps: {currentSidebarMenuItem}}) => ({currentSidebarMenuItem})),
    {
      sidebarMenuClicked: actions.sidebarMenuClicked,
    }
  ),
)

export default enhance(App)