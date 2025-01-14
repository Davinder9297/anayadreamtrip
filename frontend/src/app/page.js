"use client"
import HeroSection from "@/pages/Homepage/HeroSection";
import ClientWrapper from "./ClientWrapper";

const Header = () => {
  return (
    <ClientWrapper>
      <div className="mt-0"><HeroSection /></div>
    </ClientWrapper>
  );
};

export default Header;
