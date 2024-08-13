import React from "react";
import NavigationBar from "../components/Navbar";
import { Container, TabContainer } from "react-bootstrap";

const HomePage: React.FC = () => {
  return (
    <div className="bg-dark">
    <TabContainer>
      <NavigationBar />
    </TabContainer>
    </div>
  );
};

export default HomePage;
