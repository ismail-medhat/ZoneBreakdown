import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { BASE_URL } from "../../../config";

function CreateZone() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [maxAgent, setMaxAgent] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post(`${BASE_URL}/create-zone`, {
        name,
        maxAgent,
      })
      .then((res) => {
        console.log("new zone data :: ", res);
        toast.success("Zone Added Successfully")
        navigate("/admin/zones");
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="d-flex bg-primary p-3 justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Add New Zone</h2>
          <div className="mb-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter Zone Name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email">Max Agent Capacity</label>
            <input
              type="text"
              placeholder="Enter Max Agent"
              className="form-control"
              onChange={(e) => setMaxAgent(e.target.value)}
            />
          </div>
          <button className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreateZone;
