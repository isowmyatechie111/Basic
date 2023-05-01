import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./SearchBar.css";

import ACTIONS from "../Constant/Actions";
import { Search } from "react-bootstrap-icons";

const SearchBar = ({ country, dispatch }) => {
  const [input, setInput] = useState("");

  const handleSearch = (searchValue) => {
    searchValue = searchValue.toLowerCase();
    setInput(searchValue);
    dispatch({
      type: ACTIONS.SEARCH_USER,
      payload: { searchValue, country },
    });
  };
  return (
    <InputGroup className="mb-3 input--align">
      <Form.Control
        placeholder="Search using last name"
        aria-label="Username"
        aria-describedby="basic-addon1"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <InputGroup.Text variant="success" id="basic-addon1">
        <Search />
      </InputGroup.Text>
    </InputGroup>
  );
};

export default SearchBar;
