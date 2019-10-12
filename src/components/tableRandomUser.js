import React from "react";
import PropTypes from "prop-types";
import Table from "./tableBase";

const colNames = [
  "",
  "Name",
  "L. Name",
  "Age",
  "Email",
  "Cell",
  "City",
  "Gender"
];

const createBody = data =>
  (data.length &&
    data.reduce(
      (prev, result) => [
        ...prev,
        [
          <img src={result.picture.thumbnail} alt={result.name.first} />,
          result.name.first,
          result.name.last,
          result.dob.age,
          result.email,
          result.cell,
          result.location.city,
          result.gender
        ]
      ],
      []
    )) ||
  null;
const TableRandomUser = ({ data = [] }) => (
  <Table data={createBody(data)} colNames={colNames} />
);

TableRandomUser.propTypes = {
  data: PropTypes.array
};

export default TableRandomUser;
