import React from "react";
import { Helmet } from "react-helmet";

const AppHelmet = ({ title, metas }) => (
  <div className="app-helmet">
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title || ''}</title>
      {(metas || []).map((meta, key) => (
        <meta key={key} name={meta.name} content={meta.content} />
      ))}
    </Helmet>
  </div>
)

export default AppHelmet;
