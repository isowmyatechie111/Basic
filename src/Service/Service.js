import axios from "axios";
import { API_URL } from "../Constant/Constant";

export const getUsersData = async () => {
  let resData = [];
  await axios
    .get(API_URL)
    .then((res) => {
      const { results } = res.data;
      resData = results;
    })
    .catch((error) => {
      throw error;
    });
  return resData;
};
