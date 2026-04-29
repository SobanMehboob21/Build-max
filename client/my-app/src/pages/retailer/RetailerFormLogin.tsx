import React, { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";

const RetailerFormLogin = () => {
  const navigate = useNavigate();

  const [isForm, setIsForm] = useState({
    email: "",
    password: "",
  });

  const [isError, setIsError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsForm({
      ...isForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/retailer-auth/login",
        isForm,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Login successful:", data);

      // ✅ Save token in localStorage
      localStorage.setItem("retailerToken", data.token);

      setIsError(null);
      navigate("/retailer/dashboard");
    } catch (error: any) {
      console.error("Login Error:", error.response?.data?.message);
      setIsError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="retailer-form-login form__setup">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <form className="form" onSubmit={handleSubmit}>
              <div className="small_margin">
                <input
                 className="form_input"
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  onChange={handleChange}
                  value={isForm.email}
                  required
                />
              </div>
              <div className="small_margin">
                <input
                 className="form_input"
                  type="password"
                  name="password"
                  placeholder="Enter Your Password"
                  onChange={handleChange}
                  value={isForm.password}
                  required
                />
              </div>
              <button className="form_btn" type="submit">Login</button>

              {isError && <p className="error_msg">{isError}</p>}

              <p className="already_acc">
                Don’t have an account?{" "}
                <NavLink to="/retailer/signup">Sign Up</NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RetailerFormLogin;
