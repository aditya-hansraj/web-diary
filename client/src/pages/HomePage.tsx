import React from "react";
import NavigationBar from "../components/Navbar";
import { Container, TabContainer } from "react-bootstrap";
import HeroSection from "../components/HeroSection";
import Features from "../components/Features";

const HomePage: React.FC = () => {
  return (
    // <div className="bg-dark">
    <TabContainer>
      <NavigationBar />
      <HeroSection />
      <Features />
    </TabContainer>
    // </div>
  );
};

export default HomePage;
