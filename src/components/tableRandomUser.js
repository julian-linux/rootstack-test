import React from "react";
import PropTypes from "prop-types";
import { Table } from "reactstrap";

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

const TableRandomUser = ({ data = [] }) => {
  const createBody = () =>
    (data.length &&
      data
        .reduce(
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
        )
        .map(
          (row, idxRow) =>
            row.length && (
              <tr key={`tr-${idxRow}`}>
                {row.map((item, idxItem) => (
                  <td
                    key={`td-${idxRow}-${idxItem}`}
                    dangerouslySetInnerHTML={{ __html: item }}
                  ></td>
                ))}
              </tr>
            )
        )) ||
    null;
  return (
    <Table>
      <thead>
        <tr>
          {colNames.length &&
            colNames.map((col, idx) => <th key={`th-${idx}`}>{col}</th>)}
        </tr>
      </thead>
      <tbody>{createBody()}</tbody>
    </Table>
  );
};

TableRandomUser.propTypes = {
  data: PropTypes.array
};

TableRandomUser.requestContent = "https://randomuser.me/api/?results=10";

export default TableRandomUser;
