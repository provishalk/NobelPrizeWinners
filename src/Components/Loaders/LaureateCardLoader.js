import React from "react";
import Skeleton from "react-loading-skeleton";
import "./LaureateCardLoader.scss";

const LaureateCardLoader = () => {
  return (
    <div className="uk-card uk-card-default uk-card-body uk-flex uk-flex-column uk-flex-between laureate-card-loader">
      <div>
        <Skeleton />
        <p className="uk-margin-small uk-text-capitalize uk-text-success uk-text-bold ">
          <Skeleton count={5} />
        </p>
      </div>
    </div>
  );
};

export default LaureateCardLoader;
