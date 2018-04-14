import React from 'react';
import { Badge, Card } from 'antd';
import "./shop_card.css";

const ShopCard = ({ logo, name, site, total }) => (
  <Card style={{ width: '100%' }} bodyStyle={{ padding: 0 }}>
    <div className="shop-card-image">
      <Badge count={total || 1} style={{ backgroundColor: '#87d068' }}>
        <img alt={name} width="100%" src={logo} />
      </Badge>
    </div>
    <div className="shop-card-content">
      <h3>{name}</h3>
      <p>{site}</p>
    </div>
  </Card>
);

export default ShopCard;
