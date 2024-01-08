import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Autocomplete from "react-google-autocomplete";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function CreateCounty() {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [coordinate, setCoordinate] = useState({
    lat: "",
    lng: "",
  });
  const [name, setName] = useState("");
  const [zones, setZones] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [zoneId, setZoneId] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8081/zones")
      .then((res) => {
        setZones(res.data);
        setZoneId(res.data[0]?.ID);
        setLoad(true);
      })
      .catch((err) => setLoad(true));
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:8081/create-county", {
        zipcode,
        name,
        lat: coordinate.lat,
        lng: coordinate.lng,
        zone_id: zoneId,
      })
      .then((res) => {
        console.log("new agent data :: ", res);
        toast.success("County Added Successfully");
        navigate("/admin/counties");
      })
      .catch((err) => console.log(err));
  }

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

  return (
    <div className="container-fluid bg-primary p-3 justify-content-center align-items-center">
      {load && (
        <div className="row align-items-start">
          <div
            style={{ height: "550px" }}
            className="col-6 bg-white rounded p-3"
          >
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
               <Marker position={[coordinate?.lat, coordinate.lng]}>
                  <Popup>{name}</Popup>
                </Marker>
            </MapContainer>
          </div>
          <div className="col-6">
            <div className="bg-white rounded p-3">
              <form onSubmit={handleSubmit}>
                <h2>Add New Counties</h2>
                <div className="mb-2">
                  <label htmlFor="name">Name</label>
                  <Autocomplete
                    className="form-control"
                    apiKey={"AIzaSyAH82XtWoXIcRBAgBgj_wzk5PE0-T50TNU"}
                    onPlaceSelected={(place) => {
                      handleOnPlaceSelect(place);
                      console.log(place);
                    }}
                    options={{
                      types: ["(regions)"],
                      componentRestrictions: { country: "us" },
                    }}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="zipcode">Zip/Code</label>
                  <input
                    type="text"
                    placeholder="Enter County zip code"
                    className="form-control"
                    onChange={(e) => setZipcode(e.target.value)}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="zone">Zone Name</label>
                  <select
                    onChange={(e) => setZoneId(e.target.value)}
                    className="form-control"
                    id="inputGroupSelect01"
                  >
                    {zones?.map((zone, i) => (
                      <option key={zone?.ID} value={zone?.ID}>
                        {zone?.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button className="btn btn-success">Submit</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateCounty;
