import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Menu } from 'antd';

const AppMenu = () => {
  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
      <Menu.Item key="1">
        <Link to="/">
          <Icon type="home" />
          <span>Home</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/shops">
          <Icon type="shop" />
          <span>Shops</span>
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default AppMenu;
