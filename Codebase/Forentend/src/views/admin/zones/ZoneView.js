import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function ZoneView() {
  const [zones, setZones] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/zones")
      .then((res) => setZones(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDeleteZone = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/zone/${id}`);
      window.location.reload()
      toast.success("Zone Deleted Successfully")
    } catch (error) {
        console.log('error when delete zone')
    }
  };

  return (
    <div className="d-flex bg-primary p-3 justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link to={"/admin/zones/create-zone"} className="btn btn-success">
          Add New Zone +
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Max Agent Capacity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {zones?.map((zone, i) => (
              <tr key={zone?.ID}>
                <td>{zone?.name}</td>
                <td>{zone?.max_agent}</td>
                <td>
                  <Link
                    to={`update-zone/${zone?.ID}`}
                    className="btn btn-primary"
                  >
                    Update
                  </Link>
                  {/* <button
                    onClick={(e) => handleDeleteZone(zone?.ID)}
                    className="btn btn-danger ms-2"
                  >
                    Delete
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ZoneView;
