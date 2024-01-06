import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

function CreateAgent() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [maxZone, setMaxZone] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:8081/create-agent", {
        name,
        email,
        password,
        phone,
        maxZone
      })
      .then((res) => {
        console.log("new agent data :: ", res);
        toast.success("Agent Added Successfully")
        navigate("/admin/agents");
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="d-flex bg-primary p-3 justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Add New Agent</h2>
          <div className="mb-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter Agent Name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              placeholder="Enter Agent Email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              placeholder="Enter Agent Password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              placeholder="Enter Agent Phone"
              className="form-control"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="max_zone">Max Zone</label>
            <input
              type="text"
              placeholder="Enter Agent Max Zone"
              className="form-control"
              onChange={(e) => setMaxZone(e.target.value)}
            />
          </div>
          <button className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreateAgent;
