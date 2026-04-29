import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../../styles/form.css";

const RetailerFormSignup = () => {
  const navigate = useNavigate();
  const [isForm, setIsForm] = useState({
    name: "",
    companyName: "",
    email: "",
    password: "",
    text: "",
  });
  const [isError, setIsError] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setIsForm({
      ...isForm,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = await axios.post(
        "http://localhost:5000/api/retailer-auth/signup",
        isForm,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const resData = JSON.stringify(data);
      console.log(resData);

      setIsError(false);
      navigate("/admin/request");
    } catch (error: any) {
      console.error("Signup Error:", error.response?.data?.message);
      setIsError(true);
    }
  };

  return (
    <section className="form__setup retailer-form-signUp">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <form className="form" onSubmit={handleSubmit}>
              <div className="small_margin">
                <input
                  className="form_input"
                  type="text"
                  name="name"
                  placeholder="Enter Your name"
                  onChange={handleChange}
                  value={isForm.name}
                />
                {isError && !isForm.name && (
                  <p className="error_msg"> is required</p>
                )}
              </div>
              <div className="small_margin">
                <input
                  className="form_input"
                  type="text"
                  name="companyName"
                  placeholder="Enter Your Company Name"
                  onChange={handleChange}
                  value={isForm.companyName}
                />
                {isError && !isForm.companyName && (
                  <p className="error_msg">companyName is required</p>
                )}
              </div>
              <div className="small_margin">
                <input
                  className="form_input"
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  onChange={handleChange}
                  value={isForm.email}
                />
                {isError && !isForm.email && (
                  <p className="error_msg">email is required</p>
                )}
              </div>
              <div className="small_margin">
                <input
                  className="form_input"
                  type="password"
                  name="password"
                  placeholder="Enter Your Password"
                  onChange={handleChange}
                  value={isForm.password}
                />
                {isError && !isForm.password && (
                  <p className="error_msg"> password is required</p>
                )}
              </div>
              <div className="small_margin">
                <textarea
                className="text_area"
                  name="text"
                  placeholder="Write about your company and employees"
                  onChange={handleChange}
                  value={isForm.text}
                />
              </div>
              <button className="form_btn" type="submit">
                Submit
              </button>

              <p className="error_msg">
                Already have an account?{" "}
                <NavLink to="/retailer/login">Login</NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RetailerFormSignup;
