import React from "react";

const SnowflakeAnimation = React.lazy(() =>
  import("../Homepage/SnowFlakeAnimation")
);

export default function HeroSection() {
  return (
    <>
      <SnowflakeAnimation />
    </>
  );
}
