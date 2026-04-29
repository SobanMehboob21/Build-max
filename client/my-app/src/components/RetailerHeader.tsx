import React from "react";
import "../styles/retailer/RetaileHeader.css";
import logo from "../assets/logo.jpeg";
import { NavLink, Link } from "react-router-dom";
import '../styles/retaileHeader.css'


export const RetailerHeader = () => {
  return (
    <section className="Retailer-header header">
      <div className="header_logo">
        <Link to="/retailer">
          <img className="header_logo_img" src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="my--products">
        <NavLink className="links" to="/retailer/MyProduct">MY Product</NavLink>
        <NavLink className="links" to="/retailer/AddProduct">Add a product</NavLink>
      </div>
    </section>
  );
};
