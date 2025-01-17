import "./footer.css";
import { IoMdCall, IoMdMail } from "react-icons/io";
import { FaFacebook, FaLocationDot, FaYoutube } from "react-icons/fa6";
import { CgInstagram } from "react-icons/cg";
import Image from "next/image";

const Footer = () => {
  // const navigate = useNavigate();
  return (
    <div className="bg-secondary pt-10 px-16  text-white w-full xsm:px-4 xsm:p-4 sm:px-4 font-jost">
      <div className="w-full flex justify-between xsm:flex-col sm:flex-col md:flex-col">
        <div className="w-[35%] xsm:w-full sm:w-full md:w-full">
          <div className=" flex-col">
            <div className="">
              <Image
                src="/images/logo.png"
                alt="logo"
                height={100}
                width={100}
                className="w-40 h-16 xsm:w-32 sm:w-28 xsm:mx-auto sm:h-16 md:w-32 md:h-10 lg:w-40 lg:h-16 object-contain sm:mx-auto md:mx-auto"
              />
              {/* <h1>right by you</h1> */}
            </div>
            <p className="my-6 xsm:text-xxs sm:text-xs xsm:my-2 sm:my-2 font-jost">
              Experience luxury and comfort, where every detail is designed to
              make your stay memorable. From exquisite dining to personalized
              service, we are here to make your visit exceptional. Building the
              best network where you can get all types of information to ensure
              a seamless stay.
            </p>{" "}
          </div>
        </div>
        <div className="w-[60%] flex justify-items-end mt-6 xsm:w-full sm:w-full xsm:mt-4 md:w-full md:mt-12">
          <div className="w-[50%] data xsm:hidden sm:hidden">
            <h1 className="mb-4 font-[700] text-2xl">Company</h1>
            <div>
              {/* <</button> */}
              <button className="mt-3">Terms & Conditions</button>
              <button className="mt-3">Privacy Policy</button>
              <button className="mt-3">About Us</button>
              {/*  <3'>Sales</button> */}
            </div>
          </div>
          <div className="w-[60%] data2 xsm:w-[90%] sm:w-[90%] xsm:mx-auto sm:mx-auto">
            <h1 className="font-[700] xsm:text-sm sm:text-sm xsm:text-center sm:text-center text-2xl">
              Contact Us
            </h1>
            <div className="content">
              <div>
                <div>
                  <FaLocationDot size={20} />
                </div>
                <p className="xsm:text-xxs sm:text-xxs">
                  123 Luxury Lane, Dream City, Country
                </p>
              </div>
              <div className="mb-4 xsm:justify-center">
                <div className="flex">
                  <div>
                    <IoMdMail size={20} />
                  </div>
                  <p className="xsm:text-xxs sm:text-xxs">info@almaris.in</p>
                </div>
                <div>
                  <IoMdCall
                    className="bg-white text-secondary rounded-full p-1 ml-8"
                    size={20}
                  />
                  <p className="xsm:text-xxs sm:text-xxs">7896541230</p>
                </div>
              </div>
              <h1 className="font-[600] pb-2 xsm:text-sm sm:text-sm xsm:text-center sm:text-center md:text-center text-xl">
                Follow us on social media
              </h1>
              <div className="flex xsm:justify-center sm:justify-center md:justify-center w-full">
                <a
                  href="https://www.facebook.com/share/1E5UTzoWjW/?mibextid=LQQJ4d"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div>
                    <FaFacebook size={25} />
                  </div>
                </a>
                <a
                  href="https://www.instagram.com/isomedsofficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div>
                    <CgInstagram size={25} className="mx-8" />
                  </div>
                </a>
                <a
                  href="https://www.linkedin.com/company/isomeds-pharmacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div>
                    <FaYoutube size={25} />
                  </div>
                </a>
                {/* <img src="/icons/yt.svg" className="h-10 w-10 xsm:h-6 xsm:w-6 sm:h-6 sm:w-6" />
            <img src="/icons/youtube.svg" className="h-10 w-10 xsm:h-6 xsm:w-6 sm:h-6 sm:w-6" /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-8 text-xs text-center lg:text-sm xl:text-sm 2xl:text-base">
        © ANAYA DREAM TRIP 2024 ALL RIGHTS RESERVED.
      </div>
    </div>
  );
};

export default Footer;
