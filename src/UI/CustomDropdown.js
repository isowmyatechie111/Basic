import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { countries } from "../Constant/Constant";
function CustomDropDown({ onChangeUser, selectedCountry, id }) {
  const [select, setSelect] = useState(selectedCountry);

  const handleSelect = (eventKey) => {
    setSelect(eventKey);
    const payload = {
      id: id,
      oldCountry: selectedCountry,
      newCountry: eventKey,
    };

    onChangeUser(payload);
  };

  return (
    <div>
      <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle variant="info" id="dropdown-basic">
          {select}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {countries.map((country, id) => (
            <Dropdown.Item eventKey={country} key={id}>
              {country}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default CustomDropDown;
