import React, { useEffect, useState,useRef } from "react";
import axios from "axios";
import {  useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';

function UpdateAgent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const ref = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [maxZone, setMaxZone] = useState("");


  useEffect(() => {
    axios
      .get(`http://localhost:8081/agent/${id}`)
      .then((res) => {
        console.log('agent info : ',res.data[0].name)
        setName(res.data[0]?.name);
        setEmail(res.data[0]?.email);
        setPassword(res.data[0]?.password);
        setPhone(res.data[0]?.phone);
        setMaxZone(res.data[0]?.max_zone);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .put(`http://localhost:8081/update-agent/${id}`, {
        name,
        email,
        password,
        phone,
        maxZone
      })
      .then((res) => {
        console.log("new agent data :: ", res);
        toast.success("Agent Updated Successfully")
        navigate("/admin/agents");
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="d-flex bg-primary p-3 justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Update Agent</h2>
          <div className="mb-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter Agent Name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              placeholder="Enter Agent Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              placeholder="Enter Agent Password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              placeholder="Enter Agent Phone"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="max_zone">Max Zone</label>
            <input
              type="text"
              placeholder="Enter Agent Max Zone"
              className="form-control"
              value={maxZone}
              onChange={(e) => setMaxZone(e.target.value)}
            />
          </div>
          <button className="btn btn-success">update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateAgent;
