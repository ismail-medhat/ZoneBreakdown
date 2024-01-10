import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AutoCompletePlaces from "../../../components/AutoCompletePlaces";
import GoogleMaps from "../../../components/GoogleMap";
import { BASE_URL } from "../../../config";

function CreateCounty() {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [places, setPlaces] = useState([]);
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
      .get(`${BASE_URL}/zones`)
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
      .post(`${BASE_URL}/create-county`, {
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

  return (
    <div className="container-fluid bg-primary p-3 justify-content-center align-items-center">
      {load && (
        <div className="row align-items-start">
          <div
            style={{ height: "550px" }}
            className="col-7 bg-white rounded p-3"
          >
            <GoogleMaps places={places} />
          </div>
          <div className="col-5">
            <div className="bg-white rounded p-3">
              <form onSubmit={handleSubmit}>
                <h2>Add New Counties</h2>
                <div className="mb-2">
                  <label htmlFor="name">Name</label>
                  <AutoCompletePlaces
                    setPlaces={setPlaces}
                    setCoordinate={setCoordinate}
                    setName={setName}
                    setZipcode={setZipcode}
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
