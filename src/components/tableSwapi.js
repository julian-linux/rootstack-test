import React from "react";
import PropTypes from "prop-types";
import { Table } from "reactstrap";

const colNames = [
  "Name",
  "Class",
  "Model",
  "Passengers",
  "Rating",
  "Consumables",
  "Films"
];

const TableSwapi = ({ data = [] }) => {
  const createBody = () =>
    (data.length &&
      data
        .reduce(
          (prev, result) => [
            ...prev,
            [
              result.name,
              result.starship_class,
              result.model,
              result.passengers,
              result.hyperdrive_rating,
              result.consumables,
              result.films.join("<br />")
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

TableSwapi.propTypes = {
  data: PropTypes.array
};

TableSwapi.requestContent = "https://randomuser.me/api/?results=10";

export default TableSwapi;
