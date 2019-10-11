import React, { useState, useEffect, useContext, Fragment } from "react";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  FormFeedback
} from "reactstrap";

import Context from "context";

import withContent from "../components/HoC/withContent";

import Table from "components/tableRandomUser";

const Point2 = () => {
  const { data } = useContext(Context);
  const [results, setResults] = useState(data);
  const [age, setAge] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (age) {
      const filteredResults = data.filter(
        result => result.dob.age === parseInt(age, 10)
      );
      if (filteredResults.length) {
        setResults([filteredResults[0]]);
      } else {
        setResults(data);
      }
    } else {
      setResults(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [age]);

  return (
    <Fragment>
      <Row>
        <Col className="text-center">
          <h1>Fetch & Find</h1>
        </Col>
      </Row>
      <Row>
        <Col className="pt-4 pb-4">
          <Form>
            <FormGroup row>
              <Label for="InputAge" sm={2}>
                Write the Age
              </Label>
              <Col sm={4} className="position-relative">
                <Input
                  type="text"
                  name="number"
                  id="InputAge"
                  placeholder="Age"
                  value={age}
                  onChange={({ currentTarget: { value } }) => {
                    if (value === "" || (value > 0 && value < 150)) {
                      setAge(value);
                      setIsError(false);
                    } else {
                      setIsError(true);
                      setAge("");
                    }
                  }}
                  invalid={isError}
                />
                {isError && <FormFeedback>Age not Valid!</FormFeedback>}
                <FormText>Put an Age between 0 and 150</FormText>
              </Col>
            </FormGroup>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table data={results} />
        </Col>
      </Row>
    </Fragment>
  );
};

Point2.requestContent = "https://randomuser.me/api/?results=100";

export default withContent(Point2);
