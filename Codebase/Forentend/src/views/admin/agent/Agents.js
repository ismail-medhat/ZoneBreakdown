import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Agents() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/agents")
      .then((res) => setAgents(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDeleteAgent = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/agent/${id}`);
      window.location.reload()
      toast.success("Agent Deleted Successfully")
    } catch (error) {
        console.log('error when delete agent')
    }
  };

  return (
    <div className="d-flex bg-primary p-3 justify-content-center align-items-center">
      <div className="w-75 bg-white rounded p-3">
        <Link to={"/admin/agents/create-agent"} className="btn btn-success">
          Add +
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Phone</th>
              <th>Max Zone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {agents?.map((agent, i) => (
              <tr key={agent?.ID}>
                <td>{agent?.name}</td>
                <td>{agent?.email}</td>
                <td>{agent?.password}</td>
                <td>{agent?.phone}</td>
                <td>{agent?.max_zone}</td>
                <td>
                  <Link
                    to={`update-agent/${agent?.ID}`}
                    className="btn btn-primary"
                  >
                    Update
                  </Link>
                  <button
                    onClick={(e) => handleDeleteAgent(agent?.ID)}
                    className="btn btn-danger ms-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Agents;
