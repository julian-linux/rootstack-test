import React from "react";
import PropTypes from "prop-types";
import Table from "./tableBase";

const colNames = [
  "Name",
  "Population",
  "Climate",
  "Diameter",
  "Terrain",
  "Gravity",
  "Films"
];

const createBody = data =>
  (data.length &&
    data.reduce(
      (prev, result) => [
        ...prev,
        [
          result.name,
          result.population,
          result.climate,
          result.diameter,
          result.terrain,
          result.gravity,
          result.films.join("<br />")
        ]
      ],
      []
    )) ||
  null;

const TableSwapiPlanets = ({ data = [] }) => (
  <Table data={createBody(data)} colNames={colNames} />
);

TableSwapiPlanets.propTypes = {
  data: PropTypes.array
};

export default TableSwapiPlanets;
