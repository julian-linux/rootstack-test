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

import withContent from "../components/HoC/withContent";
import Loading from "components/loading";

import Table from "../components/tableSwapi";

const canTavelMoreThanAWeek = ({ consumables }) =>
  ["week", "weeks", "month", "months", "year", "years"].includes(
    consumables.split(" ")[1]
  ) || consumables === "7 days";

const isPartOfOriginalTrilogy = ({ films }) => {
  const isPart = {
    4: false,
    5: false,
    6: false
  };
  films.forEach(film => {
    const movie = parseInt(
      film
        .slice(0, -1)
        .split("/")
        .pop(),
      10
    );
    isPart[movie] = true;
  });

  return isPart[4] || isPart[5] || isPart[6];
};

let timer;
let externalData = [];

const Point4 = () => {
  const [results, setResults] = useState([]);
  const [passengers, setPassengers] = useState("");
  const [isError, setIsError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initData = async (url = "https://swapi.co/api/starships/") => {
      let data = await fetch(url);
      data = await data.json();
      const nextUrl = data.next;
      externalData = [...externalData, ...data.results];
      if (nextUrl) {
        const progress = parseInt((externalData.length * 100) / data.count, 10);
        setProgress(progress);
        initData(nextUrl);
      } else {
        window.localStorage.setItem("swapiData", JSON.stringify(externalData));
        setResults(externalData);
        setIsLoading(false);
      }
    };
    const swapiData = JSON.parse(window.localStorage.getItem("swapiData"));
    if (!swapiData) {
      initData();
    } else {
      externalData = swapiData;
      setResults(externalData);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (passengers) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        let filteredResults = externalData.filter(
          ship =>
            ship.passengers === passengers &&
            canTavelMoreThanAWeek(ship) &&
            isPartOfOriginalTrilogy(ship)
        );

        if (filteredResults.length) {
          if (filteredResults.length > 1) {
            let fastestShip = { hyperdrive_rating: 0.0 };
            filteredResults.forEach(ship => {
              if (
                parseFloat(ship.hyperdrive_rating) >
                fastestShip.hyperdrive_rating
              ) {
                fastestShip = ship;
              }
            });
            setResults([fastestShip]);
          } else {
            setResults(filteredResults);
          }
        }
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passengers]);

  const handlePassengersChange = ({ currentTarget: { value } }) => {
    if (value === "" || !isNaN(value)) {
      setPassengers(value);
      setIsError(false);
    } else {
      setIsError(true);
      setPassengers("");
    }
  };

  if (isLoading) {
    return <Loading progress={progress} />;
  }

  return (
    <Fragment>
      <Row>
        <Col className="text-center">
          <h1>Fastest ship</h1>
        </Col>
      </Row>
      <Row>
        <Col className="pt-4 pb-4">
          <Form>
            <FormGroup row>
              <Label for="InputAge" sm={2}>
                Passengers
              </Label>
              <Col sm={4} className="position-relative">
                <Input
                  type="text"
                  name="number"
                  id="InputAge"
                  placeholder="Passengers"
                  value={passengers}
                  onChange={handlePassengersChange}
                  invalid={isError}
                />
                {isError && <FormFeedback>Amount not Valid!</FormFeedback>}
                <FormText>Put passengers amount</FormText>
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

// Point4.requestContent = "https://swapi.co/api/starships/";

export default withContent(Point4);
