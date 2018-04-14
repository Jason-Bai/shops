import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import "./shops.css";
import Helmet from '../../components/Helmet';
import Shop from './Shop';
import ShopCard from './ShopCard';
import fetch from '../../utils/fetch';

const metas = [{
  name: 'shops',
  content: 'node interview question shops',
}];

class Shops extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      data: [],
    };
  }

  componentWillMount() {
    fetch.get('/shops.json').then((res) => {
      const { data } = res;
      this.setState({
        error: null,
        data,
      });
    }).catch((err) => {
      const error = err || err.message;
      this.setState({
        error,
      });
    });
  }

  render() {
    const { error, data } = this.state;

    const { match } = this.props;

    return (
      <div className="shops">
        <Helmet title="商店" metas={metas} />

        {error && (
          <div className="error">{error}</div>
        )}

        <h2>Shop</h2>

        <Row className="shop-items">
        {data.map((item) => (
          <Col key={item.id} className="shop-item" xs={24} sm={4} md={4} lg={4} xl={4}>
          <Link to={`${match.url}/${item.id}`}>
          <ShopCard {...item} />
          </Link>
          </Col>
        ))}
        </Row>

        <Switch>
          <Route path={`${match.path}/:shopId`} component={Shop} />
          <Route exact path={match.path} render={() => (
            <h3>Please select a shop.</h3>
          )}/>
        </Switch>
      </div>
    )
  };
};
export default Shops;
