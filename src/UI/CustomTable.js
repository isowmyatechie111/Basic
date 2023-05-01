import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CustomTable.css";
import CustomDropdown from "./CustomDropdown";
import { Trash } from "react-bootstrap-icons";
import ACTIONS from "../Constant/Actions";
import SearchBar from "./SearchBar";

const CustomTable = ({ country, users, dispatch }) => {
  const getSelectedUser = (payload) => {
    dispatch({ type: ACTIONS.SWITCH_COUNTRY, payload });
  };

  const handleDeleteUser = (id, country) => {
    console.log(id);
    dispatch({ type: ACTIONS.DELETE_USER, payload: { id, country } });
  };

  return (
    <Table className="ctable" responsive bordered variant="dark">
      <thead>
        <tr style={{ borderColor: "#212529" }}>
          <th colSpan={7} style={{ textAlign: "center", color: "aqua" }}>
            Country : {country}
          </th>
        </tr>

        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>City</th>
          <th>State</th>
          <th>Switch Country</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {users.length > 0 ? (
          users.map((user, id) => (
            <tr key={id}>
              <td>{user.name.first}</td>
              <td> {user.name.last}</td>
              <td>{user.email}</td>
              <td>{user.location.city}</td>
              <td>{user.location.state}</td>
              <td>
                <CustomDropdown
                  selectedCountry={country}
                  onChangeUser={getSelectedUser}
                  id={user.id.value}
                  dispatch={dispatch}
                />
              </td>
              <td style={{ textAlign: "center" }}>
                <Trash
                  style={{ cursor: "pointer" }}
                  color={"aqua"}
                  size={"20px"}
                  onClick={() => handleDeleteUser(user.id.value, country)}
                />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={7}>No results found!</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default CustomTable;
