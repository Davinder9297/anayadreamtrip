"use client"
import HeroSection from "@/pages/Homepage/HeroSection";
import ErrorBoundary from "./error-boundary";

const Header = () => {
  return (
    <ErrorBoundary>
      <div className="mt-0"><HeroSection /></div>
    </ErrorBoundary>
  );
};

export default Header;
