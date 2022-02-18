import React from "react";
import { SHARED_TAG, TIMES_TAG } from "../utils/Labels";
import "./LaureateCard.scss";
const LaureateCard = ({ laureate }) => {
  const isWonMoreThenOneTime = !!laureate.times;
  return (
    <div
      className={`uk-card uk-card-default uk-card-body uk-flex uk-flex-column uk-flex-between laureate-card ${
        isWonMoreThenOneTime &&
        "uk-alert-success laureate-card__won-more-the-one-times"
      }`}
    >
      <div>
        <h3 className="uk-card-title uk-text-bold uk-margin-remove">
          {laureate.firstname} {laureate.surname}
        </h3>
        <p className="uk-margin-small uk-margin-medium-bottom uk-text-capitalize uk-text-success uk-text-bold">
          {laureate.motivation}
        </p>
      </div>
      <div className="uk-flex uk-flex-between">
        <p className="uk-margin-remove uk-text-bold laureate-card__tags__share">
          {SHARED_TAG} {laureate.share}
        </p>
        {isWonMoreThenOneTime && (
          <p className="uk-margin-remove uk-text-bold laureate-card__tags__times">
            {laureate.times} {TIMES_TAG}
          </p>
        )}
      </div>
    </div>
  );
};

export default LaureateCard;
