import React from 'react'
import {connect} from 'react-redux'
import {withState, compose} from 'recompose'
import {Menu, Icon} from 'antd'

import {Content, Sider, Layout} from 'shared/components/Layout'
import {actions} from 'store'

const SETTING_MENU_ITEMS = [
  {title: 'הגדרות צוותים', type: 'setting', redirectTo: '/teams'},
  {title: 'ערכי דוח1', type: 'profile', redirectTo: '/settings'},
]

const MenuTitle = ({type, title}) => (
  <span>
    <Icon {...{type}}/>
    <span>{title}</span>
  </span>
)

const SiderMenu = ({onTeamClick, currentSidebarMenuItem, sidebarMenuClicked, teamNames}) => (
  <Menu
    onClick={({keyPath, item: {props: {redirectTo}}}) => {
      if (keyPath[1] === 'teams') {
        sidebarMenuClicked(keyPath)
        onTeamClick(keyPath[0], redirectTo)
      } else {
        sidebarMenuClicked(keyPath, {redirectTo})
      }
    }}
    theme="dark"
    defaultSelectedKeys={currentSidebarMenuItem || ['1']}
    mode="inline"
  >
    <Menu.SubMenu key="teams" title={<MenuTitle type="team" title="צוותים"/>}>
      {teamNames.map(t => <Menu.Item key={t} redirectTo={`/teams/${t}`}>{t}</Menu.Item>)}
    </Menu.SubMenu>
    {SETTING_MENU_ITEMS.map(({title, type, redirectTo}) => (
      <Menu.Item key={title} redirectTo={redirectTo}>
        <Icon {...{type}}/>
        <span>{title}</span>
      </Menu.Item>
    ))}
  </Menu>
)

const Shell = ({
  collapsed,
  onCollapse,
  currentSidebarMenuItem,
  sidebarMenuClicked,
  teamNames,
  changeTeam,
  children,
}) => (
  <Layout>
    <Sider collapsible {...{collapsed, onCollapse: () => onCollapse(!collapsed)}}>
      <SiderMenu
        {...{
          onTeamClick: (team, redirectTo) => {
            onCollapse(true)
            changeTeam(team, {redirectTo})
          },
          currentSidebarMenuItem,
          sidebarMenuClicked,
          teamNames,
        }}
      />
    </Sider>
    <Layout>
      <Content onClick={() => onCollapse(true)}>
        {children}
      </Content>
    </Layout>
  </Layout>
)

const enhance = compose(
  withState('collapsed', 'onCollapse', true),
  connect(
    (({
      uiProps: {currentSidebarMenuItem},
      soldiers: {teams},
    }) => ({
      currentSidebarMenuItem,
      teamNames: Object.keys(teams),
    })),
    {
      sidebarMenuClicked: actions.sidebarMenuClicked,
      changeTeam: actions.changeTeam,
    }
  ),
)

export default enhance(Shell)