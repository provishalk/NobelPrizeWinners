import axios from "axios";
import { FETCH_NOBEL_PRICE_WINNERS_LIST } from "../utils/constants";

export const fetchNobelPriceWinnerApi = () => {
  return axios
    .get(FETCH_NOBEL_PRICE_WINNERS_LIST)
    .then((res) => res.data.prizes);
};
