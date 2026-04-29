import React from "react";
import drill from "../../assets/drill.jpg";
import HeaderTwo from "../../components/HeaderTwo";

const CoreMaterial = () => {
  return (
    <>
      <section className="featured_products AllProductsCard Core-materials main-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="AllProductsCard__heading">
                <div className="featured_products_content">All Products</div>
               
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      filrer
                    </button>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </div>
                  </div>
                
              </div>
            </div>
            <HeaderTwo />
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

export default CoreMaterial;
