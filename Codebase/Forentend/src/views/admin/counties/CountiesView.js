import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function CountiesView() {
  const [counties, setCounties] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/counties")
      .then((res) => {
        setCounties(res.data);
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
    <div className="d-flex bg-primary p-3 justify-content-center align-items-center">
      <div className="w-75 bg-white rounded px-3">
        <div className="justify-content-center align-items-center m-2">
          <MapContainer
            style={{ height: "300px", width: "100%" }}
            center={[40.8966, -77.8389]}
            zoom={4}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {counties?.map((county, i) => (
              <Marker key={county?.ID} position={[county.lat, county.lng]}>
                <Popup>{county.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        <Link to={"/admin/counties/create-county"} className="btn btn-success">
          Add Counties +
        </Link>
        <table className="table">
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
  );
}

export default CountiesView;
