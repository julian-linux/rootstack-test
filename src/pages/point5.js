import React, { useState, useEffect, Fragment } from "react";
import { Row, Col, Form, FormGroup, Label, Input } from "reactstrap";

import Loading from "components/loading";

import Table from "../components/tableSwapiPlanets";

let externalData = [];

const filterTerrains = () => {
  const terrains = [];
  externalData.forEach(planet =>
    planet.terrain
      .split(",")
      .forEach(
        terrain =>
          !terrains.includes(terrain.trim()) && terrains.push(terrain.trim())
      )
  );
  return terrains;
};

const Point5 = () => {
  const [results, setResults] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [terrains, setTerrains] = useState([]);
  const [terrain, setTerrain] = useState("");

  useEffect(() => {
    const initData = async (url = "https://swapi.co/api/planets/") => {
      let data = await fetch(url);
      data = await data.json();
      const nextUrl = data.next;
      externalData = [...externalData, ...data.results];
      if (nextUrl) {
        const progress = parseInt((externalData.length * 100) / data.count, 10);
        setProgress(progress);
        initData(nextUrl);
      } else {
        window.localStorage.setItem(
          "swapiDataPlanets",
          JSON.stringify(externalData)
        );
        setResults(externalData);
        setIsLoading(false);
        setTerrains(filterTerrains());
      }
    };

    const swapiDataPlanets = JSON.parse(
      window.localStorage.getItem("swapiDataPlanets")
    );
    if (!swapiDataPlanets) {
      initData();
    } else {
      externalData = swapiDataPlanets;
      setResults(externalData);
      setIsLoading(false);
      setTerrains(filterTerrains());
    }
  }, []);

  useEffect(() => {
    if (terrain) {
      let filteredResults = externalData.filter(planet => {
        const regex = new RegExp(terrain, "gi");
        if (planet.terrain.search(regex) !== -1) {
          return planet;
        }
        return false;
      });

      if (filteredResults.length) {
        if (filteredResults.length > 1) {
          let mostPopulated = { population: 0 };
          filteredResults.forEach(planet => {
            if (
              parseInt(planet.population, 10) >
              parseInt(mostPopulated.population, 10)
            ) {
              mostPopulated = planet;
            }
          });
          setResults([mostPopulated]);
        } else {
          setResults(filteredResults);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [terrain]);

  if (isLoading) {
    return <Loading progress={progress} />;
  }

  return (
    <Fragment>
      <Row>
        <Col className="text-center">
          <h1>Planet By Terrain</h1>
        </Col>
      </Row>
      <Row>
        <Col className="pt-4 pb-4">
          <Form>
            <FormGroup row>
              <Label for="SelectTerrain" sm={2}>
                Select Terrain
              </Label>
              <Col sm={4} className="position-relative">
                <Input
                  type="select"
                  name="select"
                  id="SelectTerrain"
                  onChange={({ currentTarget: { value } }) => {
                    setTerrain(value);
                  }}
                >
                  <option></option>
                  {terrains.map(terrain => (
                    <option
                      key={terrain}
                      className="text-capitalize"
                      value={terrain}
                    >
                      {terrain}
                    </option>
                  ))}
                </Input>
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

// Point5.requestContent = "https://swapi.co/api/starships/";

export default Point5;
