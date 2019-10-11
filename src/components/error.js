import React from "react";
import { Row, Col, Alert } from "reactstrap";

export default contentRequest => (
  <Row>
    <Col className="mt-5 mb-5 text-center">
      <Alert color="danger">
        {`Error making request to — ${contentRequest}`}
      </Alert>
    </Col>
  </Row>
);
