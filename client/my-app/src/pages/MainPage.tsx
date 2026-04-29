import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import "../styles/MainPage.css";
import backgroundVideo from "../assets/backgroundVideo.mp4";

const MainPage = () => {
  return (
    <>
      <section className="main_page">
        <div className="video-background">
          <video autoPlay muted loop id="bg-video">
            <source src={backgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="video-overlay"></div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="main_nav_wrap">
                <div className="main_page_img">
                  <Link to="">
                    <img className="main_logo" src={logo} alt="Logo" />
                  </Link>
                </div>
                <div className="main_links">
                  <ul>
                    <li>
                      <Link className="main_nav_links" to="/signup">
                        Signup
                      </Link>
                    </li>
                    <li>
                      <Link className="main_nav_links" to="/login">
                        Login
                      </Link>
                    </li>
                    {/* <li>
                      <Link className="main_nav_links" to="/home">
                        home
                      </Link>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="shop-now-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <Link to="/signup" className="shop-now-btn">
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainPage;
