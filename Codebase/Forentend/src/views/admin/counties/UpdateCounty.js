import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AutoCompletePlaces from "../../../components/AutoCompletePlaces";
import GoogleMaps from "../../../components/GoogleMap";
import { BASE_URL } from "../../../config";

function UpdateCounty() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [load, setLoad] = useState(false);
  const [places, setPlaces] = useState([]);
  const [coordinate, setCoordinate] = useState({
    lat: "",
    lng: "",
  });
  const [zones, setZones] = useState("");
  const [name, setName] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [zoneId, setZoneId] = useState("");

  useEffect(() => {
    axios
      .get(`${BASE_URL}/county/${id}`)
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
        setPlaces([
          {
            id: 1,
            name: res.data[0]?.name,
            position: coord,
          },
        ]);
      })
      .catch((err) => console.log(err));

    axios
      .get(`${BASE_URL}/zones`)
      .then((res) => {
        setZones(res.data);
        setLoad(true);
      })
      .catch((err) => setLoad(true));
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .put(`${BASE_URL}/update-county/${id}`, {
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
            className="col-7 bg-white rounded p-3"
          >
            <GoogleMaps places={places} />
          </div>
          <div className="col-5">
            <div className="bg-white rounded p-3">
              <form onSubmit={handleSubmit}>
                <h2>Update County</h2>
                <div className="mb-2">
                  <label htmlFor="name">Name</label>
                  <AutoCompletePlaces
                    name={name}
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
