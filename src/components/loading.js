import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Row, Col, Spinner, Progress } from "reactstrap";

const Loading = ({ progress }) => {
  let loading = <Spinner color="primary" />;
  if (progress) {
    loading = (
      <Fragment>
        <div className="text-center">{progress}%</div>
        <Progress animated value={progress} />
      </Fragment>
    );
  }
  return (
    <Row>
      <Col className="mt-5 mb-5 text-center">{loading}</Col>
    </Row>
  );
};

Loading.propTypes = {
  progress: PropTypes.number
};

Loading.defaultProps = {
  progress: 0
};

export default Loading;
