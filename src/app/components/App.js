import React from 'react'
import {withState} from 'recompose'
import {Header, Content, Footer, Sider, Layout} from 'shared/components/Layout'
import {Menu, Breadcrumb, Icon} from 'antd'
const SubMenu = Menu.SubMenu

const MenuData = {
  teams: ['ליבה', 'הכשרות'],
  settings: [
    {title: 'ערכי דוח1', type: 'profile'},
    {title: 'צוותים', type: 'setting'},
  ],
}

const MenuTitle = ({type, title}) => (
  <span>
    <Icon {...{type}}/>
    <span>{title}</span>
  </span>
)

const App = ({collapsed, onCollapse}) => (
  <Layout>
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => onCollapse(!collapsed)}
    >
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <SubMenu key="teams" title={<MenuTitle type="team" title="צוותים"/>}>
          {MenuData.teams.map(t => <Menu.Item key={t}>{t}</Menu.Item>)}
        </SubMenu>
        {MenuData.settings.map(({title, type}) => (
          <Menu.Item key={title}>
            <Icon {...{type}}/>
            <span>{title}</span>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
    <Layout>
      <Header/>
      <Content onClick={() => onCollapse(false)}>
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

const enhance = withState('collapsed', 'onCollapse', true)

export default enhance(App)