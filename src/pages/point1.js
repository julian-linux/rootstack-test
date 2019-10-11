import React, { useEffect, useContext, Fragment } from "react";
import { Row, Col, Table } from "reactstrap";

import Context from "context";

import withContent from "../components/HoC/withContent";

const Point1 = () => {
  const { data } = useContext(Context);
  const results = () =>
    data
      .sort((a, b) => {
        if (a.name.first < b.name.first) {
          return -1;
        }
        if (a.name.first > b.name.first) {
          return 1;
        }
        return 0;
      })
      .map((result, idx) => (
        <tr key={`tr-${idx}`}>
          <td>
            <img src={result.picture.thumbnail} alt={result.name.first} />
          </td>
          <td className="align-middle">{result.name.first}</td>
          <td className="align-middle">{result.name.last}</td>
          <td className="align-middle">{result.email}</td>
          <td className="align-middle">{result.cell}</td>
          <td className="align-middle">{result.location.city}</td>
          <td className="align-middle text-capitalize">{result.gender}</td>
        </tr>
      ));
  console.log("data", data);

  return (
    <Fragment>
      <Row>
        <Col className="text-center">
          <h1>Fetch & order</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>L. Name</th>
                <th>Email</th>
                <th>Cell</th>
                <th>City</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>{results()}</tbody>
          </Table>
        </Col>
      </Row>
    </Fragment>
  );
};

Point1.requestContent = "https://randomuser.me/api/?results=10";

export default withContent(Point1);
