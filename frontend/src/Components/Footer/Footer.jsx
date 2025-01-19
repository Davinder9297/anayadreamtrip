import { IoMdCall, IoMdMail } from "react-icons/io";
import { FaFacebook, FaYoutube } from "react-icons/fa6";
import { CgInstagram } from "react-icons/cg";

const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        fontFamily: "Jost, sans-serif",
        background: "linear-gradient(to right, black, #584e43, #ab8965)",
        padding: "4rem 1.5rem 2rem",
      }}
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" style={{ position: "absolute", left: "-9999px" }}>
        Footer
      </h2>
      <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ width: "30%", marginBottom: "2rem" }}>
            <img
              src="/images/logo.png"
              alt="Company name"
              style={{ height: "80px" }}
            />
            <p style={{ fontSize: "0.875rem", lineHeight: "1.5", color: "white",marginTop:'10px' }}>
              Experience luxury and comfort, where every detail is designed to make
              your stay memorable. From exquisite dining to personalized service,
              we are here to make your visit exceptional. Building the best network
              where you can get all types of information to ensure a seamless stay.
            </p>
            <div style={{ display: "flex", gap: "1.5rem", marginTop: "1rem" }}>
              <a href="#" style={{ color: "white" }}>
                <span style={{ position: "absolute", left: "-9999px" }}>Facebook</span>
                <FaFacebook size={24} />
              </a>
              <a href="#" style={{ color: "white" }}>
                <span style={{ position: "absolute", left: "-9999px" }}>YouTube</span>
                <FaYoutube size={24} />
              </a>
              <a href="#" style={{ color: "white" }}>
                <span style={{ position: "absolute", left: "-9999px" }}>Instagram</span>
                <CgInstagram size={24} />
              </a>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "50%",
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  lineHeight: "1.5",
                  color: "white",
                }}
              >
                Solutions
              </h3>
              <ul style={{ listStyle: "none", marginTop: "1.5rem", padding: "0",display:'flex',flexDirection:'column',gap:'10px' }}>
                <li>
                  <a
                    href="#"
                    style={{
                      fontSize: "0.875rem",
                      lineHeight: "1.5",
                      color: "white",
                      textDecoration: "none",
                      display: "block",
                    }}
                  >
                    Marketing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    style={{
                      fontSize: "0.875rem",
                      lineHeight: "1.5",
                      color: "white",
                      textDecoration: "none",
                      display: "block",
                    }}
                  >
                    Analytics
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    style={{
                      fontSize: "0.875rem",
                      lineHeight: "1.5",
                      color: "white",
                      textDecoration: "none",
                      display: "block",
                    }}
                  >
                    Commerce
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    style={{
                      fontSize: "0.875rem",
                      lineHeight: "1.5",
                      color: "white",
                      textDecoration: "none",
                      display: "block",
                    }}
                  >
                    Insights
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  lineHeight: "1.5",
                  color: "white",
                }}
              >
                Solutions
              </h3>
              <ul style={{ listStyle: "none", marginTop: "1.5rem", padding: "0",display:'flex',flexDirection:'column',gap:'10px' }}>
                <li>
                  <a
                    href="#"
                    style={{
                      fontSize: "0.875rem",
                      lineHeight: "1.5",
                      color: "white",
                      textDecoration: "none",
                      display: "block",
                    }}
                  >
                    Marketing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    style={{
                      fontSize: "0.875rem",
                      lineHeight: "1.5",
                      color: "white",
                      textDecoration: "none",
                      display: "block",
                    }}
                  >
                    Analytics
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    style={{
                      fontSize: "0.875rem",
                      lineHeight: "1.5",
                      color: "white",
                      textDecoration: "none",
                      display: "block",
                    }}
                  >
                    Commerce
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    style={{
                      fontSize: "0.875rem",
                      lineHeight: "1.5",
                      color: "white",
                      textDecoration: "none",
                      display: "block",
                    }}
                  >
                    Insights
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  lineHeight: "1.5",
                  color: "white",
                }}
              >
                Solutions
              </h3>
              <ul style={{ listStyle: "none", marginTop: "1.5rem", padding: "0",display:'flex',flexDirection:'column',gap:'10px' }}>
                <li>
                  <a
                    href="#"
                    style={{
                      fontSize: "0.875rem",
                      lineHeight: "1.5",
                      color: "white",
                      textDecoration: "none",
                      display: "block",
                    }}
                  >
                    Marketing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    style={{
                      fontSize: "0.875rem",
                      lineHeight: "1.5",
                      color: "white",
                      textDecoration: "none",
                      display: "block",
                    }}
                  >
                    Analytics
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    style={{
                      fontSize: "0.875rem",
                      lineHeight: "1.5",
                      color: "white",
                      textDecoration: "none",
                      display: "block",
                    }}
                  >
                    Commerce
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    style={{
                      fontSize: "0.875rem",
                      lineHeight: "1.5",
                      color: "white",
                      textDecoration: "none",
                      display: "block",
                    }}
                  >
                    Insights
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>
        <div
          style={{
            marginTop: "4rem",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "2rem",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "0.75rem",
              lineHeight: "1.5",
              color: "white",
            }}
          >
            &copy; 2025 AnayaDreamTrip, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
