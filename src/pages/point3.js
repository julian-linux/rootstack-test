import React, { useContext, Fragment } from "react";
import { Row, Col, Alert } from "reactstrap";

import Context from "context";

import withContent from "../components/HoC/withContent";

import Table from "components/tableRandomUser";

const Point1 = () => {
  const { data } = useContext(Context);
  const wordsUsed = {};
  const mostUsedWords = [];

  data.forEach(({ name: { first } }) => {
    first.split("").forEach(word => {
      word = word.toLowerCase();
      if (wordsUsed[word] === undefined) {
        wordsUsed[word] = 1;
      } else {
        wordsUsed[word] += 1;
      }
    });
  });

  const mostUsedWordAmmount = Math.max.apply(null, Object.values(wordsUsed));

  data.forEach(result => {
    Object.keys(wordsUsed).forEach(word => {
      if (wordsUsed[word] === mostUsedWordAmmount) {
        if (!mostUsedWords.includes(word)) {
          mostUsedWords.push(word);
        }

        const regex = new RegExp(word, "gi");

        result.name.first = result.name.first.replace(regex, `<b>${word}</b>`);
      }
    });
  });

  return (
    <Fragment>
      <Row>
        <Col className="text-center">
          <h1>Fetch & Count</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Alert color="info" isOpen>
            Most used words is <b>{mostUsedWords.join(", ")}</b> with a total of{" "}
            <b>{mostUsedWordAmmount}</b> times
          </Alert>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table data={data} />
        </Col>
      </Row>
    </Fragment>
  );
};

Point1.requestContent = "https://randomuser.me/api/?results=5";

export default withContent(Point1);
