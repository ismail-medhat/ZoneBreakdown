import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Autocomplete from "react-google-autocomplete";
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

function ISAView() {
  const [counties, setCounties] = useState([]);
  const [originCounties, setOriginCounties] = useState([]);
  const [coordinate, setCoordinate] = useState({
    lat: "",
    lng: "",
  });
  const [name, setName] = useState("");

  const handleOnPlaceSelect = (place) => {
    const latLng = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };
    setName(place?.formatted_address);
    setCoordinate(latLng);
    console.log("LatLng:", latLng);
    console.log("formatted_address:", place?.formatted_address);
  };
  const resetSearch = () => {
    const latLng = {
      lat: "",
      lng: "",
    };
    setName("");
    setCoordinate(latLng);
    setCounties(originCounties)
    // window.location.reload();
  };

  useEffect(() => {
    axios
      .get("http://localhost:8081/counties")
      .then((res) => {
        setCounties(res.data);
        setOriginCounties(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container-fluid bg-primary p-3 justify-content-center align-items-center">
      <div className="row align-items-start">
        <div style={{ height: "608px" }} className="col-7 bg-white rounded p-3">
          <MapContainer
            style={{ height: "100%", width: "100%" }}
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
        <div className="col-5">
          <div className=" bg-white rounded p-3">
            <div className="m-2">
              <div className="row align-items-center justify-content-space-between p-2">
                <h6 className="col-9" htmlFor="search">
                  Search on Counties
                </h6>
                <button
                  onClick={(e) => resetSearch()}
                  className="col-3 btn btn-danger"
                >
                  Reset Search
                </button>
              </div>
            
              <input
                type="text"
                placeholder="Search By Counties Name"
                className="form-control"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (e.target.value?.length > 0) {
                    setCounties(
                      counties?.filter((county) =>
                        county?.name
                          ?.toLowerCase()
                          ?.includes(e.target.value.toLowerCase())
                      )
                    );
                  } else {
                    setCounties(originCounties);
                  }
                }}
              />
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Zip/Code</th>
                  <th>Zone Name</th>
                </tr>
              </thead>
              <tbody>
                {counties?.map((county, i) => (
                  <tr key={county?.ID}>
                    <td>{county?.name}</td>
                    <td>{county?.zipcode}</td>
                    <td>{county?.zoneName}</td>
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

export default ISAView;
