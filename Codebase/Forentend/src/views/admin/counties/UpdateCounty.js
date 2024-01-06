import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Autocomplete from "react-google-autocomplete";

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
    <div className="d-flex bg-primary p-3 justify-content-center align-items-center">
      {load && (
        <div className="w-50 bg-white rounded p-3">
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
      )}
    </div>
  );
}

export default UpdateCounty;
