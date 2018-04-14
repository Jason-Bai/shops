import React from 'react';
import "./shop.css";
import Helmet from '../../components/Helmet';
import ProductionCard from './ProductionCard';
import fetch from '../../utils/fetch';

const metas = [{
  name: 'shop',
  content: 'node interview question shop'
}];

class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      loading: true,
      error: null,
      shop: null,
      productions: [],
    };
  }

  componentWillMount() {
    const { match } = this.props;
    const { params } = match;
    (async () => {
      await this.loadShopProductions(params.shopId, 0, 10);
    })();
  }

  componentWillReceiveProps(nextProps) {
    const { match } = nextProps;
    const { params } = match;

    if (params.shopId !== this.props.match.params.shopId) {
      this.loadShopProductions(params.shopId, 0, 10);
    }
  }

  loadShopProductions = async (shopId, startIndex = 0, maxResults = 10) => {
    let shop;
    let err;

    try {
      shop = await fetch.get(`/shop_${shopId}.json`);
    } catch (error) {
      err = error;
    }

    if (err) {
      const error = err || err.message;
      const newState = {
        loading: false,
        error,
      };
      return this.setState(newState);
    }

    let productions;

    try {
      productions = await this.loadProductions(shopId, startIndex, maxResults);
    } catch (error) {
      err = error;
    }

    if (err) {
      const error = err || err.message;
      const newState = {
        loading: false,
        error,
      };
      return this.setState(newState);
    }

    const newState = {
      loading: false,
      error: null,
      shop: shop.data,
      productions: productions.data,
    };

    this.setState(newState);
  }

  loadProductions = (shopId, startIndex, maxResults) => {
    return fetch.get(`/shop_${shopId}_productions.json`);
  }

  render() {
    const { loading, error, shop, productions }  = this.state;

    if (loading) {
      return (
        <div className="loading">Loading...</div>
      );
    }

    if (error) {
      return (
        <div className="error">{error}</div>
      );
    }

    return (
      <div className="shop">
        <Helmet title="商品详情" metas={metas} />
        <h3>{shop.name}</h3>
        <p>{shop.site}</p>

        <div className="shop-bd">
          <div className="production-cards">
            {productions.map((production) => <ProductionCard key={production.id} {...production} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default Shop;
