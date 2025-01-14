"use client"
import HeroSection from "@/pages/Homepage/HeroSection";
import ClientWrapper from "./ClientWrapper";
import ErrorBoundary from "./error-boundary";

const Header = () => {
  return (
    <ErrorBoundary>
    <ClientWrapper>
      <div className="mt-0"><HeroSection /></div>
    </ClientWrapper>
    </ErrorBoundary>
  );
};

export default Header;
