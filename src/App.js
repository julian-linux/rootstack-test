import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap";

import Point1 from "./pages/point1";
import Point2 from "./pages/point2";
import Point3 from "./pages/point3";
import Point4 from "./pages/point4";

const points = Array.from(Array(5).keys());

const componentsPoints = {
  1: Point1,
  2: Point2,
  3: Point3,
  4: Point4
};

const navLinks = (activeTab, setActiveTab) =>
  points.reduce(
    (prev, idx) => [
      ...prev,
      <NavItem key={`NavLink-${idx + 1}`}>
        <NavLink
          className={activeTab === idx + 1 ? "active" : ""}
          onClick={() => setActiveTab(idx + 1)}
        >
          {`Point ${idx + 1}`}
        </NavLink>
      </NavItem>
    ],
    []
  );

const tabsContent = activeTab =>
  points.reduce((prev, idx) => {
    const Component = componentsPoints[activeTab];
    return [
      ...prev,
      <TabPane
        tabId={idx + 1}
        key={`TabPane-${idx}`}
        className="border border-top-0 p-3"
      >
        <Row>
          <Col sm="12">{activeTab === idx + 1 && <Component />}</Col>
        </Row>
      </TabPane>
    ];
  }, []);

const App = () => {
  const [activeTab, setActiveTab] = useState(4);
  return (
    <Container className=" pt-2 pb-2">
      <Nav tabs>{navLinks(activeTab, setActiveTab)}</Nav>

      <TabContent activeTab={activeTab}>{tabsContent(activeTab)}</TabContent>
    </Container>
  );
};

export default App;
