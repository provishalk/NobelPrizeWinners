import React from "react";
import LaureateCardLoader from "./LaureateCardLoader";

const HomeLoader = () => {
  return (
    <div className="uk-margin-small-right uk-margin-small-left uk-margin-medium-top">
      <div data-uk-grid>
        <div className="uk-width-auto@m">
          {[...Array(2).keys()].map((num) => (
            <div
              className="uk-padding-small uk-padding-remove-bottom uk-margin-bottom"
              key={num}
            >
              <LaureateCardLoader />
            </div>
          ))}
        </div>
        <div className="uk-width-expand@m">
          <div className="uk-flex uk-flex-wrap">
            {[...Array(6).keys()].map((num) => (
              <div
                className="uk-padding-small uk-padding-remove-bottom uk-margin-right uk-margin-bottom"
                key={num}
              >
                <LaureateCardLoader />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLoader;
