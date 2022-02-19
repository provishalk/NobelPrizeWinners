import React from "react";
import { TIMES_TAG } from "../utils/Labels";
import { BsFillTrophyFill } from "react-icons/bs";
import "./LaureateCard.scss";
import { removeDoubleQuotes } from "../utils/functions";
const LaureateCard = ({ laureate }) => {
  const isWonMoreThenOneTime = !!laureate.times;
  return (
    <div
      className={`uk-card uk-card-default uk-card-body uk-flex uk-flex-column uk-flex-between laureate-card ${
        isWonMoreThenOneTime
          ? "uk-padding-small"
          : "uk-alert-success laureate-card__card-border"
      }`}
    >
      <div>
        <h3 className="uk-card-title uk-text-bold uk-margin-remove">
          {laureate.firstname} {laureate.surname}
        </h3>
        <p className="uk-margin-small uk-margin-medium-bottom uk-text-capitalize uk-text-success uk-text-bold ">
          {removeDoubleQuotes(laureate.motivation)}
        </p>
      </div>
      <div className="uk-flex uk-flex-right">
        {isWonMoreThenOneTime && (
          <p className="uk-margin-remove uk-text-bold uk-text-secondary uk-flex uk-flex-middle">
            <BsFillTrophyFill className="uk-margin-small-right laureate-card_trophy-icon" />
            {laureate.times} {TIMES_TAG}
          </p>
        )}
      </div>
    </div>
  );
};

export default LaureateCard;
