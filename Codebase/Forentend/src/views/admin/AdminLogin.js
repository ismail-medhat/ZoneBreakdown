import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    axios
      .get(`${BASE_URL}/admin-login`, {
        email,
      })
      .then((res) => {
        console.log("bbbb : ", res.data);
        if (res.data?.includes("Error credential")) {
          toast.error("Wrong Email Or Password");
        } else if (res.data.password != password) {
          toast.error("Wrong Email Or Password");
        } else {
          toast.success("Login Successfully");
          navigate("/admin/counties");
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="d-flex bg-primary vh-100 justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Login Form</h2>
          <div className="mb-2">
            <label htmlFor="emai">Email</label>
            <input
              type="text"
              placeholder="Enter Your Email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              placeholder="Enter Your Password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-success">Login</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
