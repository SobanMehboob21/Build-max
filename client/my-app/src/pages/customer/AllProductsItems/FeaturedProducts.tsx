import React, { useEffect } from "react";
import "../../../styles/AllProductsItems/FeaturedProducts.css";
import drill from "../../../assets/drill.jpg";

const FeaturedProducts = () => {
 


//we now want to add api here and make frontend link with back end so it works..we use cloudinary and multer so
//we want to check how and from where we get the data from


    
  return (
    <>
      <section className="featured_products">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="featured_products_content">
                Featured Products <i className="ri-star-s-fill"></i>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="featured_products_card">
                <div className="company_image">
                  <img className="featured-company_image" src={drill} />
                </div>
                <div className="card_body">
                  <div className="company_Details">
                    <div className="company_name">DeWalt</div>
                    <div className="in stock">18 in stock</div>
                  </div>
                  <div className="product_name">Cordless Drill Set</div>
                  <div className="review">
                    <div>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                    </div>
                    <div className="reviews">(234)</div>
                  </div>
                  <div className="price">125,000 rs</div>
                  <button className="d_btn">Add to cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturedProducts;
