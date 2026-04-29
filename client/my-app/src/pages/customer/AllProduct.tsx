import React from "react";
import allproducts_main from "../../assets/allproducts_main.jpg";
import '../../styles/AllProduct.css'
import FeaturedProducts from "./AllProductsItems/FeaturedProducts";
import AllProductsCard from "./AllProductsItems/AllProductsCard";

const AllProduct = () => {
  return (
    <>
      <section className="all_products main-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="all_products_left">
                <div className="heading">
                  Build Your Dreams with Quality Materials
                </div>
                <div className="sub_heading">
                  From foundation to finishing, discover premium construction
                  materials from trusted brands. Get everything delivered to
                  your doorstep.
                </div>
                <div className="all_products_left_btn">
                  <button className="d_btn">
                    Explore Products <i className="ri-arrow-right-line"></i>
                  </button>
                  <button className="d_btn p_btn">Get Quote</button>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="all_products_right">
                <img
                  className="all_products_right_img"
                  src={allproducts_main}
                />
                <div className="img_tag">
                  <i className="ri-shield-line"></i>
                  <div className="img_tag_content">
                    <div className="img_tag_heading">Quality Assured</div>
                    <div className="img_tag_sub_heading">
                      Premium materials only
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="all_product_card">
                <i className="ri-truck-line"></i>
                <div className="all_product_card_heading">Fast Delivery</div>
                <div className="all_product_card_sub_heading">
                  Quick delivery to construction sites across the city
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="all_product_card green">
                <i className="ri-shield-line"></i>
                <div className="all_product_card_heading">
                  Quality Guarantee
                </div>
                <div className="all_product_card_sub_heading">
                  All materials tested and certified for construction standards
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="all_product_card purple">
                <i className="ri-customer-service-line"></i>
                <div className="all_product_card_heading">24/7 Support</div>
                <div className="all_product_card_sub_heading">
                  Expert advice and support whenever you need it
                </div>
              </div>
            </div>
          </div>
        </div>
       
      </section>
       <FeaturedProducts />
       <AllProductsCard />
    </>
  );
};

export default AllProduct;
