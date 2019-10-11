import React, { useContext, Fragment } from "react";
import { Row, Col } from "reactstrap";

import Context from "context";

import withContent from "../components/HoC/withContent";

import Table from "components/tableRandomUser";

const Point1 = () => {
  const { data } = useContext(Context);

  const results = () =>
    data.sort((a, b) => {
      if (a.name.first < b.name.first) {
        return -1;
      }
      if (a.name.first > b.name.first) {
        return 1;
      }
      return 0;
    });

  return (
    <Fragment>
      <Row>
        <Col className="text-center">
          <h1>Fetch & order</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table data={results()} />
        </Col>
      </Row>
    </Fragment>
  );
};

Point1.requestContent = "https://randomuser.me/api/?results=10";

export default withContent(Point1);
