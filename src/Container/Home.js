import React, { useEffect, useState, useCallback } from "react";
import MedalImg from "../assets/images/Medal.png";
import { uniq, flattenDeep, groupBy } from "lodash";
import Select from "react-select";
import { YEAR } from "../utils/constants";
import LaureateCard from "../Components/LaureateCard";
import CustomCarousel from "../hoc/CustomCarousel";
import {
  CATEGORY,
  TITLE,
  TOP_WINNERS_TITLE,
  YEAR_LABEL,
  YEAR_RANGE,
} from "../utils/Labels";
import { fetchNobelPriceWinnerApi } from "../api/home";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import "./Home.scss";
import HomeLoader from "../Components/Loaders/HomeLoader";

const Home = () => {
  const [nobelPrizes, setNobelPrizes] = useState([]);
  const [laureatesWonMoreThenOneTime, setLaureatesWonMoreThenOneTime] =
    useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [nobelPrizeUpto, setNobelPrizeUpto] = useState(50);
  const [isPageLoading, setIsPageLoading] = useState(true);

  const handleOnDocumentBottom = useCallback(() => {
    setNobelPrizeUpto((oldState) => oldState + 50);
  }, []);

  useEffect(() => {
    fetchNobelPriceWinnerApi()
      .then((data) => {
        setNobelPrizes(data);
        setIsPageLoading(false);
      })
      .catch((err) => {
        console.error("err", err.response);
      });
  }, []);

  useEffect(() => {
    const getUniqueCategories = uniq(
      nobelPrizes.map((prize) => prize.category)
    );
    setCategories(
      getUniqueCategories.map((category) => ({
        value: category,
        label: category,
      }))
    );
    if (nobelPrizes.length) {
      getTopLaureates(nobelPrizes);
    }
  }, [nobelPrizes]);

  useEffect(() => {
    setNobelPrizeUpto(50);
  }, [selectedCategory, selectedYear]);

  const getTopLaureates = (prizes) => {
    const collectAllLaureates = prizes.map((prize) => {
      return prize.laureates;
    });
    const laureatesGroupedById = groupBy(
      flattenDeep(collectAllLaureates),
      "id"
    );
    let wonMoreThenOneTime = [];
    for (const [key, value] of Object.entries(laureatesGroupedById)) {
      if (value && value?.length > 1) {
        if (value[0] && value[0]?.surname) {
          wonMoreThenOneTime.push({ ...value[0], times: value.length });
        }
      }
    }
    if (wonMoreThenOneTime.length) {
      setLaureatesWonMoreThenOneTime(wonMoreThenOneTime);
    }
  };

  const filterNobelPriceList = (prize) => {
    if (selectedCategory && selectedYear) {
      return (
        prize.category === selectedCategory.value &&
        prize.year === selectedYear.value
      );
    } else if (selectedCategory) {
      return prize.category === selectedCategory.value;
    } else if (selectedYear) {
      console.log(prize.year);
      return prize.year === selectedYear.value;
    }
    return true;
  };

  useBottomScrollListener(handleOnDocumentBottom);

  return (
    <>
      <div className="uk-flex uk-padding-small home__nav">
        <div>
          <img
            className="uk-margin-small-right home__logo"
            src={MedalImg}
            alt=""
          />
        </div>
        <div className="uk-text-bold uk-text-center">
          <h3 className="uk-margin-remove uk-text-bold home__nav__title">
            {TITLE}
          </h3>
          <p className="uk-margin-remove home__nav__title">{YEAR_RANGE}</p>
        </div>
      </div>
      {!isPageLoading ? (
        <div className="uk-margin-small-right uk-margin-small-left">
          <div data-uk-grid>
            <div className="uk-width-auto@m">
              <div className="uk-padding-small uk-padding-remove-bottom">
                <h3 className="uk-margin-bottom uk-margin-top uk-text-bold uk-text-center">
                  {TOP_WINNERS_TITLE}
                </h3>
                <div className="uk-flex uk-flex-column uk-flex-middle">
                  {laureatesWonMoreThenOneTime.map((laureate) => (
                    <div className="uk-margin-bottom">
                      <LaureateCard laureate={laureate} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="uk-width-expand@m">
              <div>
                <div className="uk-flex uk-margin-bottom uk-margin-top uk-padding-small uk-padding-remove-left uk-padding-remove-right uk-padding-remove-bottom">
                  <div className="uk-margin-right home__filter__category">
                    <label>{CATEGORY}</label>
                    <div className="uk-form-controls uk-text-capitalize">
                      <Select
                        options={categories}
                        isClearable
                        value={selectedCategory}
                        onChange={(option) => setSelectedCategory(option)}
                      />
                    </div>
                  </div>
                  <div className="home__filter__year">
                    <label>{YEAR_LABEL}</label>
                    <div className="uk-form-controls">
                      <Select
                        options={YEAR}
                        value={selectedYear}
                        onChange={(option) => setSelectedYear(option)}
                        isClearable
                      />
                    </div>
                  </div>
                </div>
                {nobelPrizes
                  .filter(filterNobelPriceList)
                  .slice(0, nobelPrizeUpto)
                  .map((prize) => (
                    <div className="uk-margin-medium-bottom">
                      <div className="uk-flex uk-flex-between uk-margin-bottom">
                        <h2 className="uk-margin-remove uk-text-capitalize">
                          {prize.category}
                        </h2>
                        <h2 className="uk-margin-remove uk-text-capitalize">
                          {prize.year}
                        </h2>
                      </div>
                      <CustomCarousel>
                        {prize.laureates?.map((laureate) => (
                          <li className="uk-margin-medium-right">
                            <LaureateCard laureate={laureate} />
                          </li>
                        ))}
                      </CustomCarousel>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <HomeLoader />
      )}
    </>
  );
};

export default Home;
