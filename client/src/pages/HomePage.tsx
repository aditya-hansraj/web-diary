import React from "react";
import NavigationBar from "../components/Navbar";
import { TabContainer } from "react-bootstrap";
import HeroSection from "../components/HeroSection";
import Features from "../components/Features";

const HomePage: React.FC = () => {
  return (
    <TabContainer>
      <HeroSection />
      <Features />
    </TabContainer>
  );
};

export default HomePage;
