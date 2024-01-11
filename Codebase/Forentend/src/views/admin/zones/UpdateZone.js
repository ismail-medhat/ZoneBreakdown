import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../config";

function UpdateZone() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [activeAgent, setActiveAgent] = useState("");

  useEffect(() => {
    axios
      .get(`https://zonebreakdown.000webhostapp.com/getZone?zone_id=${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("zone info --- : ", res.data);
        setName(res.data?.name);
        setActiveAgent(res.data?.active_agent);
      })
      .catch((err) => console.log("zone info error: ", err));
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(`${BASE_URL}/zone/${id}`)
  //     .then((res) => {
  //       console.log("zone info : ", res.data[0].name);
  //       setName(res.data[0]?.name);
  //       setActiveAgent(res.data[0]?.active_agent);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post(`https://zonebreakdown.000webhostapp.com/updateZone.php`, {
        id:id,
        name:name,
        active_agent:activeAgent,
      })
      .then((res) => {
        console.log("new zone data :: ", res);
        toast.success("Zone Updated Successfully");
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
            <label htmlFor="email">Active Agents</label>
            <input
              type="text"
              placeholder="Enter Max Agent"
              className="form-control"
              value={activeAgent}
              onChange={(e) => setActiveAgent(e.target.value)}
            />
          </div>
          <button className="btn btn-success">update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateZone;
