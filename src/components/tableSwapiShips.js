import React from "react";
import PropTypes from "prop-types";
import Table from "./tableBase";

const colNames = [
  "Name",
  "Class",
  "Model",
  "Passengers",
  "Rating",
  "Consumables",
  "Films"
];

const createBody = data =>
  (data.length &&
    data.reduce(
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
    )) ||
  null;

const TableSwapi = ({ data = [] }) => (
  <Table data={createBody(data)} colNames={colNames} />
);

TableSwapi.propTypes = {
  data: PropTypes.array
};

export default TableSwapi;
