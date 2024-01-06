import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Autocomplete from "react-google-autocomplete";

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
    <div className="d-flex bg-primary p-3 justify-content-center align-items-center">
      {load && (
        <div className="w-50 bg-white rounded p-3">
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
      )}
    </div>
  );
}

export default CreateCounty;
