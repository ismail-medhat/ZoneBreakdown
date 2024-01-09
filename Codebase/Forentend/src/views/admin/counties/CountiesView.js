import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import GoogleMaps from "../../../components/GoogleMap";

function CountiesView() {
  const [counties, setCounties] = useState([]);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/counties")
      .then((res) => {
        setCounties(res.data);
        let fullPlaces = [];
        res?.data?.forEach((place) => {
          fullPlaces.push({
            id: place?.ID,
            name: place?.name,
            position: { lat: place?.lat, lng: place?.lng },
          });
        });
        setPlaces(fullPlaces);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDeleteCounty = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/county/${id}`);
      window.location.reload();
      toast.success("county Deleted Successfully");
    } catch (error) {
      console.log("error when delete agent");
    }
  };

  return (
    <div className="container-fluid bg-primary p-3 justify-content-center align-items-center">
      <div className="row align-items-start">
        <div style={{ height: "550px" }} className="col-6 bg-white rounded p-3">
          <GoogleMaps places={places} />
        </div>
        <div className="col-6">
          <div className="bg-white rounded p-3">
            <Link
              to={"/admin/counties/create-county"}
              className="btn btn-success"
            >
              Add Counties +
            </Link>
            <table className="table ">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Zip/Code</th>
                  <th>Zone Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {counties?.map((county, i) => (
                  <tr key={county?.ID}>
                    <td>{county?.name}</td>
                    <td>{county?.zipcode}</td>
                    <td>{county?.zoneName}</td>
                    <td>
                      <Link
                        to={`update-county/${county?.ID}`}
                        className="btn btn-primary"
                      >
                        Update
                      </Link>
                      <button
                        onClick={(e) => handleDeleteCounty(county?.ID)}
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
      </div>
    </div>
  );
}

export default CountiesView;
