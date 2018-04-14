import React from 'react';
import { Icon, Card } from 'antd';
import "./production_card.css";

class ProductionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
    };
  }

  render() {
    const { name, source, createdAt, likeCount = 0, answerCount = 0 } = this.props;
    return (
      <div className="production-card">
        <Card style={{ width: "100%" }} bodyStyle={{ padding: 0 }}>
          <div className="production-hd">
            <h3 className="production-title">{name}</h3>
            <a alt={name} className="production-source" href={source} target="_blank">({source})</a>
          </div>
          <div className="production-fd">
            <span className="answer"><Icon type="message" /> {answerCount}</span>
            <span className="like"><Icon type="like" /> {likeCount}</span>
            <span className="createdAt">{createdAt}</span>
          </div>
        </Card>
      </div>
    );
  }
}

export default ProductionCard;
