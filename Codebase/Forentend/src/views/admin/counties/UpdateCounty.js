import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
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

function UpdateCounty() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [load, setLoad] = useState(false);
  const [coordinate, setCoordinate] = useState({
    lat: "",
    lng: "",
  });
  const [zones, setZones] = useState("");
  const [name, setName] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [zoneId, setZoneId] = useState("");

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

  useEffect(() => {
    axios
      .get(`http://localhost:8081/county/${id}`)
      .then((res) => {
        console.log("county info : ", res.data[0].name);
        const coord = {
          lat: res.data[0]?.lat,
          lng: res.data[0]?.lng,
        };
        setName(res.data[0]?.name);
        setZipcode(res.data[0]?.zipcode);
        setCoordinate(coord);
        setZoneId(res.data[0]?.zone_id);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:8081/zones")
      .then((res) => {
        setZones(res.data);
        setLoad(true);
      })
      .catch((err) => setLoad(true));
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .put(`http://localhost:8081/update-county/${id}`, {
        name,
        zipcode,
        lat: coordinate.lat,
        lng: coordinate.lng,
        zone_id: zoneId,
      })
      .then((res) => {
        console.log("new county data :: ", res);
        toast.success("County Updated Successfully");
        navigate("/admin/counties");
      })
      .catch((err) => console.log(err));
  }
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
                <h2>Update County</h2>
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
                    defaultValue={name}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="zipcode">Zip/Code</label>
                  <input
                    type="text"
                    placeholder="Enter County Zip Code"
                    className="form-control"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="zone">Zone Name</label>
                  <select
                    onChange={(e) => setZoneId(e.target.value)}
                    className="form-control"
                    id="inputGroupSelect01"
                    value={zoneId}
                  >
                    {zones?.map((zone, i) => (
                      <option key={zone?.ID} value={zone?.ID}>
                        {zone?.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button className="btn btn-success">update</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateCounty;
