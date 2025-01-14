import { useEffect, useState } from "react";
const Speciality = () => {
  const [isVisible, setIsVisible] = useState(false);

  const images = [
    "url('/images/herosection/speciality/offers_1.webp')",
    "url('/images/herosection/speciality/offers_2.webp')",
    "url('/images/herosection/speciality/offers_3.webp')",
    "url('/images/herosection/hero3.webp')",
    "url('/images/herosection/hero1.webp')",
    "url('/images/herosection/hero2.webp')",
  ];

  // Use IntersectionObserver to detect when the section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 } // Trigger when 50% of the section is in view
    );

    const section = document.querySelector("#special-offers");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const offers = [
    {
      title: "Frosty Family Holiday",
      description:
        "Bring the whole family for a holiday filled with skiing, snow play, and seasonal treats everyone will love.",
    },
    {
      title: "Ski Adventures Package",
      description:
        "From scenic sleigh rides to exhilarating ski trails, this package brings the magic of the holidays to life.",
    },
    {
      title: "Winter Wonderland",
      description:
        "Enjoy a hassle-free holiday with an all-inclusive package featuring skiing, dining, and festive surprises.",
    },
    {
      title: "Frosty Family Holiday",
      description:
        "Bring the whole family for a holiday filled with skiing, snow play, and seasonal treats everyone will love.",
    },
    {
      title: "Ski Adventures Package",
      description:
        "From scenic sleigh rides to exhilarating ski trails, this package brings the magic of the holidays to life.",
    },
    {
      title: "Winter Wonderland",
      description:
        "Enjoy a hassle-free holiday with an all-inclusive package featuring skiing, dining, and festive surprises.",
    },
  ];

  return (
    <section
      id="special-offers"
      className={`py-20 transition-opacity duration-700 bg-gradient-to-b from-primary to-white  ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <h2 className="text-center text-5xl font-jost font-bold mb-12">
        OUR SPECIALITY
      </h2>
      <div className="grid grid-cols-3 md:grid-cols-3 gap-6 container mx-auto px-6">
        {offers.map((offer, index) => (
          <div
            key={index}
            className={`card relative h-64 rounded-lg overflow-hidden transition-all duration-700 ${
              isVisible
                ? "transform translate-y-0 opacity-100"
                : "transform translate-y-20 opacity-0"
            }`}
            style={{
              backgroundImage: `${images[index]}`,
              backgroundSize: "cover", // Make sure the image covers the entire div
              backgroundPosition: "center", // Center the background image
            }}
          >
            <div className="absolute inset-0  flex items-center justify-center p-4">
              <div className="card-content text-white text-center">
                <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                <p className="text-sm mb-4">{offer.description}</p>
                <button className="px-4 py-2 border-2 border-white rounded-md hover:bg-white hover:text-black transition">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Speciality;
