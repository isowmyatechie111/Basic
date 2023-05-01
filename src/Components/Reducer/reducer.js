import ACTIONS from "../../Constant/Actions";
import { countries } from "../../Constant/Constant";

const keyNames = (key) => {
  const word = key.replace(" ", "");
  const replacedKey = word[0].toLowerCase() + word.slice(1);

  return replacedKey;
};

//console.log(keyNames("United Kingdom"));
export const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.FIRST_RENDER:
      const data = action.payload.data;

      let dataMap = new Map();
      countries.forEach((country, i) => {
        dataMap.set(
          // keyNames(country)
          country,
          data.filter((data) => data.location.country === country)
        );
      });
      const initialState = new Map(JSON.parse(JSON.stringify([...dataMap])));

      //initialState = new Map(JSON.parse(JSON.stringify([...dataMap])));
      return { dataMap, initialState };

    case ACTIONS.SWITCH_COUNTRY:
      const newState = new Map(JSON.parse(JSON.stringify([...state.dataMap])));
      const { id, oldCountry, newCountry } = action.payload;
      console.log(action.payload);
      const oldArr = newState.get(`${oldCountry}`);
      const newArr = newState.get(`${newCountry}`);

      const getUser = oldArr.find((data) => data.id.value === id);

      const deletedOldArr = oldArr.filter((data) => data.id.value !== id);

      const addedNewArr = [...newArr, getUser];

      newState.set(`${oldCountry}`, [...deletedOldArr]);
      newState.set(`${newCountry}`, [...addedNewArr]);

      console.log(newState);
      const newInitialState = new Map(
        JSON.parse(JSON.stringify([...newState]))
      );

      return { dataMap: newState, initialState: newInitialState };

    case ACTIONS.DELETE_USER:
      const delState = new Map(JSON.parse(JSON.stringify([...state.dataMap])));
      const { id: deleteId, country } = action.payload;
      const arr = delState.get(`${country}`);

      const deleteUser = arr.filter((data) => data.id.value !== deleteId);

      delState.set(`${country}`, [...deleteUser]);
      const newDelState = new Map(JSON.parse(JSON.stringify([...delState])));
      return { dataMap: delState, initialState: newDelState };

    case ACTIONS.SEARCH_USER:
      console.log(state);
      const { searchValue } = action.payload;

      console.log(searchValue);
      if (!searchValue) {
        return { ...state, dataMap: state.initialState };
      }
      const searchState = new Map(
        JSON.parse(JSON.stringify([...state.initialState]))
      );
      // const searchState = new Map(
      //   JSON.parse(JSON.stringify([...state.dataMap]))
      // );

      for (let [key, value] of searchState.entries()) {
        const searchResults = value.filter((data) =>
          data.name.last.toLowerCase().includes(searchValue)
        );
        searchState.set(`${key}`, [...searchResults]);
      }
      console.log(searchState);

      return { ...state, dataMap: searchState };
    default:
      return state;
  }
};
