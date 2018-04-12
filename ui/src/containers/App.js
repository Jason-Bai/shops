import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from 'antd';
import './App.css';
import Sider from '../components/Sider';
import Header from '../components/Header';
import Routes from '../routes';

const { Content } = Layout;

class App extends React.Component {
  state = {
    collapsed: true,
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <Router>
        <Layout className="wrapper-app">
          <Sider collapsed={this.state.collapsed} />
          <Layout>
            <Header collapsed={this.state.collapsed} toggle={this.toggle} />
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
              <Routes />
            </Content>
          </Layout>
        </Layout>
      </Router>
    )
  }
}

export default App
