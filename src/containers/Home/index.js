import React from 'react';
import Helmet from '../../components/Helmet';

const metas = [{
  name: 'node interview question',
  content: 'node interview question',
}];

const Home = () => (
  <div>
    <Helmet title="首页" metas={metas} />
    <h2>Node Interview Question Weekly</h2>
    <p>A free, once–weekly e-mail round-up of Node.js interview questions.</p>
  </div>
);

export default Home;
