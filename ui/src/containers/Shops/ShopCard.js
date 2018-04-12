import React from 'react';
import { Badge, Card } from 'antd';
import "./shop_card.css";

const ShopCard = ({ imgUrl, title, desc, count }) => (
  <Card style={{ width: '100%' }} bodyStyle={{ padding: 0 }}>
    <div className="shop-card-image">
      <Badge count={count || 1} style={{ backgroundColor: '#87d068' }}>
        <img alt={desc} width="100%" src={imgUrl} />
      </Badge>
    </div>
    <div className="shop-card-content">
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  </Card>
);

export default ShopCard;
