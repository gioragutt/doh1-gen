import React from 'react'
import styled from 'react-emotion'
import {connect} from 'react-redux'
import {Menu, Icon as AIcon} from 'antd'

import {Header, Content, Layout} from 'shared/components/Layout'
import {actions} from 'store'

const Icon = styled(AIcon)`
  margin: 0 !important;
`

const SETTING_MENU_ITEMS = [
  {title: 'הגדרות צוותים', type: 'setting', redirectTo: '/teams'},
  {title: 'ערכי דוח1', type: 'profile', redirectTo: '/settings'},
]

const MenuTitle = ({type}) => (
  <span>
    <Icon {...{type}}/>
    {/* <span>{title}</span> */}
  </span>
)

const menuStyle = {
  lineHeight: '64px',
  display: 'flex',
  justifyContent: 'center',
}

const HeaderMenu = ({changeTeam, currentSidebarMenuItem, sidebarMenuClicked, teams}) => (
  <Menu
    onClick={({keyPath, item: {props: {redirectTo}}}) => {
      if (keyPath[1] === 'teams') {
        sidebarMenuClicked(keyPath)
        changeTeam(keyPath[0], {redirectTo})
      } else {
        sidebarMenuClicked(keyPath, {redirectTo})
      }
    }}
    style={menuStyle}
    theme="dark"
    defaultSelectedKeys={currentSidebarMenuItem || ['1']}
    mode="horizontal"
  >
    <Menu.SubMenu key="teams" title={<MenuTitle type="team" title="צוותים"/>}>
      {teams.map(({name, key}) => <Menu.Item {...{key, redirectTo: `/teams/${key}`}}>{name}</Menu.Item>)}
    </Menu.SubMenu>
    {SETTING_MENU_ITEMS.map(({title, type, redirectTo}) => (
      <Menu.Item key={title} redirectTo={redirectTo}>
        <Icon {...{type}}/>
      </Menu.Item>
    ))}
  </Menu>
)

const Shell = ({
  currentSidebarMenuItem,
  sidebarMenuClicked,
  teams,
  changeTeam,
  children,
}) => (
  <Layout>
    <Header>
      <HeaderMenu
        {...{
          changeTeam,
          currentSidebarMenuItem,
          sidebarMenuClicked,
          teams,
        }}
      />
    </Header>
    <Layout>
      <Content>
        {children}
      </Content>
    </Layout>
  </Layout>
)

const enhance = connect(
  (({
    uiProps: {currentSidebarMenuItem},
    soldiers: {teams},
  }) => ({
    currentSidebarMenuItem,
    teams: Object.keys(teams).map(key => ({name: teams[key].name, key})),
  })),
  {
    sidebarMenuClicked: actions.sidebarMenuClicked,
    changeTeam: actions.changeTeam,
  }
)

export default enhance(Shell)