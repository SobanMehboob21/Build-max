import React, { useState } from "react";
import "../../styles/form.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [isForm, setIsForm] = useState({
    username: "",
    email: "",
    password: "",
    youAre: "customer", // default value
  });

  const [isError, setIsError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsForm({
      ...isForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        "http://localhost:5000/api/user/signup",
        isForm
      );
      console.log("Signup Success:", data);
      setIsError(false);
      navigate("/allProduct");
      return data;
    } catch (error: any) {
      console.error("Signup Error:", error.response?.data?.message);
      alert("invalid username email or password")
      setIsError(true);
    }
  };

  return (
    <>
      <section className="form__setup">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <form className="form" onSubmit={handleSubmit}>
                <div className="small_margin">
                  <input
                    className="form_input"
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    onChange={handleChange}
                    value={isForm.username}
                  />
                  {isError && !isForm.username && (
                    <p className="error_msg">Please enter your username</p>
                  )}
                </div>
                <div className="small_margin">
                  <input
                    className="form_input"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={handleChange}
                    value={isForm.email}
                  />
                  {isError && !isForm.email && (
                    <p className="error_msg">Please enter your email</p>
                  )}
                </div>
                <div className="small_margin">
                  <input
                    className="form_input "
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    onChange={handleChange}
                    value={isForm.password}
                  />
                  {isError && !isForm.password && (
                    <p className="error_msg">Please enter your password</p>
                  )}
                </div>
                {/* <select name="youAre" value={isForm.youAre} onChange={handleChange}>
            <option value="customer">Customer</option>
            <option value="retailer">Retailer</option>
            <option value="admin">Admin</option>
          </select> */}
                <button className="form_btn" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
