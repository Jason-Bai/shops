import React from 'react';
import "./shop.css";
import Helmet from '../../components/Helmet';

const metas = [{
  name: 'shop',
  content: 'node interview question shop'
}];

const Shop = ({ match }) => (
  <div className="shop">
    <Helmet title="商品详情" metas={metas} />
    <h3>{match.params.shopId}</h3>
  </div>
);

export default Shop;
