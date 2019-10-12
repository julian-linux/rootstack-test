import React from "react";
import PropTypes from "prop-types";
import { Table } from "reactstrap";

const TableBase = ({ data = [], colNames }) => {
  const createBody = () =>
    (data.length &&
      data.map(
        (row, idxRow) =>
          row.length && (
            <tr key={`tr-${idxRow}`}>
              {row.map((item, idxItem) =>
                typeof item === "string" ? (
                  <td
                    key={`td-${idxRow}-${idxItem}`}
                    dangerouslySetInnerHTML={{ __html: item }}
                  ></td>
                ) : (
                  <td key={`td-${idxRow}-${idxItem}`}>{item}</td>
                )
              )}
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

TableBase.propTypes = {
  data: PropTypes.array,
  colNames: PropTypes.array
};

export default TableBase;
