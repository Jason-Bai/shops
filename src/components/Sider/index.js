import React from 'react'
import { Layout } from 'antd';
import AppMenu from './Menu';

const { Sider } = Layout;

const AppSider = ({ collapsed }) => (
  <Sider
    trigger={null}
    collapsible
    collapsed={collapsed}
  >
    <div className="logo" />
    <AppMenu />
  </Sider>
);

export default AppSider;
