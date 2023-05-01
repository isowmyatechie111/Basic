import "./App.css";

import { getUsersData } from "./Service/Service";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import CustomTable from "./UI/CustomTable";
import { useEffect, useReducer } from "react";
import { reducer } from "./Components/Reducer/reducer";
import ACTIONS from "./Constant/Actions.js";
import SearchBar from "./UI/SearchBar";

const App = () => {
  const [state, dispatch] = useReducer(reducer, {});

  // console.log(state);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsersData();
        dispatch({ type: ACTIONS.FIRST_RENDER, payload: { data: res } });
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

  const renderOutput = () => {
    console.log(state);
    if (!state?.dataMap) return;
    const arr = [];

    for (let entry of state.dataMap.entries()) {
      const [country, countryArr] = entry;

      arr.push(
        <Row key={country}>
          <Col key={new Date().toISOString().slice(-6)}>
            <CustomTable
              users={countryArr}
              country={country}
              dispatch={dispatch}
              selectedCountry={country}
            />
          </Col>
        </Row>
      );
    }

    return arr;
  };

  return (
    <Container id="main">
      <SearchBar dispatch={dispatch} />
      {renderOutput()}
    </Container>
  );
};

export default App;
