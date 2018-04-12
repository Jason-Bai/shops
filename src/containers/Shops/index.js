import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import "./shops.css";
import Helmet from '../../components/Helmet';
import Shop from './Shop';
import ShopCard from './ShopCard';

const items = [{
  id: 1,
  title: 'Node.js',
  desc: 'nodejs.org',
  imgUrl: 'https://nodejs.org/static/images/logo.svg',
}, {
  id: 2,
  title: 'Python',
  desc: 'www.instagram.com',
  imgUrl: 'https://nodejs.org/static/images/logo.svg',
}, {
  id: 3,
  title: 'C#',
  desc: 'www.instagram.com',
  imgUrl: 'https://nodejs.org/static/images/logo.svg',
}, {
  id: 4,
  title: 'Java',
  desc: 'www.instagram.com',
  imgUrl: 'https://nodejs.org/static/images/logo.svg',
}, {
  id: 5,
  title: 'Golang',
  desc: 'www.instagram.com',
  imgUrl: 'https://nodejs.org/static/images/logo.svg',
}, {
  id: 6,
  title: 'C',
  desc: 'www.instagram.com',
  imgUrl: 'https://nodejs.org/static/images/logo.svg',
}];

const metas = [{
  name: 'shops',
  content: 'node interview question shops',
}];

const Shops = ({ match }) => (
  <div className="shops">
    <Helmet title="商店" metas={metas} />

    <h2>Shop</h2>

    <Row className="shop-items">
      {items.map((item) => (
        <Col key={item.id} className="shop-item" xs={24} sm={4} md={4} lg={4} xl={4}>
          <Link to={`${match.url}/${item.id}`}>
            <ShopCard {...item} />
          </Link>
        </Col>
      ))}
    </Row>

    <Route path={`${match.path}/:shopId`} component={Shop} />
    <Route exact path={match.path} render={() => (
      <h3>Please select a shop.</h3>
    )}/>
  </div>
);

export default Shops;
