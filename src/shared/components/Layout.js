import styled from 'react-emotion'
import {Layout as ALayout} from 'antd'

const {
  Header: AHeader,
  Content: AContent,
  Footer: AFooter,
  Sider: ASider,
} = ALayout

export const Layout = styled(ALayout)`
  min-height: 100vh;
`

export const Footer = styled(AFooter)`
  text-align: center;
`

export const Content = styled(AContent)`
  margin: 24px 16px;
`

export const Header = styled(AHeader)`
  background: white;
  padding: 0
`

export const Sider = styled(ASider)``