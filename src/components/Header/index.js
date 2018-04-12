import React from 'react';
import { Layout, Icon } from 'antd';

const { Header } = Layout;

const AppHeader = ({ collapsed, toggle }) => (
  <Header style={{ background: '#fff', padding: 0 }}>
    <Icon
      className="trigger"
      type={collapsed ? 'menu-unfold' : 'menu-fold'}
      onClick={toggle}
    />
  </Header>
);

export default AppHeader;
