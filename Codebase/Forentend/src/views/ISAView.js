import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import GoogleMaps from "../components/GoogleMap";

function ISAView() {
  const [counties, setCounties] = useState([]);
  const [originCounties, setOriginCounties] = useState([]);
  const [places, setPlaces] = useState([]);
  const [originPlaces, setOriginPlaces] = useState([]);
  const [name, setName] = useState("");

  const resetSearch = () => {

    setName("");
    setCounties(originCounties);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8081/counties")
      .then((res) => {
        setCounties(res.data);
        setOriginCounties(res.data);
        let fullPlaces = [];
        res?.data?.forEach((place) => {
          fullPlaces.push({
            id: place?.ID,
            name: place?.name,
            position: { lat: place?.lat, lng: place?.lng },
          });
        });
        setPlaces(fullPlaces);
        setOriginPlaces(fullPlaces);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSearch = (e) => {
    setName(e.target.value);
    if (e.target.value?.length > 0) {
      setCounties(
        counties?.filter((county) =>
          county?.name?.toLowerCase()?.includes(e.target.value.toLowerCase())
        )
      );
      setPlaces(
        originPlaces?.filter((place) =>
          place?.name?.toLowerCase()?.includes(e.target.value.toLowerCase())
        )
      );
    } else {
      setCounties(originCounties);
      setPlaces(originPlaces);
    }
  };

  return (
    <div className="container-fluid bg-primary p-3 justify-content-center align-items-center">
      <div className="row align-items-start">
        <div style={{ height: "608px" }} className="col-7 bg-white rounded p-3">
          <GoogleMaps places={places} />
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
                onChange={(e) => handleSearch(e)}
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
