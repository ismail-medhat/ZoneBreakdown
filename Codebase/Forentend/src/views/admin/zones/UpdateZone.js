import React, { useEffect, useState,useRef } from "react";
import axios from "axios";
import {  useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';

function UpdateZone() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [maxAgent, setMaxAgent] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8081/zone/${id}`)
      .then((res) => {
        console.log('zone info : ',res.data[0].name)
        setName(res.data[0]?.name);
        setMaxAgent(res.data[0]?.max_agent);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .put(`http://localhost:8081/update-zone/${id}`, {
        name,
        maxAgent,
      })
      .then((res) => {
        console.log("new zone data :: ", res);
        toast.success("Zone Updated Successfully")
        navigate("/admin/zones");
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="d-flex bg-primary p-3 justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Update Zone Details</h2>
          <div className="mb-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter Zone Name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email">Max Agent Capacity</label>
            <input
              type="text"
              placeholder="Enter Max Agent"
              className="form-control"
              value={maxAgent}
              onChange={(e) => setMaxAgent(e.target.value)}
            />
          </div>
          <button className="btn btn-success">update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateZone;
