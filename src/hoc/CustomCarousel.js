import React from "react";

const CustomCarousel = ({ children }) => {
  return (
    <div
      className="uk-position-relative uk-visible-toggle "
      tabIndex="-1"
      data-uk-slider
    >
      <ul
        className="uk-slider-items"
        data-uk-height-match="target: > li > .uk-card"
      >
        {children}
      </ul>

      <a
        className="uk-position-center-left uk-position-small uk-hidden-hover"
        href="#"
        data-uk-slidenav-previous
        data-uk-slider-item="previous"
      />
      <a
        className="uk-position-center-right uk-position-small uk-hidden-hover"
        href="#"
        data-uk-slidenav-next
        data-uk-slider-item="next"
      ></a>
    </div>
  );
};

export default CustomCarousel;
