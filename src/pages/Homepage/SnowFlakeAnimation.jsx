import { useEffect, useState } from "react";
import styles from "../../css/Snowflakes.module.css";
import Header from "../../Components/Navbar/Header";

const SnowflakeAnimation = () => {
  const [snowflakes, setSnowflakes] = useState([]);
  const [bgIndex, setBgIndex] = useState(0);

  // Array of images to use as background
  const images = [
    "url('/images/herosection/hero3.webp')",
    "url('/images/herosection/hero1.webp')",
    "url('/images/herosection/hero2.webp')",
  ];

  // Change background image every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const generateSnowflakes = () => {
      return Array.from({ length: 200 }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * -20}%`,
        size: `${Math.random() * 3 + 1}px`,
        duration: `${Math.random() * 10 + 5}s`,
        opacity: Math.random() * 0.7 + 0.3,
        rotation: `${Math.random() * 360}deg`,
        horizontalMovement: `${Math.random() * 10 - 20}px`,
      }));
    };

    setSnowflakes(generateSnowflakes());
  }, []);

  return (
    <div
      className={`${styles.container} bg-blend-darken overflow-hidden relative h-[550px]`}
      style={{
        backgroundImage: images[bgIndex],
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <Header />
      {snowflakes.map((flake, index) => (
        <div
          key={index}
          className={styles.snowflake}
          style={{
            left: flake.left,
            top: flake.top,
            fontSize: flake.size,
            width: flake.size,
            height: flake.size,
            animationDuration: flake.duration,
            opacity: flake.opacity,
            transform: `rotate(${flake.rotation})`,
            "--horizontal-movement": flake.horizontalMovement,
          }}
        ></div>
      ))}
      <div className="text-white text-[64px] font-[500] font-marcellus text-center mt-28">
        Your Winter Getaway
      </div>
      <div className="w-[60%] text-white text-center mx-auto text-[32px] font-marcellus tracking-wide mt-6">
        The perfect getaway is just a click away. Book now and start your
        adventure!
      </div>
    </div>
  );
};

export default SnowflakeAnimation;
