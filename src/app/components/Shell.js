import React from 'react'
import {connect} from 'react-redux'
import {withState, compose} from 'recompose'
import {Content, Footer, Sider, Layout} from 'shared/components/Layout'
import {Menu, Icon} from 'antd'

import {actions} from 'store'

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
      onClick={({keyPath}) => {
        sidebarMenuClicked(keyPath)
        if (keyPath[1] === 'teams') {
          onTeamClick()
        }
      }}
      theme="dark"
      defaultSelectedKeys={currentSidebarMenuItem || ['1']}
      mode="inline"
    >
    <Menu.SubMenu key="teams" title={<MenuTitle type="team" title="צוותים"/>}>
      {MOCK_TEAMS.map(t => <Menu.Item key={t}>{t}</Menu.Item>)}
    </Menu.SubMenu>
    {SETTING_MENU_ITEMS.map(({title, type}) => (
      <Menu.Item key={title}>
        <Icon {...{type}}/>
        <span>{title}</span>
      </Menu.Item>
    ))}
  </Menu>
)

const Shell = ({collapsed, onCollapse, currentSidebarMenuItem, sidebarMenuClicked, children}) => (
  <Layout>
    <Sider collapsible {...{collapsed, onCollapse: () => onCollapse(!collapsed)}}>
      <SiderMenu
        {...{
          onTeamClick: () => onCollapse(true),
          currentSidebarMenuItem,
          sidebarMenuClicked,
        }}
      />
    </Sider>
    <Layout>
      <Content onClick={() => onCollapse(true)}>
        {children}
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

export default enhance(Shell)